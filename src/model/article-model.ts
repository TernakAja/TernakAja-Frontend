export interface Article {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  readTime: number;
  image: string;
  imageCaption: string;
  tags: string[];
  content: string;
  imageUrl?: string;
}
