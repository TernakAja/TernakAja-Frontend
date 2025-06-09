import { Button } from "@/components/ui/button";
import { AnimatedDiv, AnimatedSection, SectionHeading } from "../ui-components";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Products() {
  const { t } = useTranslation();

  const products = t("landing.products.items", { returnObjects: true }) as {
    name: string;
    description: string;
    features: string[];
    image: string;
  }[];

  return (
    <AnimatedSection id="products" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeading
          title={t("landing.products.heading")}
          subtitle={t("landing.products.subheading")}
        />

        <div className="space-y-20">
          {products.map((product, index) => (
            <div
              key={index}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <AnimatedDiv
                direction={index % 2 === 0 ? "right" : "left"}
                className={index % 2 === 1 ? "lg:order-2" : ""}
              >
                <div className="relative">
                  <motion.div
                    className="bg-[#E1EEBC] rounded-2xl p-8 flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="max-w-full h-auto"
                    />
                  </motion.div>
                  <motion.div
                    className="absolute -z-10 w-full h-full bg-[#328E6E]/10 rounded-2xl -right-6 -bottom-6"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    viewport={{ once: true }}
                  />
                </div>
              </AnimatedDiv>

              <AnimatedDiv
                direction={index % 2 === 0 ? "left" : "right"}
                className={index % 2 === 1 ? "lg:order-1" : ""}
              >
                <h3 className="text-3xl font-bold mb-4 text-[#328E6E]">
                  {product.name}
                </h3>
                <p className="text-lg text-gray-600 mb-6">
                  {product.description}
                </p>

                <div className="mb-8">
                  <h4 className="font-medium text-gray-700 mb-3">
                    Key Features:
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#90C67C]"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button className="bg-[#328E6E] hover:bg-[#67AE6E] text-white">
                  Learn More
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </AnimatedDiv>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
