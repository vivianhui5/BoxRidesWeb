'use client'

import { useState } from 'react'
import { Leaf, Package, Car, Lock, FileText, MapPin } from 'lucide-react'
import BetaSignup from './BetaSignup'

export default function Hero() {
  const [isBetaModalOpen, setIsBetaModalOpen] = useState(false)

  return (
    <section id="home" className="pt-16 min-h-screen flex items-center bg-gradient-to-br from-neutral-50 to-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="flex justify-center space-x-8 mb-8">
            <div className="flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full">
              <Leaf className="w-8 h-8 text-primary-600" />
            </div>
            <div className="flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full">
              <Package className="w-8 h-8 text-primary-600" />
            </div>
            <div className="flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full">
              <Car className="w-8 h-8 text-primary-600" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 mb-6">
            Redefining 
            <span className="gradient-text"> Delivery</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-neutral-600 mb-6 max-w-3xl mx-auto">
            A logistics layer built to optimize the delivery process using advanced AI algorithms.
          </p>
          
          <p className="text-sm font-medium text-neutral-500 mb-8 tracking-wide">
            TAPPING INTO THE $500B+ COURIER, EXPRESS, AND PARCEL (CEP) MARKET
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => setIsBetaModalOpen(true)}
              className="btn-primary text-lg px-8 py-4"
            >
              Sign Up For Beta Launch
            </button>
            
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mb-4 mx-auto">
                <Lock className="w-6 h-6 text-primary-600" />
              </div>
              <div className="text-lg font-semibold text-neutral-900">Stealth Mode</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mb-4 mx-auto">
                <FileText className="w-6 h-6 text-primary-600" />
              </div>
              <div className="text-lg font-semibold text-neutral-900">Patent-Pending</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mb-4 mx-auto">
                <MapPin className="w-6 h-6 text-primary-600" />
              </div>
              <div className="text-lg font-semibold text-neutral-900">East Coast Launch</div>
            </div>
          </div>
        </div>
      </div>
      
      <BetaSignup 
        isOpen={isBetaModalOpen} 
        onClose={() => setIsBetaModalOpen(false)} 
      />
    </section>
  )
} 