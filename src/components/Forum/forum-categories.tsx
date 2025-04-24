import { AnimatedDiv, AnimatedSection, SectionHeading } from "../ui-components"
import { BarChart2, BookOpen, HelpCircle, Leaf, MessageCircle, Settings, ShieldAlert, Users } from "lucide-react"

export default function ForumCategories() {
  const categories = [
    {
      icon: <Leaf className="h-6 w-6" />,
      name: "Livestock Health",
      description: "Discuss animal health, disease prevention, and wellness strategies",
      posts: 128,
      color: "#328E6E",
    },
    {
      icon: <BarChart2 className="h-6 w-6" />,
      name: "Data Analytics",
      description: "Share insights from your livestock monitoring data",
      posts: 94,
      color: "#67AE6E",
    },
    {
      icon: <Settings className="h-6 w-6" />,
      name: "Hardware & IoT",
      description: "Discuss sensors, devices, and technical implementations",
      posts: 76,
      color: "#90C67C",
    },
    {
      icon: <Users className="h-6 w-6" />,
      name: "Community Stories",
      description: "Share your success stories and experiences with Moorgan",
      posts: 112,
      color: "#328E6E",
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      name: "Best Practices",
      description: "Learn and share best practices for livestock management",
      posts: 85,
      color: "#67AE6E",
    },
    {
      icon: <ShieldAlert className="h-6 w-6" />,
      name: "Security & Privacy",
      description: "Discuss data security and privacy concerns",
      posts: 42,
      color: "#90C67C",
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      name: "General Discussion",
      description: "Open discussions about livestock management and technology",
      posts: 156,
      color: "#328E6E",
    },
    {
      icon: <HelpCircle className="h-6 w-6" />,
      name: "Help & Support",
      description: "Get help with Moorgan products and services",
      posts: 98,
      color: "#67AE6E",
    },
  ]

  return (
    <AnimatedSection className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeading title="Forum Categories" subtitle="Browse discussions by topic" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <AnimatedDiv
              key={index}
              className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group"
              direction="up"
              delay={index * 0.05}
            >
              <a href="#" className="block h-full">
                <div
                  className="mb-4 w-12 h-12 rounded-lg flex items-center justify-center text-white"
                  style={{ backgroundColor: category.color }}
                >
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-[#328E6E] transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <div className="text-sm text-gray-500">
                  <span className="font-medium text-[#328E6E]">{category.posts}</span> posts
                </div>
              </a>
            </AnimatedDiv>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}
