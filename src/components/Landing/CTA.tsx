import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AnimatedDiv, AnimatedSection } from "../ui-components"
import { motion } from "framer-motion"
import { ArrowRight, Check } from "lucide-react"

export default function Cta() {
  const benefits = [
    "Free consultation and farm assessment",
    "Customized implementation plan",
    "30-day free trial period",
    "Dedicated support team",
  ]

  return (
    <AnimatedSection id="cta" className="py-20 bg-gradient-to-br from-[#328E6E] to-[#67AE6E] text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimatedDiv direction="right">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Livestock Management?</h2>
            <p className="text-lg mb-8 text-white/90">
              Join hundreds of forward-thinking farmers who are already benefiting from Moorgan's innovative AI and IoT
              solutions.
            </p>

            <div className="mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3 mb-3">
                  <div className="bg-white/20 rounded-full p-1">
                    <Check size={16} className="text-white" />
                  </div>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            <motion.div
              className="flex items-center gap-2 text-[#E1EEBC]"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
            >
              <span className="text-4xl font-bold">100+</span>
              <span className="text-lg">Farms already using Moorgan</span>
            </motion.div>
          </AnimatedDiv>

          <AnimatedDiv direction="left">
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Get Started Today</h3>
              <p className="text-gray-600 mb-6">
                Fill out the form below and our team will contact you within 24 hours to discuss how Moorgan can benefit
                your farm.
              </p>

              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <Input id="firstName" placeholder="John" className="w-full" />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <Input id="lastName" placeholder="Doe" className="w-full" />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="john@example.com" className="w-full" />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <Input id="phone" placeholder="+1 (555) 123-4567" className="w-full" />
                </div>

                <div>
                  <label htmlFor="farmSize" className="block text-sm font-medium text-gray-700 mb-1">
                    Farm Size (number of animals)
                  </label>
                  <Input id="farmSize" placeholder="e.g., 100" className="w-full" />
                </div>

                <Button className="w-full bg-[#328E6E] hover:bg-[#67AE6E] text-white">
                  Request Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </div>
          </AnimatedDiv>
        </div>
      </div>
    </AnimatedSection>
  )
}
