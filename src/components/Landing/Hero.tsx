"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight, BarChart2, Shield, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  AnimatedDiv,
  AnimatedHeading,
  AnimatedSection,
} from "../ui-components";

const useNavigate = () => {
  return (path: string) => console.log(`Navigating to: ${path}`);
};

export default function Hero() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <AnimatedSection
      id="home"
      className="pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-gradient-to-b from-[#E1EEBC]/30 to-white"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <AnimatedDiv
              className="inline-block px-4 py-2 bg-[#E1EEBC] rounded-full text-[#328E6E] font-medium mb-6"
              direction="down"
            >
              {t("landing.hero.poweredBy")}
            </AnimatedDiv>
            <AnimatedHeading
              as="h1"
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              direction="up"
            >
              {t("landing.hero.heading.beforeHighlight")}{" "}
              <span className="bg-gradient-to-r from-[#328E6E] to-[#90C67C] bg-clip-text text-transparent">
                {t("landing.hero.heading.highlight")}
              </span>
            </AnimatedHeading>
            <AnimatedDiv
              className="text-lg text-gray-600 mb-8"
              direction="up"
              delay={0.1}
            >
              {t("landing.hero.description")}
            </AnimatedDiv>
            <AnimatedDiv
              className="flex flex-wrap gap-4"
              direction="up"
              delay={0.2}
            >
              <Button
                className="bg-[#328E6E] hover:bg-[#67AE6E] text-white px-6 py-6 rounded-lg text-lg"
                onClick={() => navigate("/register")}
              >
                {t("landing.hero.buttons.getStarted")}
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                className="border-[#328E6E] text-[#328E6E] hover:bg-[#328E6E] hover:text-white px-6 py-6 rounded-lg text-lg bg-transparent"
                onClick={() =>
                  window.open("https://youtu.be/X5y57hzjKeQ", "_blank")
                }
              >
                {t("landing.hero.buttons.watchDemo")}
              </Button>
            </AnimatedDiv>
            <AnimatedDiv
              className="mt-12 grid grid-cols-3 gap-4"
              direction="up"
              delay={0.3}
            >
              <div className="flex items-center gap-2">
                <BarChart2 className="text-[#328E6E]" />
                <span className="text-sm font-medium">
                  {t("landing.hero.features.realTimeData")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="text-[#328E6E]" />
                <span className="text-sm font-medium">
                  {t("landing.hero.features.securePlatform")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="text-[#328E6E]" />
                <span className="text-sm font-medium">
                  {t("landing.hero.features.fastInsights")}
                </span>
              </div>
            </AnimatedDiv>
          </div>
          {/* Modified image section for bento layout with animations */}
          <AnimatedDiv
            className="relative grid grid-cols-2 gap-4 p-4"
            direction="left"
          >
            <motion.img
              src="https://res.cloudinary.com/dqvlnzw9f/image/upload/v1754200639/sapi_gk4xl4.png"
              alt="Main device dashboard showing livestock data"
              className="col-span-2 rounded-2xl shadow-2xl object-cover aspect-video w-full h-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            />
            <motion.img
              src="https://res.cloudinary.com/dqvlnzw9f/image/upload/v1754199720/device2_lbzcqw.jpg"
              alt="Cow with monitoring device on ear"
              className="rounded-xl shadow-lg object-cover aspect-square w-full h-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            />
            <motion.img
              src="https://res.cloudinary.com/dqvlnzw9f/image/upload/v1754199720/device_ke_sapi_wa9ti7.jpg"
              alt="Chart showing livestock health and productivity data"
              className="rounded-xl shadow-lg object-cover aspect-square w-full h-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            />
          </AnimatedDiv>
        </div>
      </div>
    </AnimatedSection>
  );
}
