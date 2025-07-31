import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Simple in-memory rate limiting (for production, use Redis)
const requestCounts = new Map<string, { count: number; resetTime: number }>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const windowMs = 60 * 60 * 1000 // 60 minutes
  const maxRequests = 2 // Max 2 contact submissions per hour per IP
  
  const record = requestCounts.get(ip)
  
  if (!record || now > record.resetTime) {
    requestCounts.set(ip, { count: 1, resetTime: now + windowMs })
    return false
  }
  
  if (record.count >= maxRequests) {
    return true
  }
  
  record.count++
  return false
}

function sanitizeHtml(text: string): string {
  return text
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : 'unknown'
    
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many contact attempts. Please try again in 1 hour.' },
        { status: 429 }
      )
    }

    const { name, email, subject, message } = await request.json()

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Enhanced input sanitization
    const sanitizedData = {
      name: name.trim().slice(0, 100),
      email: email.trim().toLowerCase().slice(0, 100),
      subject: subject.trim().slice(0, 200),
      message: message.trim().slice(0, 2000)
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(sanitizedData.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Check for suspicious content
    const suspiciousPatterns = [
      /<script/i, /javascript:/i, /vbscript:/i, /onload=/i, /onerror=/i
    ]
    
    const allText = `${sanitizedData.name} ${sanitizedData.subject} ${sanitizedData.message}`
    if (suspiciousPatterns.some(pattern => pattern.test(allText))) {
      return NextResponse.json(
        { error: 'Invalid content detected' },
        { status: 400 }
      )
    }

    const contactData = {
      ...sanitizedData,
      subject: `BoxRides - ${sanitizedData.subject}`,
      timestamp: new Date().toISOString()
    }

    // Log submission (without sensitive data)
    console.log('Contact form submission received:', { timestamp: contactData.timestamp })

    // Save to Firebase (like beta signups)
    try {
      const { db } = await import('@/lib/firebase')
      const { collection, addDoc } = await import('firebase/firestore')
      
      await addDoc(collection(db, 'contact-submissions'), {
        ...contactData,
        createdAt: new Date()
      })
      
      console.log('Contact submission saved to Firebase')
    } catch (fbError) {
      console.warn('Could not save to Firebase, but continuing...')
    }

    // Try to send email if environment variables are set
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        })

        await transporter.sendMail({
          from: '"BoxRides Contact Form" <vivianhui05@gmail.com>',
          replyTo: sanitizedData.email,
          to: 'vivianhui05@gmail.com',
          subject: `BoxRides - ${sanitizedData.subject}`,
          html: `
            <h2>New Investor/Contact Inquiry</h2>
            <p><strong>Name:</strong> ${sanitizeHtml(sanitizedData.name)}</p>
            <p><strong>Email:</strong> ${sanitizeHtml(sanitizedData.email)}</p>
            <p><strong>Investment Interest:</strong> ${sanitizeHtml(sanitizedData.subject)}</p>
            <p><strong>Message:</strong></p>
            <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
              ${sanitizeHtml(sanitizedData.message).replace(/\n/g, '<br>')}
            </div>
            <hr>
            <p><small>Submitted: ${new Date().toLocaleString()}</small></p>
          `,
        })
        
        console.log('Email sent successfully')
      } catch (emailError) {
        console.warn('Email sending failed, but form submission saved')
      }
    } else {
      console.log('Email credentials not configured - submission saved to database only')
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Your inquiry has been received. We\'ll get back to you within 24 hours.' 
    })
    
  } catch (error) {
    console.error('Error processing contact form')
    
    return NextResponse.json(
      { error: 'Failed to process inquiry' },
      { status: 500 }
    )
  }
} 