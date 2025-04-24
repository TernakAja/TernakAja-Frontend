import { useState, useEffect } from "react"
import { AnimatedDiv, AnimatedSection, SectionHeadingWhite } from "../ui-components"
import { motion } from "framer-motion"

export default function Statistics() {
  const stats = [
    { value: 85, label: "Reduction in Disease Outbreaks", suffix: "%" },
    { value: 10000, label: "Livestock Monitored", suffix: "+" },
    { value: 30, label: "Increase in Farm Productivity", suffix: "%" },
    { value: 40, label: "Reduction in Water Usage", suffix: "%" },
  ]

  return (
    <AnimatedSection id="statistics" className="py-20 bg-[#328E6E]">
      <div className="container mx-auto px-4">
        <SectionHeadingWhite title="Our Impact" subtitle="Transforming livestock management with measurable results" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <AnimatedDiv
              key={index}
              className="bg-white rounded-2xl p-8 text-center shadow-lg"
              direction="up"
              delay={index * 0.1}
            >
              <CountUp
                target={stat.value}
                suffix={stat.suffix}
                className="text-5xl font-bold bg-gradient-to-r from-[#328E6E] to-[#90C67C] bg-clip-text text-transparent"
              />
              <div className="mt-4 text-gray-600">{stat.label}</div>
            </AnimatedDiv>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}

function CountUp({ target, suffix = "", className = "" }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    const duration = 2000 // 2 seconds

    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const currentCount = Math.floor(progress * target)

      setCount(currentCount)

      if (progress < 1) {
        requestAnimationFrame(animateCount)
      }
    }

    requestAnimationFrame(animateCount)

    return () => setCount(0)
  }, [target])

  return (
    <motion.div
      className={className}
      initial={{ scale: 0.8, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      {count}
      {suffix}
    </motion.div>
  )
}
