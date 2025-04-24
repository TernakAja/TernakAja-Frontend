import { useState } from "react"
import { AnimatedDiv, AnimatedSection, SectionHeading } from "../ui-components"
import { Button } from "@/components/ui/button"
import { MessageSquare, Star, ThumbsUp } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function ForumPosts() {

  const [, setActiveTab] = useState("recent")

  const posts = [
    {
      id: 1,
      title: "How to optimize sensor placement for cattle health monitoring?",
      excerpt:
        "I've been using Moorgan sensors for a month now and I'm wondering about the optimal placement for health monitoring. Has anyone experimented with different positions?",
      author: {
        name: "John Farmer",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Cattle Farmer",
      },
      category: "Hardware & IoT",
      tags: ["sensors", "cattle", "optimization"],
      stats: {
        comments: 24,
        likes: 42,
        rating: 4.8,
      },
      timeAgo: "2 hours ago",
      isHot: true,
    },
    {
      id: 2,
      title: "Interpreting temperature fluctuation data for early disease detection",
      excerpt:
        "I've noticed some interesting patterns in the temperature data from my livestock. I'm trying to establish baselines for early disease detection. Would love to hear others' experiences.",
      author: {
        name: "Maria Garcia",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Veterinarian",
      },
      category: "Data Analytics",
      tags: ["disease-detection", "data-analysis", "temperature"],
      stats: {
        comments: 18,
        likes: 36,
        rating: 4.6,
      },
      timeAgo: "5 hours ago",
      isHot: false,
    },
    {
      id: 3,
      title: "Success story: Reduced disease outbreaks by 70% using Moorgan",
      excerpt:
        "I wanted to share my experience using Moorgan's system for the past year. We've seen a dramatic reduction in disease outbreaks and improved overall herd health.",
      author: {
        name: "Robert Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Dairy Farm Owner",
      },
      category: "Community Stories",
      tags: ["success-story", "disease-prevention", "roi"],
      stats: {
        comments: 32,
        likes: 87,
        rating: 4.9,
      },
      timeAgo: "1 day ago",
      isHot: true,
    },
    {
      id: 4,
      title: "Best practices for data security when using IoT devices on farm",
      excerpt:
        "With the increasing number of connected devices on my farm, I'm concerned about data security. What measures are others taking to ensure their farm data remains secure?",
      author: {
        name: "Emma Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Tech-Savvy Farmer",
      },
      category: "Security & Privacy",
      tags: ["security", "iot", "best-practices"],
      stats: {
        comments: 15,
        likes: 29,
        rating: 4.5,
      },
      timeAgo: "2 days ago",
      isHot: false,
    },
    {
      id: 5,
      title: "Integrating Moorgan with other farm management software",
      excerpt:
        "I'm currently using FarmERP for overall management and would like to integrate Moorgan's livestock monitoring. Has anyone successfully integrated these systems?",
      author: {
        name: "David Wilson",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Farm Manager",
      },
      category: "General Discussion",
      tags: ["integration", "software", "farm-management"],
      stats: {
        comments: 12,
        likes: 18,
        rating: 4.3,
      },
      timeAgo: "3 days ago",
      isHot: false,
    },
  ]

  return (
    <AnimatedSection className="py-20 bg-[#E1EEBC]/20">
      <div className="container mx-auto px-4">
        <SectionHeading title="Community Discussions" subtitle="Join the conversation and share your insights" />

        <div className="max-w-5xl mx-auto">
          <Tabs defaultValue="recent" className="mb-8">
            <div className="flex justify-between items-center flex-wrap gap-4">
              <TabsList>
                <TabsTrigger value="recent" onClick={() => setActiveTab("recent")}>
                  Recent Discussions
                </TabsTrigger>
                <TabsTrigger value="popular" onClick={() => setActiveTab("popular")}>
                  Popular
                </TabsTrigger>
                <TabsTrigger value="unanswered" onClick={() => setActiveTab("unanswered")}>
                  Unanswered
                </TabsTrigger>
              </TabsList>

              <Button className="bg-[#328E6E] hover:bg-[#67AE6E] text-white">
                <MessageSquare className="mr-2 h-4 w-4" />
                New Post
              </Button>
            </div>

            <TabsContent value="recent" className="mt-6">
              <div className="space-y-6">
                {posts.map((post, index) => (
                  <AnimatedDiv
                    key={post.id}
                    className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
                    direction="up"
                    delay={index * 0.1}
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold mb-2 text-gray-800 hover:text-[#328E6E] transition-colors">
                            <a href="#">{post.title}</a>
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                            <span>Posted in</span>
                            <a href="#" className="text-[#328E6E] font-medium hover:underline">
                              {post.category}
                            </a>
                            <span>•</span>
                            <span>{post.timeAgo}</span>
                          </div>
                        </div>
                        {post.isHot && (
                          <Badge className="bg-red-500 hover:bg-red-600">
                            <span className="flex items-center gap-1">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
                              </svg>
                              Hot
                            </span>
                          </Badge>
                        )}
                      </div>

                      <p className="text-gray-600 mb-4">{post.excerpt}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag, idx) => (
                          <Badge key={idx} variant="outline" className="text-[#328E6E] border-[#328E6E]/30">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                            <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-sm font-medium">{post.author.name}</div>
                            <div className="text-xs text-gray-500">{post.author.role}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1 text-gray-500">
                            <MessageSquare className="h-4 w-4" />
                            <span>{post.stats.comments}</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-500">
                            <ThumbsUp className="h-4 w-4" />
                            <span>{post.stats.likes}</span>
                          </div>
                          <div className="flex items-center gap-1 text-[#328E6E]">
                            <Star className="h-4 w-4 fill-[#328E6E]" />
                            <span>{post.stats.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </AnimatedDiv>
                ))}
              </div>

              <div className="mt-8 flex justify-center">
                <Button
                  variant="outline"
                  className="border-[#328E6E] text-[#328E6E] hover:bg-[#328E6E] hover:text-white"
                >
                  Load More Discussions
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="popular" className="mt-6">
              <div className="bg-white rounded-xl p-8 text-center">
                <h3 className="text-xl font-medium text-gray-800 mb-2">Popular Discussions</h3>
                <p className="text-gray-600">
                  This tab would show the most popular discussions based on engagement metrics.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="unanswered" className="mt-6">
              <div className="bg-white rounded-xl p-8 text-center">
                <h3 className="text-xl font-medium text-gray-800 mb-2">Unanswered Questions</h3>
                <p className="text-gray-600">
                  This tab would show discussions that haven't received any responses yet.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AnimatedSection>
  )
}
