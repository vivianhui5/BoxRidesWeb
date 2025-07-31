import { Leaf, Clock, Shield, Globe, Recycle, Heart } from 'lucide-react'

export default function Features() {
  const features = [
    {
      icon: Leaf,
      title: 'Eco-Friendly',
      description: 'All our deliveries are carbon neutral, using electric vehicles and renewable energy sources.'
    },
    {
      icon: Clock,
      title: 'Fast & Reliable',
      description: 'Same-day and next-day delivery options with real-time tracking for complete transparency.'
    },
    {
      icon: Shield,
      title: 'Secure Handling',
      description: 'Your packages are protected with our advanced security measures and insurance coverage.'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Worldwide shipping network with local eco-friendly partners in every major city.'
    },
    {
      icon: Recycle,
      title: 'Sustainable Packaging',
      description: 'Biodegradable and recyclable packaging materials that minimize environmental impact.'
    },
    {
      icon: Heart,
      title: 'Community Impact',
      description: 'Every delivery contributes to local environmental projects and community initiatives.'
    }
  ]

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Why Choose <span className="gradient-text">BoxRides</span>?
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            We&apos;re reimagining shipping for a sustainable future, without compromising on speed or reliability.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-neutral-50 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mb-6">
                <feature.icon className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 