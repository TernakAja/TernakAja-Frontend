import { Activity, BarChart2, Cloud, Database, LineChart, Shield, Smartphone, Zap } from "lucide-react"
import { AnimatedDiv, AnimatedSection, SectionHeading } from "../ui-components"
import { motion } from "framer-motion"

export default function Features() {
  const features = [
    {
      icon: <Activity className="h-6 w-6" />,
      title: "Health Monitoring",
      description: "Real-time tracking of vital signs and health indicators for early disease detection",
    },
    {
      icon: <LineChart className="h-6 w-6" />,
      title: "Predictive Analytics",
      description: "AI-powered predictions for health issues, productivity, and resource optimization",
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Mobile Accessibility",
      description: "Monitor your livestock from anywhere with our intuitive mobile application",
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: "Data Management",
      description: "Comprehensive data collection and storage for long-term analysis and insights",
    },
    {
      icon: <Cloud className="h-6 w-6" />,
      title: "Cloud Integration",
      description: "Seamless integration with Microsoft Azure for reliable and scalable performance",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Security & Privacy",
      description: "Enterprise-grade security protocols to protect your valuable farm data",
    },
    {
      icon: <BarChart2 className="h-6 w-6" />,
      title: "Performance Metrics",
      description: "Detailed reports and dashboards to track livestock performance and farm efficiency",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Automated Alerts",
      description: "Instant notifications for critical events requiring immediate attention",
    },
  ]

  return (
    <AnimatedSection id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Powerful Features"
          subtitle="Comprehensive tools to revolutionize your livestock management"
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
              <h3 className="text-xl font-bold mb-2 text-gray-800">{feature.title}</h3>
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
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Powered by Microsoft Azure</h3>
              <p className="mb-6">
                Our platform leverages the power of Microsoft Azure's cloud infrastructure, IoT Hub, and AI services to
                deliver a robust, scalable, and secure solution for livestock monitoring and management.
              </p>
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
                src="/placeholder.svg?height=200&width=300"
                alt="Microsoft Azure Integration"
                className="max-w-full h-auto"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                viewport={{ once: true }}
              />
            </div>
          </div>
        </AnimatedDiv>
      </div>
    </AnimatedSection>
  )
}
