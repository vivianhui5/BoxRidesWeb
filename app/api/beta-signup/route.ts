import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import { collection, addDoc } from 'firebase/firestore'

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email } = await request.json()

    // Validate required fields
    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const signupData = {
      firstName,
      lastName,
      email,
      timestamp: new Date().toISOString(),
      createdAt: new Date()
    }

    // Log to console for development
    console.log('Beta signup:', signupData)

    // Save to Firebase Firestore
    console.log('Attempting to save to Firebase...')
    const docRef = await addDoc(collection(db, 'beta-signups'), signupData)
    
    console.log('Document written with ID: ', docRef.id)

    return NextResponse.json({ success: true, id: docRef.id })
  } catch (error) {
    console.error('Error processing beta signup:', error)
    
    // Check if it's a Firebase error
    if (error instanceof Error && error.message.includes('NOT_FOUND')) {
      console.error('Firestore database not found. Please enable Firestore in Firebase Console.')
      return NextResponse.json(
        { error: 'Database not configured. Please contact admin.' },
        { status: 503 }
      )
    }
    
    // More specific error handling
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Failed to process signup: ${error.message}` },
        { status: 500 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to process signup' },
      { status: 500 }
    )
  }
} 