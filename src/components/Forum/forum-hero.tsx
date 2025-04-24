import { Button } from "@/components/ui/button"
import { AnimatedDiv, AnimatedHeading, AnimatedSection } from "../ui-components"
import { motion } from "framer-motion"
import { MessageSquarePlus, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function ForumHero() {
  return (
    <AnimatedSection className="pt-32 pb-16 md:pt-40 md:pb-20 bg-gradient-to-b from-[#E1EEBC]/30 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <AnimatedDiv
            className="inline-block px-4 py-2 bg-[#E1EEBC] rounded-full text-[#328E6E] font-medium mb-6"
            direction="down"
          >
            Community Forum
          </AnimatedDiv>

          <AnimatedHeading
            as="h1"
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            direction="up"
          >
            Connect with the{" "}
            <span className="bg-gradient-to-r from-[#328E6E] to-[#90C67C] bg-clip-text text-transparent">
              Moorgan Community
            </span>
          </AnimatedHeading>

          <AnimatedDiv className="text-lg text-gray-600 max-w-3xl mx-auto mb-8" direction="up" delay={0.1}>
            Share your experiences, ask questions, and learn from other livestock farmers. Our community forum is the
            perfect place to connect and grow together.
          </AnimatedDiv>

          <AnimatedDiv className="flex flex-col sm:flex-row gap-4 justify-center" direction="up" delay={0.2}>
            <Button className="bg-[#328E6E] hover:bg-[#67AE6E] text-white px-6 py-6 rounded-lg text-lg">
              <MessageSquarePlus className="mr-2 h-5 w-5" />
              Create New Post
            </Button>
            <Button
              variant="outline"
              className="border-[#328E6E] text-[#328E6E] hover:bg-[#328E6E] hover:text-white px-6 py-6 rounded-lg text-lg"
            >
              Browse Categories
            </Button>
          </AnimatedDiv>
        </div>

        <motion.div
          className="max-w-3xl mx-auto mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="relative">
            <Input
              type="text"
              placeholder="Search discussions..."
              className="w-full py-6 pl-12 pr-4 rounded-lg border-gray-200 focus:border-[#328E6E] focus:ring-[#328E6E]"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-3 mt-8 text-sm text-gray-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <span>Popular:</span>
          <a href="#" className="text-[#328E6E] hover:underline">
            Health Monitoring
          </a>
          <span>•</span>
          <a href="#" className="text-[#328E6E] hover:underline">
            Feeding Strategies
          </a>
          <span>•</span>
          <a href="#" className="text-[#328E6E] hover:underline">
            IoT Sensors
          </a>
          <span>•</span>
          <a href="#" className="text-[#328E6E] hover:underline">
            Data Analysis
          </a>
        </motion.div>
      </div>
    </AnimatedSection>
  )
}
