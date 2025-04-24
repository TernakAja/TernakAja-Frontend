import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#E1EEBC]/30 to-white px-4">
      <motion.div
        className="text-center max-w-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="relative mb-8 mx-auto"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="relative">
            <motion.div
              className="text-[180px] md:text-[240px] font-bold leading-none bg-gradient-to-r from-[#328E6E] to-[#90C67C] bg-clip-text text-transparent"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{
                y: {
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  duration: 2,
                  ease: "easeInOut",
                },
              }}
            >
              404
            </motion.div>

            <motion.div
              className="absolute -bottom-6 w-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className="h-2 bg-[#E1EEBC] rounded-full mx-auto w-3/4"></div>
            </motion.div>
          </div>

          <motion.div
            className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-full h-full -z-10"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.1, scale: 1.5 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="w-full h-full rounded-full bg-[#328E6E]"></div>
          </motion.div>
        </motion.div>

        <motion.h1
          className="text-3xl md:text-4xl font-bold mb-4 text-gray-800"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Page Not Found
        </motion.h1>

        <motion.p
          className="text-lg text-gray-600 mb-8 max-w-md mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          Oops! It seems like you've wandered into uncharted territory. The page you're looking for doesn't exist or has
          been moved.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <a href="/">
            <Button className="bg-[#328E6E] hover:bg-[#67AE6E] text-white px-6 py-6 rounded-lg text-lg">
              <Home className="mr-2 h-5 w-5" />
              Return Home
            </Button>
          </a>
        </motion.div>

        <motion.div
          className="mt-12 text-gray-500 flex flex-wrap justify-center gap-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <a href="/" className="hover:text-[#328E6E] transition-colors">
            Home
          </a>
          <span>•</span>
          <a href="/contact" className="hover:text-[#328E6E] transition-colors">
            Contact Support
          </a>
          <span>•</span>
          <a href="/team" className="hover:text-[#328E6E] transition-colors">
            About Us
          </a>
        </motion.div>
      </motion.div>

      {/* Animated elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-8 h-8 rounded-full bg-[#90C67C]/30"
        animate={{
          y: [0, -50, 0],
          opacity: [0.7, 0.2, 0.7],
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 3,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/3 w-12 h-12 rounded-full bg-[#328E6E]/20"
        animate={{
          y: [0, -30, 0],
          opacity: [0.5, 0.2, 0.5],
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 4,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-6 h-6 rounded-full bg-[#E1EEBC]/50"
        animate={{
          y: [0, -20, 0],
          opacity: [0.6, 0.3, 0.6],
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 2.5,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
    </div>
  )
}
