import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'BoxRides - Redefining Delivery Logistics',
  description: 'A logistics layer built to optimize the delivery process using advanced AI algorithms.',
  icons: {
    icon: '/icon.png',
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'BoxRides - Redefining Delivery Logistics',
    description: 'A logistics layer built to optimize the delivery process using advanced AI algorithms.',
    images: [
      {
        url: '/boxrides-logo.png',
        width: 513,
        height: 513,
        alt: 'BoxRides Logo',
      },
    ],
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