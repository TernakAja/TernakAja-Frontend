import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { Bell, Home } from "lucide-react"

export default function ComingSoonContent() {
  const [email, setEmail] = useState("")
  const [days, setDays] = useState(30)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate countdown - in a real app, you'd calculate from a launch date
      if (seconds > 0) {
        setSeconds(seconds - 1)
      } else if (minutes > 0) {
        setMinutes(minutes - 1)
        setSeconds(59)
      } else if (hours > 0) {
        setHours(hours - 1)
        setMinutes(59)
        setSeconds(59)
      } else if (days > 0) {
        setDays(days - 1)
        setHours(23)
        setMinutes(59)
        setSeconds(59)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [days, hours, minutes, seconds])

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    // Handle newsletter signup
    alert(`Thank you for subscribing with ${email}! We'll notify you when we launch.`)
    setEmail("")
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#E1EEBC]/30 to-white px-4 py-20">
      <motion.div
        className="text-center max-w-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="inline-block px-4 py-2 bg-[#E1EEBC] rounded-full text-[#328E6E] font-medium mb-6">
            Coming Soon
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            We're Working on Something{" "}
            <span className="bg-gradient-to-r from-[#328E6E] to-[#90C67C] bg-clip-text text-transparent">Amazing</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Our team is developing new features to revolutionize livestock monitoring. Stay tuned for updates and be the
            first to know when we launch.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="text-3xl md:text-4xl font-bold text-[#328E6E] mb-2">{days}</div>
            <div className="text-gray-600">Days</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="text-3xl md:text-4xl font-bold text-[#328E6E] mb-2">{hours}</div>
            <div className="text-gray-600">Hours</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="text-3xl md:text-4xl font-bold text-[#328E6E] mb-2">{minutes}</div>
            <div className="text-gray-600">Minutes</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="text-3xl md:text-4xl font-bold text-[#328E6E] mb-2">{seconds}</div>
            <div className="text-gray-600">Seconds</div>
          </div>
        </motion.div>

        <motion.div
          className="mb-12"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-4">Get Notified When We Launch</h2>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-grow"
            />
            <Button type="submit" className="bg-[#328E6E] hover:bg-[#67AE6E] text-white">
              <Bell className="mr-2 h-4 w-4" />
              Notify Me
            </Button>
          </form>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <a href="/">
            <Button variant="outline" className="border-[#328E6E] text-[#328E6E] hover:bg-[#328E6E] hover:text-white">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </a>
        </motion.div>

        <motion.div
          className="mt-16 flex justify-center gap-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <div className="text-center">
            <div className="bg-[#E1EEBC] w-16 h-16 rounded-full flex items-center justify-center text-[#328E6E] mx-auto mb-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 8, ease: "linear" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                </svg>
              </motion.div>
            </div>
            <h3 className="font-medium">Enhanced Security</h3>
          </div>

          <div className="text-center">
            <div className="bg-[#E1EEBC] w-16 h-16 rounded-full flex items-center justify-center text-[#328E6E] mx-auto mb-3">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "easeInOut" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16" />
                </svg>
              </motion.div>
            </div>
            <h3 className="font-medium">New Dashboard</h3>
          </div>

          <div className="text-center">
            <div className="bg-[#E1EEBC] w-16 h-16 rounded-full flex items-center justify-center text-[#328E6E] mx-auto mb-3">
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2v8" />
                  <path d="m4.93 10.93 1.41 1.41" />
                  <path d="M2 18h2" />
                  <path d="M20 18h2" />
                  <path d="m19.07 10.93-1.41 1.41" />
                  <path d="M22 22H2" />
                  <path d="m8 22 4-10 4 10" />
                </svg>
              </motion.div>
            </div>
            <h3 className="font-medium">Mobile App</h3>
          </div>
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
