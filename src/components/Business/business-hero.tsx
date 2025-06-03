import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { TrendingUp, Users, Globe, Award } from "lucide-react"

export function BusinessHero() {
  const stats = [
    { icon: Users, label: "Active Farmers", value: "10,000+" },
    { icon: Globe, label: "Countries", value: "25+" },
    { icon: TrendingUp, label: "Growth Rate", value: "150%" },
    { icon: Award, label: "Industry Awards", value: "12" },
  ]

  return (
    <section className="relative py-20 bg-gradient-to-br from-[#328E6E] to-[#67AE6E] text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 border border-white/20 rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 border border-white/20 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Partner with
            <span className="block text-[#E1EEBC]">Moorgan</span>
          </h1>

          <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed">
            Join the revolution in livestock monitoring technology. Explore our comprehensive business model and
            discover partnership opportunities that drive mutual growth.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="bg-white text-[#328E6E] hover:bg-gray-100 font-semibold">
              Schedule Partnership Call
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-[#328E6E] font-semibold"
            >
              Download Business Plan
            </Button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, ) => (
            <div key={stat.label} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4">
                <stat.icon className="w-8 h-8" />
              </div>
              <div className="text-3xl font-bold mb-2">{stat.value}</div>
              <div className="text-white/80">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
