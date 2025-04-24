import { motion } from "framer-motion"
import { AlertCircle } from "lucide-react"

export default function FeaturedHealthTip() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#E1EEBC] p-6 rounded-lg border border-[#90C67C]"
    >
      <div className="flex items-start space-x-4">
        <div className="bg-[#328E6E] p-2 rounded-full">
          <AlertCircle className="h-6 w-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-[#328E6E] mb-2">Seasonal Health Alert</h3>
          <p className="text-gray-700 mb-4">
            As temperatures rise, heat stress becomes a significant concern for livestock. Ensure adequate shade,
            ventilation, and fresh water access. Monitor animals for signs of distress, particularly during peak heat
            hours.
          </p>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="bg-[#328E6E] text-white px-4 py-2 rounded-md hover:bg-[#67AE6E] transition-colors"
          >
            Learn More
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
