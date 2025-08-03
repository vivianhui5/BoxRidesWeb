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
  const [isClosing, setIsClosing] = useState(false)

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
          handleClose()
          setIsSubmitted(false)
        }, 2000)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      onClose()
      setIsClosing(false)
    }, 200)
  }

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
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
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}>
      <div 
        className="fixed inset-0" 
        onClick={handleClose}
        aria-label="Close modal"
      />
      
      <div className={`bg-white rounded-xl max-w-md w-full relative shadow-xl border border-neutral-100 transition-all duration-300 ${isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'} animate-modal-enter`}>
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1.5 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg transition-all duration-200 z-10"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>
        
        <div className="p-8">
          {isSubmitted ? (
            <div className="text-center py-4 animate-fade-in-up">
              <div className="flex items-center justify-center w-14 h-14 bg-primary-100 rounded-full mb-6 mx-auto animate-success-bounce">
                <CheckCircle className="w-7 h-7 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">Thank you!</h3>
              <p className="text-neutral-600 text-sm">
                We&apos;ll notify you as soon as our beta launches.
              </p>
            </div>
          ) : (
            <div className="text-center">
              <div className="mb-6 animate-fade-in-up">
                <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                  Get Early Access
                </h2>
                <p className="text-neutral-600 text-sm">
                Join our beta program and be the first to experience BoxRides.
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4 text-left animate-fade-in-up animation-delay-200">
                <div className="grid grid-cols-2 gap-3">
                  <div className="animate-slide-in-left">
                    <label htmlFor="firstName" className="block text-xs font-medium text-neutral-700 mb-1.5">
                     First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:bg-white outline-none transition-all duration-200 text-sm hover:bg-white"
                      required
                    />
                  </div>
                  <div className="animate-slide-in-right">
                    <label htmlFor="lastName" className="block text-xs font-medium text-neutral-700 mb-1.5">
                       Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:bg-white outline-none transition-all duration-200 text-sm hover:bg-white"
                      required
                    />
                  </div>
                </div>
                
                <div className="animate-fade-in-up animation-delay-400">
                  <label htmlFor="email" className="block text-xs font-medium text-neutral-700 mb-1.5">
                     Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:bg-white outline-none transition-all duration-200 text-sm hover:bg-white"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 mt-6 text-sm animate-fade-in-up animation-delay-600 hover:scale-105 active:scale-95 relative overflow-hidden group"
                >
                  <span className="relative z-10">
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Joining...
                      </span>
                    ) : (
                      'Join Beta'
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-700 to-primary-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 