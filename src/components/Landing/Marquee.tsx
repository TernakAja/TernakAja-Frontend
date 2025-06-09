import { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { AnimatedSection } from "../ui-components";
import { useTranslation } from "react-i18next";

export default function MarqueeSection() {
  const { t } = useTranslation();
  const technologies = [
    "Microsoft Azure",
    "IoT Sensors",
    "AI Analytics",
    "Machine Learning",
    "Predictive Modeling",
    "Real-time Monitoring",
    "Cloud Computing",
    "Data Visualization",
    "Sustainable Farming",
    "Smart Agriculture",
  ];

  // Duplicate the array for continuous scrolling effect
  const allTechnologies = [...technologies, ...technologies];

  const controls = useAnimation();
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false });

  useEffect(() => {
    if (isInView) {
      controls.start({
        x: [0, -50 * technologies.length],
        transition: {
          x: {
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        },
      });
    } else {
      controls.stop();
    }
  }, [controls, isInView, technologies.length]);

  return (
    <AnimatedSection className="py-16 bg-[#328E6E]">
      <div className="container mx-auto px-4 mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-8">
          {t("landing.marquee.heading")}
        </h2>
      </div>

      <div className="overflow-hidden" ref={containerRef}>
        <motion.div className="flex whitespace-nowrap" animate={controls}>
          {allTechnologies.map((tech, index) => (
            <div
              key={index}
              className="inline-block mx-8 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-lg text-white font-medium"
            >
              {tech}
            </div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
