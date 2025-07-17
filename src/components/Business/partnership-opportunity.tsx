"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Handshake,
  Building,
  Stethoscope,
  Cpu,
  GraduationCap,
  Globe,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const partnershipTypes = [
  {
    title: "Technology Partners",
    description:
      "Collaborate on IoT hardware, software integration, and platform development",
    icon: Cpu,
    benefits: [
      "Joint product development",
      "Technology licensing",
      "Co-marketing opportunities",
      "Revenue sharing models",
    ],
    examples: [
      "Hardware manufacturers",
      "Software companies",
      "Cloud providers",
    ],
    color: "bg-blue-50 border-blue-200",
  },
  {
    title: "Distribution Partners",
    description:
      "Expand market reach through established agricultural and veterinary networks",
    icon: Building,
    benefits: [
      "Market expansion",
      "Local expertise",
      "Established customer base",
      "Reduced market entry costs",
    ],
    examples: [
      "Agricultural cooperatives",
      "Farm equipment dealers",
      "Veterinary distributors",
    ],
    color: "bg-green-50 border-green-200",
  },
  {
    title: "Veterinary Partners",
    description:
      "Integrate with veterinary practices for comprehensive livestock health management",
    icon: Stethoscope,
    benefits: [
      "Clinical validation",
      "Professional endorsement",
      "Service integration",
      "Data insights",
    ],
    examples: ["Veterinary clinics", "Animal hospitals", "Mobile vet services"],
    color: "bg-purple-50 border-purple-200",
  },
  {
    title: "Research Partners",
    description: "Collaborate on research initiatives and product innovation",
    icon: GraduationCap,
    benefits: [
      "Research funding",
      "Academic credibility",
      "Innovation pipeline",
      "Talent pipeline",
    ],
    examples: ["Universities", "Research institutions", "Government labs"],
    color: "bg-orange-50 border-orange-200",
  },
  {
    title: "Strategic Partners",
    description: "Form strategic alliances with industry leaders and investors",
    icon: Handshake,
    benefits: [
      "Capital investment",
      "Strategic guidance",
      "Market credibility",
      "Growth acceleration",
    ],
    examples: ["Investment firms", "Industry leaders", "Government agencies"],
    color: "bg-indigo-50 border-indigo-200",
  },
  {
    title: "Global Partners",
    description:
      "Establish international partnerships for worldwide market expansion",
    icon: Globe,
    benefits: [
      "International expansion",
      "Local compliance",
      "Cultural adaptation",
      "Regional expertise",
    ],
    examples: [
      "International distributors",
      "Regional integrators",
      "Local partners",
    ],
    color: "bg-pink-50 border-pink-200",
  },
];

export function PartnershipOpportunities() {
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
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Partnership Opportunities
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join our ecosystem of partners and unlock new opportunities for
            growth, innovation, and market expansion in the livestock monitoring
            industry.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {partnershipTypes.map((partnership, index) => (
            <motion.div
              key={partnership.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`p-6 rounded-lg border-2 ${partnership.color} hover:shadow-lg transition-shadow`}
            >
              <div className="flex items-center gap-3 mb-4">
                <partnership.icon className="w-8 h-8 text-gray-700" />
                <h3 className="text-xl font-bold text-gray-900">
                  {partnership.title}
                </h3>
              </div>

              <p className="text-gray-600 mb-6">{partnership.description}</p>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Key Benefits:
                </h4>
                <ul className="space-y-2">
                  {partnership.benefits.map((benefit, benefitIndex) => (
                    <li
                      key={benefitIndex}
                      className="flex items-center gap-2 text-sm text-gray-700"
                    >
                      <CheckCircle className="w-4 h-4 text-[#328E6E] flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Examples:</h4>
                <div className="flex flex-wrap gap-2">
                  {partnership.examples.map((example, exampleIndex) => (
                    <span
                      key={exampleIndex}
                      className="text-xs bg-white px-2 py-1 rounded border border-gray-200"
                    >
                      {example}
                    </span>
                  ))}
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="w-full border-[#328E6E] text-[#328E6E] hover:bg-[#328E6E] hover:text-white"
              >
                Learn More
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Partnership Process */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#328E6E] to-[#67AE6E] rounded-2xl p-8 text-white text-center"
        >
          <h3 className="text-2xl font-bold mb-4">
            Ready to Partner with TernakAja?
          </h3>
          <p className="text-lg mb-6 text-white/90">
            Let's discuss how we can create mutual value and drive innovation
            together
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-[#328E6E] hover:bg-gray-100"
            >
              Schedule Partnership Call
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-[#328E6E]"
            >
              Download Partnership Guide
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
