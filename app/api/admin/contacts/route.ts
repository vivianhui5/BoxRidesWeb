import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'

export async function GET(request: NextRequest) {
  try {
    // Query Firebase for all contact submissions, ordered by creation date
    const q = query(collection(db, 'contact-submissions'), orderBy('createdAt', 'desc'))
    const querySnapshot = await getDocs(q)
    
    const contacts = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    return NextResponse.json({ 
      contacts,
      count: contacts.length
    })
  } catch (error) {
    console.error('Error reading contact submissions:', error)
    return NextResponse.json(
      { error: 'Failed to read contact submissions' },
      { status: 500 }
    )
  }
} 