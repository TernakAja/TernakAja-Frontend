import { useState } from "react"
import { AnimatedSection, SectionHeading } from "../ui-components"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

export default function Testimonials() {
  const testimonials = [
    {
      name: "John Farmer",
      role: "Dairy Farm Owner",
      content:
        "Moorgan has transformed how we manage our dairy farm. The real-time health monitoring has reduced disease outbreaks by 70% and improved our overall productivity.",
      image: "/images/Testimonial/farmer-1.png",
    },
    {
      name: "Maria Garcia",
      role: "Livestock Researcher",
      content:
        "As a researcher, I'm impressed by the quality and accuracy of data provided by Moorgan. It's revolutionizing how we understand livestock behavior and health patterns.",
      image: "/images/Testimonial/girl-1.png",
    },
    {
      name: "Robert Chen",
      role: "Agricultural Consultant",
      content:
        "I've recommended Moorgan to dozens of my clients, and the feedback has been overwhelmingly positive. The ROI is clear within just a few months of implementation.",
      image: "/images/Testimonial/boy-1.png",
    },
  ]

  const [current, setCurrent] = useState(0)

  const next = () => {
    setCurrent((current + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrent((current - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <AnimatedSection id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="What Our Clients Say"
          subtitle="Hear from farmers and agricultural professionals using Moorgan"
        />

        <div className="max-w-4xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-[#E1EEBC]/30 rounded-2xl p-8 md:p-12 relative"
            >
              <Quote className="text-[#328E6E] opacity-20 absolute top-8 left-8 h-16 w-16" />

              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/4 flex-shrink-0">
                  <img
                    src={testimonials[current].image || "/placeholder.svg"}
                    alt={testimonials[current].name}
                    className="w-24 h-24 rounded-full border-4 border-white shadow-md mx-auto"
                  />
                </div>
                <div className="md:w-3/4">
                  <p className="text-gray-700 text-lg mb-6 relative z-10">"{testimonials[current].content}"</p>
                  <div>
                    <h4 className="font-bold text-gray-800">{testimonials[current].name}</h4>
                    <p className="text-[#328E6E]">{testimonials[current].role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center mt-8 gap-4">
            <button
              onClick={prev}
              className="bg-white rounded-full p-3 shadow-md text-[#328E6E] hover:bg-[#328E6E] hover:text-white transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-2 items-center">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    current === index ? "bg-[#328E6E]" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="bg-white rounded-full p-3 shadow-md text-[#328E6E] hover:bg-[#328E6E] hover:text-white transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
