"use client"

import React from "react"

import { motion } from "framer-motion"
import { Heart, Handshake, Activity, Package, DollarSign, MessageSquare, Target, Navigation } from "lucide-react"

const canvasBlocks = [
  {
    id: "key-partners",
    title: "Key Partners",
    icon: Handshake,
    items: [
      "IoT Hardware Manufacturers",
      "Veterinary Clinics",
      "Agricultural Cooperatives",
      "Technology Integrators",
      "Research Institutions",
      "Government Agencies",
    ],
    color: "bg-blue-50 border-blue-200",
  },
  {
    id: "key-activities",
    title: "Key Activities",
    icon: Activity,
    items: [
      "IoT Device Development",
      "Software Platform Development",
      "Data Analytics & AI",
      "Customer Support",
      "Marketing & Sales",
      "Research & Development",
    ],
    color: "bg-green-50 border-green-200",
  },
  {
    id: "key-resources",
    title: "Key Resources",
    icon: Package,
    items: [
      "Technical Team",
      "IoT Infrastructure",
      "Data Analytics Platform",
      "Brand & IP",
      "Customer Database",
      "Partner Network",
    ],
    color: "bg-purple-50 border-purple-200",
  },
  {
    id: "value-propositions",
    title: "Value Propositions",
    icon: Heart,
    items: [
      "Real-time Livestock Health Monitoring",
      "Predictive Disease Detection",
      "Reduced Veterinary Costs",
      "Improved Animal Welfare",
      "Data-Driven Farm Management",
      "Increased Productivity",
    ],
    color: "bg-[#E1EEBC] border-[#90C67C]",
    featured: true,
  },
  {
    id: "customer-relationships",
    title: "Customer Relationships",
    icon: MessageSquare,
    items: [
      "Personal Assistance",
      "Self-Service Platform",
      "Community Forums",
      "Automated Services",
      "Co-creation",
      "Dedicated Support",
    ],
    color: "bg-orange-50 border-orange-200",
  },
  {
    id: "channels",
    title: "Channels",
    icon: Navigation,
    items: [
      "Direct Sales",
      "Online Platform",
      "Partner Network",
      "Agricultural Shows",
      "Digital Marketing",
      "Referral Program",
    ],
    color: "bg-pink-50 border-pink-200",
  },
  {
    id: "customer-segments",
    title: "Customer Segments",
    icon: Target,
    items: [
      "Small-Scale Farmers",
      "Commercial Livestock Operations",
      "Dairy Farms",
      "Cattle Ranchers",
      "Agricultural Cooperatives",
      "Veterinary Practices",
    ],
    color: "bg-indigo-50 border-indigo-200",
  },
  {
    id: "cost-structure",
    title: "Cost Structure",
    icon: DollarSign,
    items: [
      "R&D and Innovation",
      "Hardware Manufacturing",
      "Cloud Infrastructure",
      "Personnel Costs",
      "Marketing & Sales",
      "Customer Support",
    ],
    color: "bg-red-50 border-red-200",
  },
  {
    id: "revenue-streams",
    title: "Revenue Streams",
    icon: DollarSign,
    items: [
      "Subscription Fees",
      "Hardware Sales",
      "Premium Features",
      "Data Analytics Services",
      "Consulting Services",
      "Partnership Commissions",
    ],
    color: "bg-yellow-50 border-yellow-200",
  },
]

export function BusinessCanvas() {
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
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Business Model Canvas</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive business model built on innovation, partnerships, and sustainable growth in the livestock
            monitoring industry.
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          {/* Canvas Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {/* Row 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className={`p-6 rounded-lg border-2 ${canvasBlocks[0].color}`}
            >
              <div className="flex items-center gap-3 mb-4">
                {React.createElement(canvasBlocks[0].icon, { className: "w-6 h-6 text-gray-700" })}
                <h3 className="font-bold text-gray-900">{canvasBlocks[0].title}</h3>
              </div>
              <ul className="space-y-2">
                {canvasBlocks[0].items.map((item, index) => (
                  <li key={index} className="text-sm text-gray-700">
                    • {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className={`p-6 rounded-lg border-2 ${canvasBlocks[1].color}`}
            >
              <div className="flex items-center gap-3 mb-4">
                {React.createElement(canvasBlocks[1].icon, { className: "w-6 h-6 text-gray-700" })}
                <h3 className="font-bold text-gray-900">{canvasBlocks[1].title}</h3>
              </div>
              <ul className="space-y-2">
                {canvasBlocks[1].items.map((item, index) => (
                  <li key={index} className="text-sm text-gray-700">
                    • {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className={`p-6 rounded-lg border-2 ${canvasBlocks[3].color} md:row-span-2`}
            >
              <div className="flex items-center gap-3 mb-4">
                {React.createElement(canvasBlocks[3].icon, { className: "w-6 h-6 text-[#328E6E]" })}
                <h3 className="font-bold text-gray-900 text-lg">{canvasBlocks[3].title}</h3>
              </div>
              <ul className="space-y-3">
                {canvasBlocks[3].items.map((item, index) => (
                  <li key={index} className="text-sm text-gray-700 font-medium">
                    • {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className={`p-6 rounded-lg border-2 ${canvasBlocks[4].color}`}
            >
              <div className="flex items-center gap-3 mb-4">
                {React.createElement(canvasBlocks[4].icon, { className: "w-6 h-6 text-gray-700" })}
                <h3 className="font-bold text-gray-900">{canvasBlocks[4].title}</h3>
              </div>
              <ul className="space-y-2">
                {canvasBlocks[4].items.map((item, index) => (
                  <li key={index} className="text-sm text-gray-700">
                    • {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className={`p-6 rounded-lg border-2 ${canvasBlocks[6].color}`}
            >
              <div className="flex items-center gap-3 mb-4">
                {React.createElement(canvasBlocks[6].icon, { className: "w-6 h-6 text-gray-700" })}
                <h3 className="font-bold text-gray-900">{canvasBlocks[6].title}</h3>
              </div>
              <ul className="space-y-2">
                {canvasBlocks[6].items.map((item, index) => (
                  <li key={index} className="text-sm text-gray-700">
                    • {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Row 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className={`p-6 rounded-lg border-2 ${canvasBlocks[2].color}`}
            >
              <div className="flex items-center gap-3 mb-4">
                {React.createElement(canvasBlocks[2].icon, { className: "w-6 h-6 text-gray-700" })}
                <h3 className="font-bold text-gray-900">{canvasBlocks[2].title}</h3>
              </div>
              <ul className="space-y-2">
                {canvasBlocks[2].items.map((item, index) => (
                  <li key={index} className="text-sm text-gray-700">
                    • {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              viewport={{ once: true }}
              className={`p-6 rounded-lg border-2 ${canvasBlocks[5].color}`}
            >
              <div className="flex items-center gap-3 mb-4">
                {React.createElement(canvasBlocks[5].icon, { className: "w-6 h-6 text-gray-700" })}
                <h3 className="font-bold text-gray-900">{canvasBlocks[5].title}</h3>
              </div>
              <ul className="space-y-2">
                {canvasBlocks[5].items.map((item, index) => (
                  <li key={index} className="text-sm text-gray-700">
                    • {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Bottom Row */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
              className={`p-6 rounded-lg border-2 ${canvasBlocks[7].color} md:col-span-2`}
            >
              <div className="flex items-center gap-3 mb-4">
                {React.createElement(canvasBlocks[7].icon, { className: "w-6 h-6 text-gray-700" })}
                <h3 className="font-bold text-gray-900">{canvasBlocks[7].title}</h3>
              </div>
              <ul className="space-y-2 md:grid md:grid-cols-2 md:gap-x-4 md:space-y-0">
                {canvasBlocks[7].items.map((item, index) => (
                  <li key={index} className="text-sm text-gray-700">
                    • {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              viewport={{ once: true }}
              className={`p-6 rounded-lg border-2 ${canvasBlocks[8].color} md:col-span-2`}
            >
              <div className="flex items-center gap-3 mb-4">
                {React.createElement(canvasBlocks[8].icon, { className: "w-6 h-6 text-gray-700" })}
                <h3 className="font-bold text-gray-900">{canvasBlocks[8].title}</h3>
              </div>
              <ul className="space-y-2 md:grid md:grid-cols-2 md:gap-x-4 md:space-y-0">
                {canvasBlocks[8].items.map((item, index) => (
                  <li key={index} className="text-sm text-gray-700">
                    • {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
