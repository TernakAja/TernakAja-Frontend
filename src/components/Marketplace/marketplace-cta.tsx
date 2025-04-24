import { Button } from "@/components/ui/button"
import { AnimatedDiv, AnimatedSection } from "../ui-components"
import { motion } from "framer-motion"
import { Check, ShoppingBag } from "lucide-react"

export default function MarketplaceCta() {
  const benefits = [
    "Verified health records and monitoring data",
    "Direct connection with trusted sellers",
    "Secure transactions and buyer protection",
    "Complete livestock history and documentation",
    "Post-purchase support and resources",
  ]

  return (
    <AnimatedSection className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-[#328E6E] to-[#67AE6E] rounded-2xl overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AnimatedDiv className="p-8 md:p-12 text-white" direction="right">
              <h2 className="text-3xl font-bold mb-6">Ready to Sell Your Livestock?</h2>
              <p className="text-lg mb-8 text-white/90">
                Join our marketplace to connect with thousands of buyers looking for quality livestock with verified
                health data. Our platform makes selling simple, secure, and transparent.
              </p>

              <div className="mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3 mb-3">
                    <div className="mt-1 bg-white/20 p-1 rounded-full">
                      <Check size={16} className="text-white" />
                    </div>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              >
                <Button className="bg-white text-[#328E6E] hover:bg-[#E1EEBC] hover:text-[#328E6E]">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  List Your Livestock
                </Button>
                <Button variant="outline" className="border-white text-black hover:bg-white/20">
                  Learn More
                </Button>
              </motion.div>
            </AnimatedDiv>

            <AnimatedDiv className="relative hidden lg:block" direction="left">
              <img
                src="/images/Livestocks/dairy-cow-1.png"
                alt="Livestock Marketplace"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#328E6E]/80"></div>
            </AnimatedDiv>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
