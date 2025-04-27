import { useState, useEffect } from "react";
import { AnimatedDiv, AnimatedSection, SectionHeading } from "../ui-components";
import { Button } from "@/components/ui/button";
import { MessageSquare, Star, ThumbsUp } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getForumPosts } from "@/handler/forum-handler";
import { ForumPost } from "@/model/forum-model";
import LoadingScreen from "@/utility/LoadingScreen";

export default function ForumPosts() {
  const [activeTab, setActiveTab] = useState<
    "recent" | "popular" | "unanswered"
  >("recent");
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getForumPosts(activeTab);
        setPosts(data);
        setLoading(false);
      } catch {
        setError("Failed to load forum posts. Please try again later.");
        setLoading(false);
      }
    };

    fetchPosts();
  }, [activeTab]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <div className="text-center py-10 text-red-600">{error}</div>;
  }

  return (
    <AnimatedSection className="py-20 bg-[#E1EEBC]/20">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Community Discussions"
          subtitle="Join the conversation and share your insights"
        />

        <div className="max-w-5xl mx-auto">
          <Tabs defaultValue="recent" className="mb-8">
            <div className="flex justify-between items-center flex-wrap gap-4">
              <TabsList>
                <TabsTrigger
                  value="recent"
                  onClick={() => setActiveTab("recent")}
                >
                  Recent Discussions
                </TabsTrigger>
                <TabsTrigger
                  value="popular"
                  onClick={() => setActiveTab("popular")}
                >
                  Popular
                </TabsTrigger>
                <TabsTrigger
                  value="unanswered"
                  onClick={() => setActiveTab("unanswered")}
                >
                  Unanswered
                </TabsTrigger>
              </TabsList>

              <Button className="bg-[#328E6E] hover:bg-[#67AE6E] text-white">
                <MessageSquare className="mr-2 h-4 w-4" />
                New Post
              </Button>
            </div>

            <TabsContent value="recent" className="mt-6">
              {posts.length === 0 ? (
                <div className="bg-white rounded-xl p-8 text-center">
                  <h3 className="text-xl font-medium text-gray-800 mb-2">
                    No Recent Discussions
                  </h3>
                  <p className="text-gray-600">
                    There are no recent discussions available.
                  </p>
                </div>
              ) : (
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
                              <a
                                href="#"
                                className="text-[#328E6E] font-medium hover:underline"
                              >
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
                            <Badge
                              key={idx}
                              variant="outline"
                              className="text-[#328E6E] border-[#328E6E]/30"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={post.author.avatar || "/placeholder.svg"}
                                alt={post.author.name}
                              />
                              <AvatarFallback>
                                {post.author.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="text-sm font-medium">
                                {post.author.name}
                              </div>
                              <div className="text-xs text-gray-500">
                                {post.author.role}
                              </div>
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
              )}

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
                <h3 className="text-xl font-medium text-gray-800 mb-2">
                  Popular Discussions
                </h3>
                <p className="text-gray-600">
                  {posts.length === 0
                    ? "No popular discussions available."
                    : "This tab shows the most popular discussions based on engagement metrics."}
                </p>
              </div>
            </TabsContent>

            <TabsContent value="unanswered" className="mt-6">
              <div className="bg-white rounded-xl p-8 text-center">
                <h3 className="text-xl font-medium text-gray-800 mb-2">
                  Unanswered Questions
                </h3>
                <p className="text-gray-600">
                  {posts.length === 0
                    ? "No unanswered questions available."
                    : "This tab shows discussions that haven't received any responses yet."}
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AnimatedSection>
  );
}
