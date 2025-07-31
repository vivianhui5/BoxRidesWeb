import Header from '@/components/Header'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Investors - BoxRides',
  description: 'Partner with BoxRides. We\'re raising seed/Series A funding for our logistics platform.',
}

export default function Investors() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-16">
        <Contact />
      </div>
      <Footer />
    </main>
  )
} 