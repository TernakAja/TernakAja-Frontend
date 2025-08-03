import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { AnimatedDiv, AnimatedSection, SectionHeading } from "../ui-components";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

export default function About() {
  const { t } = useTranslation();
  const benefits = [
    t("landing.about.benefits.healthMonitoring"),
    t("landing.about.benefits.diseaseDetection"),
    t("landing.about.benefits.animalWelfare"),
    t("landing.about.benefits.dataDriven"),
  ];
  return (
    <AnimatedSection id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeading
          title={t("landing.about.title")}
          subtitle={t("landing.about.subtitle")}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image slider section */}
          <AnimatedDiv className="order-2 lg:order-1 p-4" direction="right">
            <Carousel className="w-full max-w-xl mx-auto">
              <CarouselContent>
                <CarouselItem>
                  <motion.img
                    src="https://res.cloudinary.com/dqvlnzw9f/image/upload/v1754198433/IMG_20250706_143834_lofrnb.jpg"
                    alt="Farmer checking livestock"
                    className="w-full rounded-2xl shadow-lg object-cover aspect-video" // 16:9 aspect ratio
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  />
                </CarouselItem>
                <CarouselItem>
                  <motion.img
                    src="https://res.cloudinary.com/dqvlnzw9f/image/upload/v1754202616/dashboard_pympro.jpg"
                    alt="Livestock dashboard overview"
                    className="w-full rounded-xl shadow-md object-cover aspect-video" // 16:9 aspect ratio
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  />
                </CarouselItem>
                <CarouselItem>
                  <motion.img
                    src="https://res.cloudinary.com/dqvlnzw9f/image/upload/v1754202616/livestock_details_fs2dhx.jpg"
                    alt="Livestock details and health charts"
                    className="w-full rounded-xl shadow-md object-cover aspect-video" // 16:9 aspect ratio
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  />
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </AnimatedDiv>
          <AnimatedDiv className="order-1 lg:order-2" direction="left">
            <h3 className="text-2xl font-bold mb-4 text-[#328E6E]">
              {t("landing.about.sectionTitle")}
            </h3>
            <p className="text-gray-600 mb-6">
              {t("landing.about.paragraph1")}
            </p>
            <p className="text-gray-600 mb-8">
              {t("landing.about.paragraph2")}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="mt-1 bg-[#90C67C]/20 p-1 rounded-full">
                    <Check size={16} className="text-[#328E6E]" />
                  </div>
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </AnimatedDiv>
        </div>
      </div>
    </AnimatedSection>
  );
}
