import Image from 'next/image'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Image 
              src="/boxrides-logo.png" 
              alt="BoxRides Logo" 
              width={40}
              height={40}
              className="w-10 h-10 mr-2"
            />
            <span className="text-2xl font-bold">BoxRides</span>
          </div>
          <p className="text-neutral-400 text-sm">
            © {currentYear} BoxRides. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
} 