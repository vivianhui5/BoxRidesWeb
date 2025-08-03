'use client'

import { useState } from 'react'
import { Truck, BarChart3, Zap, Shield, Clock, Globe, DollarSign, Droplets, Package, Leaf, Brain, Recycle, TrendingUp, CircleDollarSign, Route } from 'lucide-react'
import BetaSignup from './BetaSignup'

export default function Hero() {
  const [isBetaModalOpen, setIsBetaModalOpen] = useState(false)

  return (
    <section id="home" className="pt-16 min-h-screen bg-gradient-to-br from-neutral-50 to-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <div className="space-y-8">
            {/* Icon Row */}
            <div className="flex space-x-4">
              <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-xl">
                <Package className="w-6 h-6 text-primary-600" />
              </div>
              <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-xl">
                <DollarSign className="w-6 h-6 text-primary-600" />
              </div>
              <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-xl">
                <Leaf className="w-6 h-6 text-primary-600" />
              </div>
            </div>
            
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 mb-6 leading-tight">
                <br />
                <span className="text-primary-600">Logistics Infrastructure For The Modern Era</span>
                <br />
              </h1>
              
              <p className="text-xl text-neutral-600 mb-6 leading-relaxed">
               A logistics layer built to optimize the delivery process using advanced AI algorithms.
              </p>
              
              <div className="flex items-center space-x-2 text-sm font-semibold text-neutral-500 tracking-wide mb-8">
                <div className="w-8 h-px bg-primary-500"></div>
                <span>TRANSFORMING THE $500B+ COURIER, EXPRESS, AND PARCEL (CEP) MARKET</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => setIsBetaModalOpen(true)}
                className="btn-primary text-lg px-8 py-4 font-semibold"
              >
                Join Beta Program
              </button>
            </div>
            
            {/* Stats/Features */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-neutral-200">
              <div className="text-center">
                <div className="flex items-center justify-center w-10 h-10 bg-primary-100 rounded-lg mb-3 mx-auto">
                  <Shield className="w-5 h-5 text-primary-600" />
                </div>
                <div className="text-sm font-semibold text-neutral-900">Patent-Pending</div>
                <div className="text-xs text-neutral-500">Algorithms</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-10 h-10 bg-primary-100 rounded-lg mb-3 mx-auto">
                  <Route className="w-5 h-5 text-primary-600" />
                </div>
                <div className="text-sm font-semibold text-neutral-900">AI Powered</div>
                <div className="text-xs text-neutral-500">Routing</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-10 h-10 bg-primary-100 rounded-lg mb-3 mx-auto">
                  <Recycle className="w-5 h-5 text-primary-600" />
                </div>
                <div className="text-sm font-semibold text-neutral-900">Zero Waste</div>
                <div className="text-xs text-neutral-500">Logistics</div>
              </div>
            </div>
          </div>
          
          {/* Right Content - Phone-like Frame with Package Image */}
          <div className="lg:pl-8">
            <div className="relative max-w-sm mx-auto">
              {/* Phone Frame */}
              <div className="bg-neutral-900 rounded-[2.5rem] p-2 shadow-2xl">
                <div className="bg-white rounded-[2rem] overflow-hidden relative">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-neutral-900 rounded-b-2xl z-10"></div>
                  
                  {/* Image Container */}
                  <div className="aspect-[9/16] relative">
                    <img 
                      src="/canva-image.jpg" 
                      alt="Package delivery"
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Overlay UI Elements */}
                    <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                    
                    {/* Status Bar */}
                    <div className="absolute top-8 left-0 right-0 px-6 flex justify-between items-center text-white text-sm font-medium z-20">
                      <span>9:41</span>
                      <div className="flex space-x-1">
                        <div className="w-4 h-2 bg-white rounded-sm opacity-60"></div>
                        <div className="w-4 h-2 bg-white rounded-sm opacity-80"></div>
                        <div className="w-4 h-2 bg-white rounded-sm"></div>
                      </div>
                    </div>
                    
                    {/* Bottom UI */}
                    <div className="absolute bottom-6 left-6 right-6 space-y-3">
                      {/* Money Saved Notification */}
                      <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center justify-center w-10 h-10 bg-secondary-100 rounded-full">
                            <DollarSign className="w-5 h-5 text-secondary-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-sm font-semibold text-neutral-900">Money Saved</div>
                                <div className="text-xs text-neutral-500">on this package delivery.</div>
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-bold text-secondary-600">$53.82</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Fuel Saved Notification */}
                      <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center justify-center w-10 h-10 bg-primary-100 rounded-full">
                            <Droplets className="w-5 h-5 text-primary-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-sm font-semibold text-neutral-900">Emissions Reduced</div>
                                <div className="text-xs text-neutral-500">on this package delivery.</div>
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-bold text-primary-600">33 kg</div>
                                <div className="text-xs text-primary-500"> CO2e</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              

              
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