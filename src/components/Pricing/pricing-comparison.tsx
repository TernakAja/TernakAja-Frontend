"use client"

import { motion } from "framer-motion"
import { Check, X } from "lucide-react"

const features = [
  {
    category: "Basic Features",
    items: [
      { name: "Livestock Monitoring", free: "10 animals", premium: "Unlimited" },
      { name: "Mobile App Access", free: true, premium: true },
      { name: "Email Notifications", free: true, premium: true },
      { name: "Basic Dashboard", free: true, premium: true },
      { name: "Data Export", free: "Standard", premium: "Advanced" },
    ],
  },
  {
    category: "Advanced Analytics",
    items: [
      { name: "Health Analytics", free: "Basic", premium: "Advanced" },
      { name: "Predictive Insights", free: false, premium: true },
      { name: "Custom Reports", free: false, premium: true },
      { name: "API Access", free: false, premium: true },
      { name: "Real-time Alerts", free: false, premium: true },
    ],
  },
  {
    category: "AI & Automation",
    items: [
      { name: "Disease Detection AI", free: false, premium: true },
      { name: "Weather Integration", free: false, premium: true },
      { name: "Feed Optimization", free: false, premium: true },
      { name: "Breeding Management", free: false, premium: true },
      { name: "Automated Recommendations", free: false, premium: true },
    ],
  },
  {
    category: "Support & Collaboration",
    items: [
      { name: "Customer Support", free: "Community", premium: "Priority" },
      { name: "Multi-user Access", free: false, premium: true },
      { name: "Team Collaboration", free: false, premium: true },
      { name: "Training Resources", free: "Basic", premium: "Advanced" },
      { name: "Phone Support", free: false, premium: true },
    ],
  },
]

export function PricingComparison() {
  const renderFeatureValue = (value: boolean | string) => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className="w-5 h-5 text-[#328E6E] mx-auto" />
      ) : (
        <X className="w-5 h-5 text-gray-400 mx-auto" />
      )
    }
    return <span className="text-sm font-medium text-gray-700">{value}</span>
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Compare Plans</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See exactly what's included in each plan to make the best choice for your farm.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="grid grid-cols-3 gap-4">
                <div className="font-semibold text-gray-900">Features</div>
                <div className="text-center font-semibold text-gray-900">Free</div>
                <div className="text-center font-semibold text-[#328E6E]">Premium</div>
              </div>
            </div>

            {/* Feature Categories */}
            {features.map((category, ) => (
              <div key={category.category} className="border-b border-gray-200 last:border-b-0">
                <div className="bg-gray-50 px-6 py-3 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-900">{category.category}</h3>
                </div>
                {category.items.map((item, ) => (
                  <div key={item.name} className="px-6 py-4 border-b border-gray-100 last:border-b-0">
                    <div className="grid grid-cols-3 gap-4 items-center">
                      <div className="text-gray-700">{item.name}</div>
                      <div className="text-center">{renderFeatureValue(item.free)}</div>
                      <div className="text-center">{renderFeatureValue(item.premium)}</div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
