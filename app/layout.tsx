import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'BoxRides',
  description: 'Redefining Delivery Logistics',
  keywords: 'shipping, AI, eco-friendly, sustainable, delivery, logistics',
  authors: [{ name: 'BoxRides' }],
  openGraph: {
    title: 'BoxRides',
    description: 'Redefining Delivery Logistics',
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