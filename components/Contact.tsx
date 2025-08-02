'use client'

import { useState } from 'react'
import { Send, CheckCircle, MessageCircle } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsSubmitted(true)
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        })
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="contact" className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="flex justify-center mb-8">
            <div className="flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full">
              <MessageCircle className="w-8 h-8 text-primary-600" />
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4 text-center">
            Partner with <span className="gradient-text">BoxRides</span>
          </h2>
          
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            We&apos;re combining intelligent routing, eco-conscious design, and real-time optimization to modernize one of the world&apos;s most outdated systems: shipping. If you&apos;re an investor exploring next-generation logistics, platform economies, or sustainable transportation innovation, we&apos;d love to connect.
          </p>
        </div>

        {isSubmitted ? (
          <div className="bg-neutral-50 rounded-xl p-8 max-w-md mx-auto text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full mb-4 mx-auto">
              <CheckCircle className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">Thank You!</h3>
            <p className="text-neutral-600">
              We appreciate your interest in BoxRides. Our team will back to you within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-field"
                  placeholder = "Company / Investor Name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field"
                  placeholder = "investor@example.com"
                  required
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 mb-2">
                Investment Interest
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="input-field"
                placeholder="e.g., Seed Funding, Series A, Strategic Partnership"
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="textarea-field"
                placeholder="Reach out for more information about what BoxRides is doing :)"
                required
              />
            </div>
            
            <div className="text-center">
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary inline-flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                {isLoading ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        )}
        
       
      </div>
    </section>
  )
} 