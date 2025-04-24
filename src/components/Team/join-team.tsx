import { Button } from "@/components/ui/button"
import { AnimatedDiv, AnimatedSection } from "../ui-components"
import { motion } from "framer-motion"
import { ArrowRight, Check } from "lucide-react"

export default function JoinTeam() {
  const benefits = [
    "Competitive salary and equity options",
    "Remote-first work environment",
    "Flexible working hours",
    "Professional development budget",
    "Health and wellness benefits",
    "Work on meaningful projects with global impact",
  ]

  return (
    <AnimatedSection className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-[#328E6E] to-[#67AE6E] rounded-2xl overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AnimatedDiv className="p-8 md:p-12 text-white" direction="right">
              <h2 className="text-3xl font-bold mb-6">Join Our Team</h2>
              <p className="text-lg mb-8 text-white/90">
                We're always looking for talented individuals who are passionate about technology, agriculture, and
                sustainability. Join us in our mission to revolutionize livestock management.
              </p>

              <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-1 bg-white/20 p-1 rounded-full">
                      <Check size={16} className="text-white" />
                    </div>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              <Button className="bg-white text-[#328E6E] hover:bg-[#E1EEBC] hover:text-[#328E6E]">
                View Open Positions
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </AnimatedDiv>

            <AnimatedDiv className="relative" direction="left">
              <div className="absolute inset-0 bg-gradient-to-r from-[#328E6E]/80 to-transparent lg:bg-none flex items-center justify-center lg:justify-start p-8">
                <motion.div
                  className="bg-white/90 backdrop-blur-sm p-6 rounded-xl max-w-md lg:ml-8 shadow-lg"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-bold text-[#328E6E] mb-2">Current Openings</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#328E6E]"></div>
                      <span>Senior Machine Learning Engineer</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#328E6E]"></div>
                      <span>IoT Hardware Developer</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#328E6E]"></div>
                      <span>UX/UI Designer</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#328E6E]"></div>
                      <span>Agricultural Data Scientist</span>
                    </li>
                  </ul>
                </motion.div>
              </div>
            </AnimatedDiv>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
