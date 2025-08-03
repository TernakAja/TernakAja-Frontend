import { useState } from "react";
import { AnimatedSection, SectionHeading } from "../ui-components";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Testimonials() {
  const { t } = useTranslation();
  const testimonials = [
    {
      name: "Peternakan Sapi Bhaldes",
      role: t("landing.testimonials.john.role"),
      content: t("landing.testimonials.john.content"),
      image:
        "https://res.cloudinary.com/dqvlnzw9f/image/upload/v1754216537/bang_jay_wk9fqn.jpg",
    },
  ];
  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent((current + 1) % testimonials.length);
  };
  const prev = () => {
    setCurrent((current - 1 + testimonials.length) % testimonials.length);
  };
  return (
    <AnimatedSection id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeading
          title={t("landing.testimonials.heading")}
          subtitle={t("landing.testimonials.subheading")}
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
                    className="w-24 h-24 rounded-full border-4 border-white shadow-md mx-auto object-cover"
                  />
                </div>
                <div className="md:w-3/4">
                  <p className="text-gray-700 text-lg mb-6 relative z-10">
                    "{testimonials[current].content}"
                  </p>
                  <div>
                    <h4 className="font-bold text-gray-800">
                      {testimonials[current].name}
                    </h4>
                    <p className="text-[#328E6E]">
                      {testimonials[current].role}
                    </p>
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

        {/* Map and Address Section */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold mb-4 text-[#328E6E]">
            Visit Our Partner
          </h3>
          <p className="text-lg text-gray-700 mb-4">
            <span className="font-semibold">Peternakan Sapi Bhaldes</span>
            <br />
            Jl. Nean Saba, Kunciran, Kec. Pinang, Kota Tangerang, Banten 15144
          </p>
          <a
            href="https://maps.app.goo.gl/DVqrgz7379WTUEnn7"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#328E6E] hover:underline text-lg font-medium"
          >
            View on Google Maps
          </a>
          <div className="mt-8 max-w-2xl mx-auto rounded-xl overflow-hidden shadow-lg">
            <img
              src="https://res.cloudinary.com/dqvlnzw9f/image/upload/v1754217478/bhaldes_yt9h3g.jpg"
              alt="Location Map"
              className="w-full h-auto object-cover aspect-video"
            />
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
