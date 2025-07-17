import {
  Activity,
  BarChart2,
  Cloud,
  Database,
  LineChart,
  Shield,
  Smartphone,
  Zap,
} from "lucide-react";
import { AnimatedDiv, AnimatedSection, SectionHeading } from "../ui-components";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function Features() {
  const { t } = useTranslation();

  const features = [
    {
      icon: <Activity className="h-6 w-6" />,
      title: t("landing.features.healthMonitoring.title"),
      description: t("landing.features.healthMonitoring.description"),
    },
    {
      icon: <LineChart className="h-6 w-6" />,
      title: t("landing.features.predictiveAnalytics.title"),
      description: t("landing.features.predictiveAnalytics.description"),
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: t("landing.features.mobileAccessibility.title"),
      description: t("landing.features.mobileAccessibility.description"),
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: t("landing.features.dataManagement.title"),
      description: t("landing.features.dataManagement.description"),
    },
    {
      icon: <Cloud className="h-6 w-6" />,
      title: t("landing.features.cloudIntegration.title"),
      description: t("landing.features.cloudIntegration.description"),
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: t("landing.features.securityPrivacy.title"),
      description: t("landing.features.securityPrivacy.description"),
    },
    {
      icon: <BarChart2 className="h-6 w-6" />,
      title: t("landing.features.performanceMetrics.title"),
      description: t("landing.features.performanceMetrics.description"),
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: t("landing.features.automatedAlerts.title"),
      description: t("landing.features.automatedAlerts.description"),
    },
  ];

  return (
    <AnimatedSection id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeading
          title={t("landing.features.heading")}
          subtitle={t("landing.features.subheading")}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <AnimatedDiv
              key={index}
              className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group"
              direction="up"
              delay={index * 0.05}
            >
              <div className="mb-4 bg-[#E1EEBC] w-14 h-14 rounded-lg flex items-center justify-center text-[#328E6E] group-hover:bg-[#328E6E] group-hover:text-white transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </AnimatedDiv>
          ))}
        </div>

        <AnimatedDiv
          className="mt-16 bg-gradient-to-r from-[#328E6E] to-[#67AE6E] rounded-2xl p-8 md:p-12 text-white"
          direction="up"
          delay={0.2}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                {t("landing.features.azure.title")}
              </h3>
              <p className="mb-6">{t("landing.features.azure.description")}</p>
              <motion.div
                className="flex gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Azure IoT Hub</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Azure AI</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Azure Security</span>
                </div>
              </motion.div>
            </div>
            <div className="flex justify-center">
              <motion.img
                src="./images/Media/azure-overview.png"
                alt="Microsoft Azure Integration"
                className="max-w-full h-auto filter grayscale"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1, width: 800 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                viewport={{ once: true }}
              />
            </div>
          </div>
        </AnimatedDiv>
      </div>
    </AnimatedSection>
  );
}
