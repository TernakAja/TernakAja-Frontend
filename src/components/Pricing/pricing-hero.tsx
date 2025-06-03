"use client"

import { motion } from "framer-motion"
import { Check, Star } from "lucide-react"

export function PricingHero() {
  return (
    <section className="relative py-20 bg-gradient-to-br from-[#328E6E] to-[#67AE6E] text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 border border-white/20 rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 border border-white/20 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
            <span className="text-lg font-medium">Trusted by 10,000+ Farmers</span>
            <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Choose Your
            <span className="block text-[#E1EEBC]">Perfect Plan</span>
          </h1>

          <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed">
            Start monitoring your livestock today with our comprehensive IoT solutions. From basic tracking to advanced
            analytics, we have the right plan for you.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-lg">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-[#E1EEBC]" />
              <span>30-day free trial</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-[#E1EEBC]" />
              <span>No setup fees</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-[#E1EEBC]" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
