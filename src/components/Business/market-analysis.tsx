"use client"

import { motion } from "framer-motion"
import { TrendingUp, Globe, DollarSign, Users, Target, Zap } from "lucide-react"

const marketData = [
  {
    title: "Market Size",
    value: "$2.8B",
    description: "Global livestock monitoring market size in 2024",
    icon: DollarSign,
    trend: "+12.5% CAGR",
  },
  {
    title: "Growth Rate",
    value: "15.2%",
    description: "Annual market growth rate through 2030",
    icon: TrendingUp,
    trend: "Accelerating",
  },
  {
    title: "Target Market",
    value: "570M",
    description: "Livestock globally that could benefit from monitoring",
    icon: Target,
    trend: "Expanding",
  },
  {
    title: "Addressable Farms",
    value: "12M+",
    description: "Commercial farms worldwide in our target segments",
    icon: Users,
    trend: "Growing",
  },
]

const opportunities = [
  {
    title: "Emerging Markets",
    description: "Rapid adoption in developing countries with growing livestock industries",
    icon: Globe,
    impact: "High",
  },
  {
    title: "Technology Integration",
    description: "AI and IoT convergence creating new possibilities for livestock management",
    icon: Zap,
    impact: "Very High",
  },
  {
    title: "Sustainability Focus",
    description: "Increasing demand for sustainable and ethical farming practices",
    icon: TrendingUp,
    impact: "High",
  },
]

export function MarketAnalysis() {
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
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Market Analysis</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The livestock monitoring market is experiencing unprecedented growth, driven by technological advancement
            and increasing focus on animal welfare.
          </p>
        </motion.div>

        {/* Market Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {marketData.map((data, index) => (
            <motion.div
              key={data.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-6 shadow-lg border border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <data.icon className="w-8 h-8 text-[#328E6E]" />
                <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded">{data.trend}</span>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{data.value}</div>
              <div className="text-gray-600 text-sm">{data.description}</div>
            </motion.div>
          ))}
        </div>

        {/* Market Opportunities */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Key Market Opportunities</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {opportunities.map((opportunity, ) => (
              <div key={opportunity.title} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#328E6E]/10 rounded-full mb-4">
                  <opportunity.icon className="w-8 h-8 text-[#328E6E]" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">{opportunity.title}</h4>
                <p className="text-gray-600 mb-4">{opportunity.description}</p>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    opportunity.impact === "Very High" ? "bg-red-100 text-red-700" : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {opportunity.impact} Impact
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Competitive Advantage */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Competitive Advantage</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#328E6E]/5 rounded-lg p-6">
              <h4 className="font-semibold text-[#328E6E] mb-2">Technology Leadership</h4>
              <p className="text-gray-600 text-sm">Advanced AI algorithms and IoT integration</p>
            </div>
            <div className="bg-[#328E6E]/5 rounded-lg p-6">
              <h4 className="font-semibold text-[#328E6E] mb-2">Market Focus</h4>
              <p className="text-gray-600 text-sm">Specialized expertise in livestock monitoring</p>
            </div>
            <div className="bg-[#328E6E]/5 rounded-lg p-6">
              <h4 className="font-semibold text-[#328E6E] mb-2">Scalable Platform</h4>
              <p className="text-gray-600 text-sm">Cloud-native architecture for global expansion</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
