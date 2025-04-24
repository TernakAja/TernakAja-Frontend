import { AnimatedDiv, AnimatedSection, SectionHeading } from "../ui-components"
import { Award, Heart, Lightbulb, Recycle, Target, Users } from "lucide-react"

export default function TeamValues() {
  const values = [
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: "Innovation",
      description: "We constantly push boundaries to create cutting-edge solutions for livestock management.",
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Compassion",
      description: "We care deeply about animal welfare and the farmers who dedicate their lives to agriculture.",
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Excellence",
      description: "We strive for excellence in everything we do, from code quality to customer service.",
    },
    {
      icon: <Recycle className="h-6 w-6" />,
      title: "Sustainability",
      description: "We're committed to creating solutions that promote sustainable farming practices.",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Collaboration",
      description: "We believe in the power of teamwork and diverse perspectives to solve complex problems.",
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Integrity",
      description: "We operate with honesty, transparency, and ethical responsibility in all our actions.",
    },
  ]

  return (
    <AnimatedSection className="py-20 bg-[#E1EEBC]/30">
      <div className="container mx-auto px-4">
        <SectionHeading title="Our Values" subtitle="The principles that guide our work and culture" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <AnimatedDiv
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              direction="up"
              delay={index * 0.1}
            >
              <div className="mb-4 bg-[#328E6E] w-12 h-12 rounded-lg flex items-center justify-center text-white">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </AnimatedDiv>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}
