import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import { collection, addDoc } from 'firebase/firestore'

// Simple in-memory rate limiting (for production, use Redis)
const requestCounts = new Map<string, { count: number; resetTime: number }>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const windowMs = 15 * 60 * 1000 // 15 minutes
  const maxRequests = 3 // Max 3 signups per 15 minutes per IP
  
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

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : 'unknown'
    
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many signup attempts. Please try again in 15 minutes.' },
        { status: 429 }
      )
    }

    const { firstName, lastName, email } = await request.json()

    // Validate required fields
    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Enhanced input sanitization
    const sanitizedData = {
      firstName: firstName.trim().slice(0, 50),
      lastName: lastName.trim().slice(0, 50), 
      email: email.trim().toLowerCase().slice(0, 100)
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(sanitizedData.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    const signupData = {
      ...sanitizedData,
      timestamp: new Date().toISOString(),
      createdAt: new Date()
    }

    // Save to Firebase Firestore
    const docRef = await addDoc(collection(db, 'beta-signups'), signupData)
    
    // Log successful signup (without sensitive data)
    console.log('Beta signup successful:', { timestamp: signupData.timestamp })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error processing beta signup')
    
    // Check if it's a Firebase error
    if (error instanceof Error && error.message.includes('NOT_FOUND')) {
      return NextResponse.json(
        { error: 'Service temporarily unavailable' },
        { status: 503 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to process signup' },
      { status: 500 }
    )
  }
} 