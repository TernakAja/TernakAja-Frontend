import { ForumPost } from "@/model/forum-model";

const staticPosts: ForumPost[] = [
  {
    id: 1,
    title: "How to optimize sensor placement for cattle health monitoring?",
    excerpt:
      "I've been using TernakAja sensors for a month now and I'm wondering about the optimal placement for health monitoring. Has anyone experimented with different positions?",
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
    title:
      "Interpreting temperature fluctuation data for early disease detection",
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
    title: "Success story: Reduced disease outbreaks by 70% using TernakAja",
    excerpt:
      "I wanted to share my experience using TernakAja's system for the past year. We've seen a dramatic reduction in disease outbreaks and improved overall herd health.",
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
    title: "Integrating TernakAja with other farm management software",
    excerpt:
      "I'm currently using FarmERP for overall management and would like to integrate TernakAja's livestock monitoring. Has anyone successfully integrated these systems?",
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
];

export async function getForumPosts(
  tab: "recent" | "popular" | "unanswered"
): Promise<ForumPost[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (tab === "recent") {
    return Promise.resolve(staticPosts);
  }
  return Promise.resolve([]);
}
