import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'BoxRides - Eco-Friendly Shipping Solutions',
  description: 'Sustainable shipping solutions for the modern world. Join our eco-friendly delivery revolution.',
  keywords: 'shipping, eco-friendly, sustainable, delivery, logistics',
  authors: [{ name: 'BoxRides' }],
  openGraph: {
    title: 'BoxRides - Eco-Friendly Shipping Solutions',
    description: 'Sustainable shipping solutions for the modern world.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white">
        {children}
      </body>
    </html>
  )
} 