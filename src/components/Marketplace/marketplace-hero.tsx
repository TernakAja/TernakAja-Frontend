import { Button } from "@/components/ui/button"
import { AnimatedDiv, AnimatedHeading, AnimatedSection } from "../ui-components"
import { motion } from "framer-motion"
import { Search, ShoppingBag } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function MarketplaceHero() {
  return (
    <AnimatedSection className="pt-32 pb-16 md:pt-40 md:pb-20 bg-gradient-to-b from-[#E1EEBC]/30 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <AnimatedDiv
            className="inline-block px-4 py-2 bg-[#E1EEBC] rounded-full text-[#328E6E] font-medium mb-6"
            direction="down"
          >
            Livestock Marketplace
          </AnimatedDiv>

          <AnimatedHeading
            as="h1"
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            direction="up"
          >
            Find Quality{" "}
            <span className="bg-gradient-to-r from-[#328E6E] to-[#90C67C] bg-clip-text text-transparent">
              Livestock
            </span>{" "}
            with Verified Health Data
          </AnimatedHeading>

          <AnimatedDiv className="text-lg text-gray-600 max-w-3xl mx-auto mb-8" direction="up" delay={0.1}>
            Browse our marketplace for livestock with complete health records, monitoring history, and verified data.
            Buy with confidence from trusted sellers.
          </AnimatedDiv>

          <AnimatedDiv className="flex flex-col sm:flex-row gap-4 justify-center" direction="up" delay={0.2}>
            <Button className="bg-[#328E6E] hover:bg-[#67AE6E] text-white px-6 py-6 rounded-lg text-lg">
              <ShoppingBag className="mr-2 h-5 w-5" />
              Browse Livestock
            </Button>
            <Button
              variant="outline"
              className="border-[#328E6E] text-[#328E6E] hover:bg-[#328E6E] hover:text-white px-6 py-6 rounded-lg text-lg"
            >
              Sell Your Livestock
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
              placeholder="Search for livestock by type, breed, location..."
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
            Dairy Cattle
          </a>
          <span>•</span>
          <a href="#" className="text-[#328E6E] hover:underline">
            Beef Cattle
          </a>
          <span>•</span>
          <a href="#" className="text-[#328E6E] hover:underline">
            Sheep
          </a>
          <span>•</span>
          <a href="#" className="text-[#328E6E] hover:underline">
            Goats
          </a>
          <span>•</span>
          <a href="#" className="text-[#328E6E] hover:underline">
            Pigs
          </a>
        </motion.div>
      </div>
    </AnimatedSection>
  )
}
