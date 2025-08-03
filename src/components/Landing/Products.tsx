"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { AnimatedDiv, AnimatedSection, SectionHeading } from "../ui-components";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

export default function Products() {
  const { t } = useTranslation();

  const products = [
    {
      nameKey: "landing.products.items.0.name",
      descriptionKey: "landing.products.items.0.description",
      featuresKey: "landing.products.items.0.features",
      images: [
        "https://res.cloudinary.com/dqvlnzw9f/image/upload/v1754213837/3D_b0yrza.jpg",
        "https://res.cloudinary.com/dqvlnzw9f/image/upload/v1754199721/device1_vkch1e.jpg",
        "https://res.cloudinary.com/dqvlnzw9f/image/upload/v1754199720/device2_lbzcqw.jpg",
      ],
    },
    {
      nameKey: "landing.products.items.1.name",
      descriptionKey: "landing.products.items.1.description",
      featuresKey: "landing.products.items.1.features",
      images: [
        "https://res.cloudinary.com/dqvlnzw9f/image/upload/v1754202616/dashboard_pympro.jpg",
        "https://res.cloudinary.com/dqvlnzw9f/image/upload/v1754215393/listt_y7s9he.jpg",
        "https://res.cloudinary.com/dqvlnzw9f/image/upload/v1754202616/livestock_details_fs2dhx.jpg",
      ],
    },
  ];

  return (
    <AnimatedSection id="products" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeading
          title={t("landing.products.heading")}
          subtitle={t("landing.products.subheading")}
        />
        <div className="space-y-24">
          {products.map((product, index) => (
            <div
              key={index}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <AnimatedDiv
                direction={index % 2 === 0 ? "right" : "left"}
                className={index % 2 === 1 ? "lg:order-2" : ""}
              >
                <div className="relative">
                  <motion.div
                    className="bg-[#E1EEBC] rounded-2xl p-6"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    {index === 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {product.images.map((image, imgIndex) => (
                          <motion.div
                            key={imgIndex}
                            className="relative overflow-hidden rounded-lg shadow-md"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                              delay: imgIndex * 0.1,
                              duration: 0.5,
                            }}
                            whileHover={{
                              scale: 1.03,
                              transition: { duration: 0.2 },
                            }}
                          >
                            <img
                              src={image || "/placeholder.svg"}
                              alt={`${t(product.nameKey)} ${imgIndex + 1}`}
                              className="w-full h-auto aspect-square object-cover"
                            />
                            <motion.div
                              className="absolute inset-0 bg-[#328E6E]/10 opacity-0"
                              whileHover={{ opacity: 1 }}
                              transition={{ duration: 0.2 }}
                            />
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <Carousel className="w-3/4 mx-auto">
                        <CarouselContent>
                          {product.images.map((image, imgIndex) => (
                            <CarouselItem key={imgIndex}>
                              <motion.img
                                src={image || "/placeholder.svg"}
                                alt={`${t(product.nameKey)} ${imgIndex + 1}`}
                                className="w-full h-auto aspect-[4/3] object-cover rounded-lg shadow-md max-w-[500px] max-h-[375px]"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                  delay: imgIndex * 0.1,
                                  duration: 0.6,
                                }}
                                whileHover={{
                                  scale: 1.02,
                                  transition: { duration: 0.2 },
                                }}
                              />
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                      </Carousel>
                    )}
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
                  {t(product.nameKey)}
                </h3>
                <p className="text-lg text-gray-600 mb-6">
                  {t(product.descriptionKey)}
                </p>
                <div className="mb-8">
                  <h4 className="font-medium text-gray-700 mb-3">
                    {t("landing.products.featuresTitle")}
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {Object.values(
                      t(product.featuresKey, {
                        returnObjects: true,
                      }) as string[]
                    ).map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#90C67C]"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Button className="bg-[#328E6E] hover:bg-[#67AE6E] text-white">
                  {t("landing.products.learnMore")}
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
