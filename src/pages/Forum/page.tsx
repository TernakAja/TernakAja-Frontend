import ForumHero from "@/components/Forum/forum-hero"
import ForumCategories from "@/components/Forum/forum-categories"
import ForumPosts from "@/components/Forum/forum-posts"
import ForumCta from "@/components/Forum/forum-cta"

export default function ForumPage() {
  return (
    <main className="overflow-hidden">
      <ForumHero />
      <ForumCategories />
      <ForumPosts />
      <ForumCta />
    </main>
  )
}
