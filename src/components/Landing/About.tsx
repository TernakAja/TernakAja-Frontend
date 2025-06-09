import { Check } from "lucide-react";
import {
  AnimatedDiv,
  AnimatedSection,
  SectionHeading,
} from "@/components/ui-components";
import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();
  const benefits = [
    t("landing.about.benefits.healthMonitoring"),
    t("landing.about.benefits.diseaseDetection"),
    t("landing.about.benefits.optimizedFeeding"),
    t("landing.about.benefits.reducedCosts"),
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
          <AnimatedDiv className="order-2 lg:order-1" direction="right">
            <div className="relative">
              <img
                src="./images/Landing/green-farm.png"
                alt="About Moorgan"
                className="w-full h-auto rounded-2xl shadow-lg"
              />
              <div className="absolute -bottom-6 -right-6 bg-[#E1EEBC] p-6 rounded-2xl shadow-lg max-w-xs">
                <div className="text-4xl font-bold text-[#328E6E] mb-2">5+</div>
                <div className="text-gray-700">
                  {t("landing.about.yearsExperience")}
                </div>
              </div>
            </div>
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
