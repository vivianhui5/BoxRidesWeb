'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-neutral-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Image 
              src="/boxrides-logo.png" 
              alt="BoxRides Logo" 
              width={32}
              height={32}
              className="w-8 h-8 mr-2"
            />
            <h1 className="text-2xl font-bold gradient-text">BoxRides</h1>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a 
              href="/"
              className="text-neutral-600 hover:text-primary-600 transition-colors duration-200"
            >
              Home
            </a>
            <a 
              href="/investors"
              className="text-neutral-600 hover:text-primary-600 transition-colors duration-200"
            >
              Investors
            </a>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-neutral-600 hover:text-primary-600 transition-colors duration-200"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-neutral-100">
            <nav className="flex flex-col space-y-4">
              <a 
                href="/"
                className="text-neutral-600 hover:text-primary-600 transition-colors duration-200 text-left"
              >
                Home
              </a>
              <a 
                href="/investors"
                className="text-neutral-600 hover:text-primary-600 transition-colors duration-200 text-left"
              >
                Investors
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
} 