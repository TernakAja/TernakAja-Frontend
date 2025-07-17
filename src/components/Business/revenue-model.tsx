"use client";

import { motion } from "framer-motion";
import {
  DollarSign,
  Repeat,
  Package,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

const revenueStreams = [
  {
    title: "Subscription Revenue",
    percentage: "65%",
    description: "Monthly and annual subscription fees for platform access",
    icon: Repeat,
    details: [
      "Free tier: $0/month (up to 10 animals)",
      "Premium tier: $29/month (unlimited animals)",
      "Enterprise tier: Custom pricing",
      "High customer lifetime value",
      "Predictable recurring revenue",
    ],
    color: "bg-blue-50 border-blue-200",
  },
  {
    title: "Hardware Sales",
    percentage: "25%",
    description: "IoT collar devices and monitoring equipment",
    icon: Package,
    details: [
      "TernakAja Smart Collar: $89 per unit",
      "Gateway devices: $299 per unit",
      "Replacement parts and accessories",
      "Volume discounts for large orders",
      "One-time revenue with high margins",
    ],
    color: "bg-green-50 border-green-200",
  },
  {
    title: "Premium Services",
    percentage: "7%",
    description: "Consulting, training, and custom development",
    icon: Users,
    details: [
      "Implementation consulting",
      "Custom integrations",
      "Training and certification",
      "Data analytics services",
      "High-margin professional services",
    ],
    color: "bg-purple-50 border-purple-200",
  },
  {
    title: "Partnership Revenue",
    percentage: "3%",
    description: "Commissions and revenue sharing with partners",
    icon: Zap,
    details: [
      "Referral commissions",
      "Integration partnerships",
      "Data licensing agreements",
      "White-label solutions",
      "Strategic partnership deals",
    ],
    color: "bg-orange-50 border-orange-200",
  },
];

const financialProjections = [
  { year: "2024", revenue: "$2.1M", customers: "1,200", growth: "+150%" },
  { year: "2025", revenue: "$5.8M", customers: "3,500", growth: "+176%" },
  { year: "2026", revenue: "$12.4M", customers: "7,800", growth: "+114%" },
  { year: "2027", revenue: "$24.1M", customers: "15,200", growth: "+94%" },
  { year: "2028", revenue: "$41.8M", customers: "26,500", growth: "+73%" },
];

export function RevenueModel() {
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
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Revenue Model
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our diversified revenue model ensures sustainable growth and
            profitability across multiple income streams and customer segments.
          </p>
        </motion.div>

        {/* Revenue Streams */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {revenueStreams.map((stream, index) => (
            <motion.div
              key={stream.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`p-6 rounded-lg border-2 ${stream.color}`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <stream.icon className="w-8 h-8 text-gray-700" />
                  <h3 className="text-xl font-bold text-gray-900">
                    {stream.title}
                  </h3>
                </div>
                <div className="text-2xl font-bold text-[#328E6E]">
                  {stream.percentage}
                </div>
              </div>

              <p className="text-gray-600 mb-4">{stream.description}</p>

              <ul className="space-y-2">
                {stream.details.map((detail, detailIndex) => (
                  <li
                    key={detailIndex}
                    className="text-sm text-gray-700 flex items-start gap-2"
                  >
                    <DollarSign className="w-4 h-4 text-[#328E6E] mt-0.5 flex-shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Financial Projections */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            5-Year Financial Projections
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">
                    Year
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">
                    Revenue
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">
                    Customers
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">
                    Growth
                  </th>
                </tr>
              </thead>
              <tbody>
                {financialProjections.map((projection) => (
                  <tr
                    key={projection.year}
                    className="border-b border-gray-100"
                  >
                    <td className="py-3 px-4 font-medium text-gray-900">
                      {projection.year}
                    </td>
                    <td className="py-3 px-4 text-2xl font-bold text-[#328E6E]">
                      {projection.revenue}
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {projection.customers}
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 text-green-600 font-medium">
                        <TrendingUp className="w-4 h-4" />
                        {projection.growth}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-[#328E6E] mb-2">$150</div>
            <div className="text-gray-600">Customer LTV</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#328E6E] mb-2">92%</div>
            <div className="text-gray-600">Gross Margin</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#328E6E] mb-2">
              18 months
            </div>
            <div className="text-gray-600">Payback Period</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#328E6E] mb-2">5%</div>
            <div className="text-gray-600">Monthly Churn</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
