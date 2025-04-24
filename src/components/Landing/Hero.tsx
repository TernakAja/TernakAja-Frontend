import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ChevronRight, BarChart2, Shield, Zap } from "lucide-react"
import { AnimatedDiv, AnimatedHeading, AnimatedSection } from "../ui-components"

export default function Hero() {
  return (
    <AnimatedSection
      id="home"
      className="pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-gradient-to-b from-[#E1EEBC]/30 to-white"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <AnimatedDiv
              className="inline-block px-4 py-2 bg-[#E1EEBC] rounded-full text-[#328E6E] font-medium mb-6"
              direction="down"
            >
              Powered by Microsoft Azure
            </AnimatedDiv>

            <AnimatedHeading
              as="h1"
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              direction="up"
            >
              Smart Livestock Monitoring with{" "}
              <span className="bg-gradient-to-r from-[#328E6E] to-[#90C67C] bg-clip-text text-transparent">
                AI & IoT
              </span>
            </AnimatedHeading>

            <AnimatedDiv className="text-lg text-gray-600 mb-8" direction="up" delay={0.1}>
              Revolutionize your livestock management with real-time monitoring, predictive analytics, and sustainable
              farming practices powered by cutting-edge AI and IoT technology.
            </AnimatedDiv>

            <AnimatedDiv className="flex flex-wrap gap-4" direction="up" delay={0.2}>
              <Button className="bg-[#328E6E] hover:bg-[#67AE6E] text-white px-6 py-6 rounded-lg text-lg">
                Get Started
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                className="border-[#328E6E] text-[#328E6E] hover:bg-[#328E6E] hover:text-white px-6 py-6 rounded-lg text-lg"
              >
                Watch Demo
              </Button>
            </AnimatedDiv>

            <AnimatedDiv className="mt-12 grid grid-cols-3 gap-4" direction="up" delay={0.3}>
              <div className="flex items-center gap-2">
                <BarChart2 className="text-[#328E6E]" />
                <span className="text-sm font-medium">Real-time Data</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="text-[#328E6E]" />
                <span className="text-sm font-medium">Secure Platform</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="text-[#328E6E]" />
                <span className="text-sm font-medium">Fast Insights</span>
              </div>
            </AnimatedDiv>
          </div>

          <AnimatedDiv className="relative" direction="left">
            <div className="relative z-10">
              <img
                src="./images/Landing/moo-farm.png"
                alt="Moorgan Livestock Monitoring"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>

            <motion.div
              className="absolute -z-10 w-full h-full bg-[#90C67C]/20 rounded-2xl -right-6 -bottom-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />

            <motion.div
              className="absolute -z-20 w-full h-full bg-[#328E6E]/10 rounded-2xl -right-12 -bottom-12"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            />
          </AnimatedDiv>
        </div>
      </div>
    </AnimatedSection>
  )
}
