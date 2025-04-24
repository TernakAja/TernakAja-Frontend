import { motion } from "framer-motion"
import { getRelatedArticles } from "@/lib/articles"
import { Link } from "react-router-dom";

export default function RelatedArticles({
  currentArticleId,
  category,
}: { currentArticleId: number; category: string }) {
  const relatedArticles = getRelatedArticles(currentArticleId, category)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {relatedArticles.map((article, index) => (
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
            </div>

            <h3 className="text-lg font-semibold text-[#328E6E] mb-2">{article.title}</h3>

            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{article.excerpt}</p>

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
