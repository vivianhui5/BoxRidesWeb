import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'

export async function GET(request: NextRequest) {
  try {
    // Query Firebase for all beta signups, ordered by creation date
    const q = query(collection(db, 'beta-signups'), orderBy('createdAt', 'desc'))
    const querySnapshot = await getDocs(q)
    
    const signups = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    return NextResponse.json({ 
      signups,
      count: signups.length
    })
  } catch (error) {
    console.error('Error reading beta signups:', error)
    return NextResponse.json(
      { error: 'Failed to read signups' },
      { status: 500 }
    )
  }
} 