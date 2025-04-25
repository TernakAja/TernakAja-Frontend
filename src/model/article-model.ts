interface Paragraph {
  type: "paragraph";
  text: string;
}

interface Heading {
  type: "heading";
  text: string;
}

interface Image {
  type: "image";
  src: string;
  alt: string;
  caption: string;
}

interface Quote {
  type: "quote";
  text: string;
  author: string;
}

type ContentItem = Paragraph | Heading | Image | Quote;


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
  content: ContentItem[];
  imageUrl?: string;
}
