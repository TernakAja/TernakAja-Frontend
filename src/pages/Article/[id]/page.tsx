import { ArrowLeft, Calendar, User, Tag } from "lucide-react"
import RelatedArticles from "@/components/Article/related-articles"
import { getArticleById } from "@/lib/articles"
import { Link, useParams } from "react-router-dom"
import DOMPurify from 'dompurify';

export default function ArticleDetailPage() {
  const { id } = useParams();
  
  let article = null;
  if(id) {
    article = getArticleById(Number.parseInt(id))
  }
  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#328E6E] mb-4">Article Not Found</h1>
          <Link to="/article" className="text-[#328E6E] hover:underline flex items-center justify-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Healthcare Articles
          </Link>
        </div>
      </div>
    )
  }
  const cleanHtml = DOMPurify.sanitize(article.content);

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
          <h1 className="text-3xl font-bold text-[#328E6E] mb-4">{article.title}</h1>
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
          <p className="text-sm text-gray-500 mt-2 italic">{article.imageCaption}</p>
        </div>

        <div className="prose max-w-none mb-12" dangerouslySetInnerHTML={{ __html: cleanHtml }} />
    
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-[#328E6E] mb-3">Related Topics</h3>
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
          <h2 className="text-2xl font-semibold text-[#328E6E] mb-6">Related Articles</h2>
          <RelatedArticles currentArticleId={article.id} category={article.category} />
        </div>
      </main>
    </div>
  )
}