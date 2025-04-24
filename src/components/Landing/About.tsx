import { Check } from "lucide-react"
import { AnimatedDiv, AnimatedSection, SectionHeading } from "@/components/ui-components"

export default function About() {
  const benefits = [
    "Real-time health monitoring of livestock",
    "Early disease detection and prevention",
    "Optimized feeding schedules and nutrition",
    "Reduced operational costs and resource usage",
    "Improved animal welfare and productivity",
    "Data-driven decision making for farmers",
  ]

  return (
    <AnimatedSection id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="About Moorgan"
          subtitle="Transforming livestock management through innovative technology and sustainable practices"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimatedDiv className="order-2 lg:order-1" direction="right">
            <div className="relative">
              <img
                src="/placeholder.svg?height=500&width=600"
                alt="About Moorgan"
                className="w-full h-auto rounded-2xl shadow-lg"
              />
              <div className="absolute -bottom-6 -right-6 bg-[#E1EEBC] p-6 rounded-2xl shadow-lg max-w-xs">
                <div className="text-4xl font-bold text-[#328E6E] mb-2">5+</div>
                <div className="text-gray-700">Years of research and development in AI livestock monitoring</div>
              </div>
            </div>
          </AnimatedDiv>

          <AnimatedDiv className="order-1 lg:order-2" direction="left">
            <h3 className="text-2xl font-bold mb-4 text-[#328E6E]">The Future of Livestock Management</h3>
            <p className="text-gray-600 mb-6">
              Moorgan combines cutting-edge AI algorithms with IoT sensors to create a comprehensive livestock
              monitoring system that helps farmers optimize their operations, improve animal welfare, and increase
              productivity while reducing environmental impact.
            </p>
            <p className="text-gray-600 mb-8">
              Built on Microsoft Azure's robust cloud infrastructure, our platform provides real-time insights,
              predictive analytics, and actionable recommendations to transform traditional farming into smart,
              sustainable agriculture.
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
  )
}
