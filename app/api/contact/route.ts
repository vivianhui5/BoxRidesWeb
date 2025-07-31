import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json()

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    const contactData = {
      name,
      email,
      subject: `BoxRides - ${subject}`,
      message,
      timestamp: new Date().toISOString()
    }

    // Log the submission
    console.log('Contact form submission:', contactData)

    // For development - save to Firebase (like beta signups)
    // This ensures you don't lose investor inquiries
    try {
      const { db } = await import('@/lib/firebase')
      const { collection, addDoc } = await import('firebase/firestore')
      
      await addDoc(collection(db, 'contact-submissions'), {
        ...contactData,
        createdAt: new Date()
      })
      
      console.log('Contact submission saved to Firebase')
    } catch (fbError) {
      console.warn('Could not save to Firebase, but continuing...', fbError)
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
          replyTo: email,
          to: 'vivianhui05@gmail.com',
          subject: `BoxRides - ${subject}`,
          html: `
            <h2>New Investor/Contact Inquiry</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Investment Interest:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
            <hr>
            <p><small>Submitted: ${new Date().toLocaleString()}</small></p>
          `,
        })
        
        console.log('Email sent successfully')
      } catch (emailError) {
        console.warn('Email sending failed, but form submission saved:', emailError)
      }
    } else {
      console.log('Email credentials not configured - submission saved to database only')
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Your inquiry has been received. We\'ll get back to you within 24 hours.' 
    })
    
  } catch (error) {
    console.error('Error processing contact form:', error)
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Failed to process inquiry: ${error.message}` },
        { status: 500 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to process inquiry' },
      { status: 500 }
    )
  }
} 