import { AnimatedDiv, AnimatedSection, SectionHeading } from "../ui-components"
import { motion } from "framer-motion"

export default function Vision() {
  const sdgGoals = [
    {
      number: 2,
      title: "Zero Hunger",
      description: "Improving livestock productivity to enhance food security",
      color: "#DDA63A",
    },
    {
      number: 12,
      title: "Responsible Consumption",
      description: "Optimizing resource usage in livestock management",
      color: "#BF8B2E",
    },
    {
      number: 13,
      title: "Climate Action",
      description: "Reducing environmental impact of livestock farming",
      color: "#3F7E44",
    },
    {
      number: 15,
      title: "Life on Land",
      description: "Promoting sustainable land use practices",
      color: "#56C02B",
    },
  ]

  return (
    <AnimatedSection id="vision" className="py-20 bg-[#E1EEBC]/30">
      <div className="container mx-auto px-4">
        <SectionHeading title="Our Vision & Mission" subtitle="Aligned with Sustainable Development Goals" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <AnimatedDiv direction="right">
            <h3 className="text-2xl font-bold mb-4 text-[#328E6E]">Vision</h3>
            <p className="text-gray-700 mb-8">
              To revolutionize livestock management globally through innovative technology, creating a world where
              farming is efficient, sustainable, and humane, contributing to food security while minimizing
              environmental impact.
            </p>

            <h3 className="text-2xl font-bold mb-4 text-[#328E6E]">Mission</h3>
            <p className="text-gray-700">
              Our mission is to empower farmers with cutting-edge AI and IoT solutions that optimize livestock health,
              productivity, and welfare while promoting sustainable agricultural practices aligned with global
              development goals.
            </p>
          </AnimatedDiv>

          <AnimatedDiv direction="left" className="relative">
            <img
              src="/placeholder.svg?height=400&width=600"
              alt="Sustainable Farming"
              className="w-full h-auto rounded-2xl shadow-lg"
            />
            <motion.div
              className="absolute -z-10 w-full h-full border-4 border-[#90C67C] rounded-2xl -left-6 -bottom-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
            />
          </AnimatedDiv>
        </div>

        <h3 className="text-2xl font-bold mb-8 text-center text-[#328E6E]">Supporting Sustainable Development Goals</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sdgGoals.map((goal, index) => (
            <AnimatedDiv
              key={index}
              className="bg-white rounded-xl p-6 shadow-md border-t-4"
              style={{ borderColor: goal.color }}
              direction="up"
              delay={index * 0.1}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl"
                  style={{ backgroundColor: goal.color }}
                >
                  {goal.number}
                </div>
                <h4 className="font-bold text-gray-800">{goal.title}</h4>
              </div>
              <p className="text-gray-600">{goal.description}</p>
            </AnimatedDiv>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}
