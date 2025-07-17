import { motion } from "framer-motion";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50">
      <div className="relative">
        <motion.div
          className="w-24 h-24 rounded-full border-4 border-[#E1EEBC]"
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 1,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute top-0 left-0 w-24 h-24 rounded-full border-t-4 border-[#328E6E]"
          animate={{ rotate: 360 }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 0.5,
            ease: "linear",
          }}
        />

        <motion.div
          className="absolute top-0 left-0 w-24 h-24 rounded-full border-b-4 border-[#90C67C]"
          animate={{ rotate: -360 }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 1,
            ease: "linear",
          }}
        />

        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
              stroke="#328E6E"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </div>

      <motion.div
        className="mt-8 text-2xl font-bold bg-gradient-to-r from-[#328E6E] to-[#90C67C] bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        TernakAja
      </motion.div>

      <motion.div
        className="mt-4 text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        Loading...
      </motion.div>

      <motion.div
        className="mt-6 w-48 h-1 bg-gray-200 rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-[#328E6E] to-[#90C67C]"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 1, duration: 1, ease: "easeInOut" }}
        />
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
          duration: 2,
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
  );
}
