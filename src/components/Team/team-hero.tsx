import { motion } from "framer-motion"
import { AnimatedDiv, AnimatedHeading, AnimatedSection } from "../ui-components"

export default function TeamHero() {
  return (
    <AnimatedSection className="pt-32 pb-16 md:pt-40 md:pb-20 bg-gradient-to-b from-[#E1EEBC]/30 to-white">
      <div className="container mx-auto px-4 text-center">
        <AnimatedDiv
          className="inline-block px-4 py-2 bg-[#E1EEBC] rounded-full text-[#328E6E] font-medium mb-6"
          direction="down"
        >
          Our Team
        </AnimatedDiv>

        <AnimatedHeading
          as="h1"
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          direction="up"
        >
          Meet the{" "}
          <span className="bg-gradient-to-r from-[#328E6E] to-[#90C67C] bg-clip-text text-transparent">Minds</span>{" "}
          Behind Moorgan
        </AnimatedHeading>

        <AnimatedDiv className="text-lg text-gray-600 max-w-3xl mx-auto mb-12" direction="up" delay={0.1}>
          Our diverse team of experts combines knowledge in artificial intelligence, IoT engineering, veterinary
          science, and sustainable agriculture to revolutionize livestock management.
        </AnimatedDiv>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5, staggerChildren: 0.1 }}
        >
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-3xl font-bold text-[#328E6E]">5+</div>
            <div className="text-gray-600">Years Experience</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-3xl font-bold text-[#328E6E]">5</div>
            <div className="text-gray-600">Team Members</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-3xl font-bold text-[#328E6E]">7+</div>
            <div className="text-gray-600">Patents Filed</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-3xl font-bold text-[#328E6E]">3+</div>
            <div className="text-gray-600">Research Papers</div>
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  )
}
