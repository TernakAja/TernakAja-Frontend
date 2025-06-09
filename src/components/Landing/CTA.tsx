import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnimatedDiv, AnimatedSection } from "../ui-components";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Cta() {
  const { t } = useTranslation();

  const benefits = [
    t("landing.cta.benefit1"),
    t("landing.cta.benefit2"),
    t("landing.cta.benefit3"),
    t("landing.cta.benefit4"),
  ];

  return (
    <AnimatedSection
      id="cta"
      className="py-20 bg-gradient-to-br from-[#328E6E] to-[#67AE6E] text-white"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimatedDiv direction="right">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t("landing.cta.title")}
            </h2>
            <p className="text-lg mb-8 text-white/90">
              {t("landing.cta.subtitle")}
            </p>

            <div className="mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3 mb-3">
                  <div className="bg-white/20 rounded-full p-1">
                    <Check size={16} className="text-white" />
                  </div>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            <motion.div
              className="flex items-center gap-2 text-[#E1EEBC]"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
            >
              <span className="text-4xl font-bold">100+</span>
              <span className="text-lg">{t("landing.cta.farmCount")}</span>
            </motion.div>
          </AnimatedDiv>

          <AnimatedDiv direction="left">
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">
                {t("landing.cta.form.title")}
              </h3>
              <p className="text-gray-600 mb-6">
                {t("landing.cta.form.description")}
              </p>

              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      {t("landing.cta.form.firstName")}
                    </label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      className="w-full text-black"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      {t("landing.cta.form.lastName")}
                    </label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      className="w-full text-black"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {t("landing.cta.form.email")}
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    className="w-full text-black"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {t("landing.cta.form.phone")}
                  </label>
                  <Input
                    id="phone"
                    placeholder="+1 (555) 123-4567"
                    className="w-full text-black"
                  />
                </div>

                <div>
                  <label
                    htmlFor="farmSize"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {t("landing.cta.form.farmSize")}
                  </label>
                  <Input
                    id="farmSize"
                    placeholder="e.g., 100"
                    className="w-full text-black"
                  />
                </div>

                <Button className="w-full bg-[#328E6E] hover:bg-[#67AE6E] text-white">
                  {t("landing.cta.form.button")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </div>
          </AnimatedDiv>
        </div>
      </div>
    </AnimatedSection>
  );
}
