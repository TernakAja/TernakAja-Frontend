"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Check, Crown, Heart, Zap } from "lucide-react"

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for small farms getting started with livestock monitoring",
    icon: Heart,
    features: [
      "Monitor up to 10 livestock",
      "Basic health tracking",
      "Mobile app access",
      "Email notifications",
      "Community support",
      "Basic analytics dashboard",
      "Standard data export",
    ],
    limitations: ["Limited to 10 animals", "Basic reporting only", "Community support only"],
    buttonText: "Get Started Free",
    buttonVariant: "outline" as const,
    popular: false,
  },
  {
    name: "Premium",
    price: "$29",
    period: "per month",
    description: "Advanced monitoring for serious livestock operations",
    icon: Crown,
    features: [
      "Unlimited livestock monitoring",
      "Advanced health analytics",
      "Real-time alerts & notifications",
      "Weather integration",
      "Disease detection AI",
      "Custom reporting & insights",
      "Priority customer support",
      "API access",
      "Multi-user collaboration",
      "Advanced data export",
      "Breeding management",
      "Feed optimization",
    ],
    limitations: [],
    buttonText: "Start Premium Trial",
    buttonVariant: "default" as const,
    popular: true,
  },
]

export function PricingPlans() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that fits your farm size and needs. Upgrade or downgrade at any time.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`relative bg-white rounded-2xl shadow-lg border-2 p-8 ${
                plan.popular ? "border-[#328E6E] ring-4 ring-[#328E6E]/10" : "border-gray-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-[#328E6E] text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                    plan.popular ? "bg-[#328E6E]" : "bg-gray-100"
                  }`}
                >
                  <plan.icon className={`w-8 h-8 ${plan.popular ? "text-white" : "text-gray-600"}`} />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>

                <div className="mb-6">
                  <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600 ml-2">/{plan.period}</span>
                </div>

                <Button
                  variant={plan.buttonVariant}
                  size="lg"
                  className={`w-full ${
                    plan.popular
                      ? "bg-[#328E6E] hover:bg-[#2a7a5e] text-white"
                      : "border-[#328E6E] text-[#328E6E] hover:bg-[#328E6E] hover:text-white"
                  }`}
                >
                  {plan.buttonText}
                </Button>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 mb-3">What's included:</h4>
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#328E6E] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-4">Need a custom solution for your enterprise?</p>
          <Button
            variant="outline"
            size="lg"
            className="border-[#328E6E] text-[#328E6E] hover:bg-[#328E6E] hover:text-white"
          >
            Contact Sales Team
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
