import { useState, useEffect } from "react";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import { Link, useParams } from "react-router-dom";
// import DOMPurify from "dompurify";
import { getArticleById } from "@/handler/article-handler";
import { Article } from "@/model/article-model";
import { motion } from "framer-motion";
import RelatedArticles from "@/components/Article/related-articles";
import LoadingScreen from "@/utility/LoadingScreen";

export default function ArticleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) {
        setError("Invalid article ID");
        setLoading(false);
        return;
      }

      try {
        const articleData = await getArticleById(Number.parseInt(id));
        if (!articleData) {
          setError("Article not found");
        } else {
          setArticle(articleData);
        }
        setLoading(false);
      } catch (err) {
        console.error(err)
        setError("Failed to load article. Please try again later.");
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error || !article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#328E6E] mb-4">
            {error || "Article Not Found"}
          </h1>
          <Link
            to="/article"
            className="text-[#328E6E] hover:underline flex items-center justify-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Healthcare Articles
          </Link>
        </div>
      </div>
    );
  }

  // const cleanHtml = DOMPurify.sanitize(article.content);

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-8">
        <Link
          to="/article"
          className="inline-flex items-center text-[#328E6E] hover:text-[#67AE6E] mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Healthcare Articles
        </Link>

        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-3">
            <span className="bg-[#E1EEBC] text-[#328E6E] px-3 py-1 rounded-full text-sm font-medium">
              {article.category}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-[#328E6E] mb-4">
            {article.title}
          </h1>
          <div className="flex items-center text-gray-500 text-sm space-x-4">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center">
              <Tag className="h-4 w-4 mr-1" />
              <span>{article.readTime} min read</span>
            </div>
          </div>
        </div>

        <div className="mb-8 rounded-lg overflow-hidden">
          <img
            src={article.image || "/placeholder.svg"}
            alt={article.title}
            width={1200}
            height={600}
            className="w-full h-auto object-cover"
          />
          <p className="text-sm text-gray-500 mt-2 italic">
            {article.imageCaption}
          </p>
        </div>

        {/* <div
          className="prose max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: cleanHtml }}
        /> */}
        <div className="mt-8 space-y-6">
          {article.content.map((block, index) => {
            switch (block.type) {
              case 'paragraph':
                return (
                  <motion.p 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    className="text-gray-700 leading-relaxed"
                  >
                    {block.text}
                  </motion.p>
                );
              case 'heading':
                return (
                  <motion.h2 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    className="text-2xl font-bold text-[#328E6E] mt-8 mb-4"
                  >
                    {block.text}
                  </motion.h2>
                );
              case 'image':
                return (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    className="my-8"
                  >
                    <img 
                      src={block.src} 
                      alt={block.alt} 
                      className="w-full rounded-lg shadow-md"
                    />
                    {block.caption && (
                      <p className="text-sm text-gray-500 mt-2 text-center italic">
                        {block.caption}
                      </p>
                    )}
                  </motion.div>
                );
              case 'quote':
                return (
                  <motion.blockquote 
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.1 * index }}
                    className="border-l-4 border-[#90C67C] pl-4 italic bg-[#E1EEBC]/20 p-4 rounded-r-md"
                  >
                    <p className="text-gray-700">{block.text}</p>
                    {block.author && (
                      <cite className="text-[#328E6E] font-medium block mt-2">
                        — {block.author}
                      </cite>
                    )}
                  </motion.blockquote>
                );
              default:
                return null;
            }
          })}
        </div>

        <div className="mb-12">
          <h3 className="text-lg font-semibold text-[#328E6E] mb-3">
            Related Topics
          </h3>
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-[#E1EEBC] text-[#328E6E] px-3 py-1 rounded-full text-sm hover:bg-[#90C67C] transition-colors cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8">
          <h2 className="text-2xl font-semibold text-[#328E6E] mb-6">
            Related Articles
          </h2>
          <RelatedArticles
            currentArticleId={article.id}
            category={article.category}
          />
        </div>
      </main>
    </div>
  );
}
