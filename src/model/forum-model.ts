export interface ForumCategory {
  icon: React.ReactNode;
  name: string;
  description: string;
  posts: number;
  color: string;
}

export interface ForumPost {
  id: number;
  title: string;
  excerpt: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  category: string;
  tags: string[];
  stats: {
    comments: number;
    likes: number;
    rating: number;
  };
  timeAgo: string;
  isHot: boolean;
}
