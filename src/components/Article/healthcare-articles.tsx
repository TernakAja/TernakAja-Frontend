import { motion } from "framer-motion"
import { Calendar, Users, Droplet, Utensils, Thermometer, Shield } from "lucide-react"
import { Link } from "react-router-dom"

const articles = [
  {
    id: 1,
    title: "Essential Vaccination Schedule for Cattle",
    excerpt:
      "A comprehensive guide to keeping your cattle protected against common diseases through proper vaccination timing.",
    category: "Preventive Care",
    icon: Shield,
    date: "May 15, 2025",
  },
  {
    id: 2,
    title: "Optimizing Feed Efficiency in Dairy Cows",
    excerpt: "Learn how to maximize milk production while minimizing feed costs with these nutrition strategies.",
    category: "Nutrition",
    icon: Utensils,
    date: "May 10, 2025",
  },
  {
    id: 3,
    title: "Early Detection of Respiratory Issues in Livestock",
    excerpt: "Identifying the warning signs of respiratory problems before they become serious health concerns.",
    category: "Disease Management",
    icon: Thermometer,
    date: "May 5, 2025",
  },
  {
    id: 4,
    title: "Water Quality Management for Healthy Herds",
    excerpt: "Ensuring clean water access is crucial for livestock health. Learn testing and treatment methods.",
    category: "Preventive Care",
    icon: Droplet,
    date: "April 28, 2025",
  },
  {
    id: 5,
    title: "Building Effective Biosecurity Protocols",
    excerpt: "Protect your farm from disease outbreaks with these essential biosecurity measures.",
    category: "Disease Management",
    icon: Users,
    date: "April 22, 2025",
  },
  {
    id: 6,
    title: "Seasonal Care: Preparing Livestock for Summer",
    excerpt: "Steps to take now to ensure your animals stay healthy and comfortable during hot weather.",
    category: "Seasonal Care",
    icon: Calendar,
    date: "April 15, 2025",
  },
]

export default function HealthcareArticles() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article, index) => (
        <motion.div
          key={article.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="p-5">
            <div className="flex items-center space-x-2 mb-3">
              <span className="bg-[#E1EEBC] text-[#328E6E] text-xs font-semibold px-2.5 py-0.5 rounded-full">
                {article.category}
              </span>
              <span className="text-gray-500 text-xs">{article.date}</span>
            </div>

            <div className="flex items-start space-x-3 mb-3">
              <div className="bg-[#328E6E] p-2 rounded-full text-white">
                <article.icon className="h-4 w-4" />
              </div>
              <h3 className="text-lg font-semibold text-[#328E6E]">{article.title}</h3>
            </div>

            <p className="text-gray-600 text-sm mb-4">{article.excerpt}</p>

            <Link
              to={`/healthcare/article/${article.id}`}
              className="text-[#328E6E] hover:text-[#67AE6E] font-medium text-sm inline-flex items-center"
            >
              Read more →
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
