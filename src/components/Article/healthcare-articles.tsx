import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Users,
  Droplet,
  Utensils,
  Thermometer,
  Shield,
} from "lucide-react";
import { Link } from "react-router-dom";
import { getAllArticles } from "@/handler/article-handler";
import { Article } from "@/model/article-model";
import LoadingScreen from "@/utility/LoadingScreen";

const categoryIcons: {
  [key: string]: React.ComponentType<{ className?: string }>;
} = {
  "Preventive Care": Shield,
  Nutrition: Utensils,
  "Disease Management": Thermometer,
  "Seasonal Care": Calendar,
  "Water Management": Droplet,
  Biosecurity: Users,
};

export default function HealthcareArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await getAllArticles();
        setArticles(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load articles. Please try again later.");
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <div className="text-center py-10 text-red-600">{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article, index) => {
        const IconComponent = categoryIcons[article.category] || Shield;

        return (
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
                  <IconComponent className="h-4 w-4" />
                </div>
                <h3 className="text-lg font-semibold text-[#328E6E]">
                  {article.title}
                </h3>
              </div>

              <p className="text-gray-600 text-sm mb-4">{article.excerpt}</p>

              <Link
                to={`/article/${article.id}`}
                className="text-[#328E6E] hover:text-[#67AE6E] font-medium text-sm inline-flex items-center"
              >
                Read more →
              </Link>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
