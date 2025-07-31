'use client'

import { useState, useEffect } from 'react'
import { Mail, CheckCircle, X } from 'lucide-react'
import Image from 'next/image'

interface BetaSignupProps {
  isOpen: boolean
  onClose: () => void
}

export default function BetaSignup({ isOpen, onClose }: BetaSignupProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.firstName || !formData.lastName || !formData.email) return

    setIsLoading(true)
    
    try {
      const response = await fetch('/api/beta-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsSubmitted(true)
        setFormData({
          firstName: '',
          lastName: '',
          email: ''
        })
        // Close modal after 2 seconds
        setTimeout(() => {
          onClose()
          setIsSubmitted(false)
        }, 2000)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div 
        className="fixed inset-0" 
        onClick={onClose}
        aria-label="Close modal"
      />
      
      <div className="bg-white rounded-2xl max-w-lg w-full relative shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-600 transition-colors duration-200"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="p-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Image 
                src="/boxrides-logo.png" 
                alt="BoxRides Logo" 
                width={48}
                height={48}
                className="w-12 h-12"
              />
            </div>
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              Get Early Access
            </h2>
            
            <p className="text-lg text-neutral-600 mb-8">
              Be among the first to try our logistics platform.
            </p>
            
            {isSubmitted ? (
              <div className="py-8">
                <div className="flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-6 mx-auto">
                  <CheckCircle className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-2xl font-semibold text-neutral-900 mb-3">Thank you!</h3>
                <p className="text-neutral-600">
                  We&apos;ll notify you as soon as our beta launches.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                    required
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                    required
                  />
                </div>
                
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  required
                />
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  {isLoading ? 'Joining...' : 'Join Beta'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 