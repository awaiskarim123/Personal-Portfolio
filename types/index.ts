export interface Project {
  slug: string;
  title: string;
  description: string;
  techStack: string[];
  image?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  publishedAt: string;
  content?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  tags: string[];
  readingTime: string;
  content?: string;
}

export interface SystemDesignArticle {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  content?: string;
}

export interface NavLink {
  href: string;
  label: string;
}
