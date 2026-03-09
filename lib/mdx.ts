import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { BlogPost, SystemDesignArticle, Project } from "@/types";

const contentDir = path.join(process.cwd(), "content");

export function getBlogSlugs(): string[] {
  const dir = path.join(contentDir, "blog");
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
}

export function getBlogPosts(): BlogPost[] {
  const slugs = getBlogSlugs();
  return slugs
    .map((slug) => {
      const fullPath = path.join(contentDir, "blog", slug);
      const raw = fs.readFileSync(fullPath, "utf-8");
      const { data, content } = matter(raw);
      const stats = readingTime(content);
      return {
        slug: slug.replace(/\.mdx?$/, ""),
        title: data.title ?? "Untitled",
        description: data.description ?? "",
        publishedAt: data.publishedAt ?? data.date ?? "",
        tags: Array.isArray(data.tags) ? data.tags : [],
        readingTime: stats.text,
        content,
      };
    })
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  const candidates = [slug + ".mdx", slug + ".md"];
  for (const name of candidates) {
    const fullPath = path.join(contentDir, "blog", name);
    if (fs.existsSync(fullPath)) {
      const raw = fs.readFileSync(fullPath, "utf-8");
      const { data, content } = matter(raw);
      const stats = readingTime(content);
      return {
        slug: slug,
        title: data.title ?? "Untitled",
        description: data.description ?? "",
        publishedAt: data.publishedAt ?? data.date ?? "",
        tags: Array.isArray(data.tags) ? data.tags : [],
        readingTime: stats.text,
        content,
      };
    }
  }
  return null;
}

export function getSystemDesignSlugs(): string[] {
  const dir = path.join(contentDir, "system-design");
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
}

export function getSystemDesignArticles(): SystemDesignArticle[] {
  const slugs = getSystemDesignSlugs();
  return slugs
    .map((slug) => {
      const fullPath = path.join(contentDir, "system-design", slug);
      const raw = fs.readFileSync(fullPath, "utf-8");
      const { data, content } = matter(raw);
      return {
        slug: slug.replace(/\.mdx?$/, ""),
        title: data.title ?? "Untitled",
        description: data.description ?? "",
        publishedAt: data.publishedAt ?? data.date ?? "",
        content,
      };
    })
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

export function getSystemDesignBySlug(slug: string): SystemDesignArticle | null {
  const candidates = [slug + ".mdx", slug + ".md"];
  for (const name of candidates) {
    const fullPath = path.join(contentDir, "system-design", name);
    if (fs.existsSync(fullPath)) {
      const raw = fs.readFileSync(fullPath, "utf-8");
      const { data, content } = matter(raw);
      return {
        slug,
        title: data.title ?? "Untitled",
        description: data.description ?? "",
        publishedAt: data.publishedAt ?? data.date ?? "",
        content,
      };
    }
  }
  return null;
}

export function getProjectSlugs(): string[] {
  const dir = path.join(contentDir, "projects");
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
}

export function getProjects(): Project[] {
  const slugs = getProjectSlugs();
  return slugs
    .map((slug) => {
      const fullPath = path.join(contentDir, "projects", slug);
      const raw = fs.readFileSync(fullPath, "utf-8");
      const { data, content } = matter(raw);
      return {
        slug: slug.replace(/\.mdx?$/, ""),
        title: data.title ?? "Untitled",
        description: data.description ?? "",
        techStack: Array.isArray(data.techStack) ? data.techStack : [],
        image: data.image,
        githubUrl: data.githubUrl,
        liveUrl: data.liveUrl,
        featured: data.featured ?? false,
        publishedAt: data.publishedAt ?? data.date ?? "",
        content,
      };
    })
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

export function getProjectBySlug(slug: string): Project | null {
  const candidates = [slug + ".mdx", slug + ".md"];
  for (const name of candidates) {
    const fullPath = path.join(contentDir, "projects", name);
    if (fs.existsSync(fullPath)) {
      const raw = fs.readFileSync(fullPath, "utf-8");
      const { data, content } = matter(raw);
      return {
        slug,
        title: data.title ?? "Untitled",
        description: data.description ?? "",
        techStack: Array.isArray(data.techStack) ? data.techStack : [],
        image: data.image,
        githubUrl: data.githubUrl,
        liveUrl: data.liveUrl,
        featured: data.featured ?? false,
        publishedAt: data.publishedAt ?? data.date ?? "",
        content,
      };
    }
  }
  return null;
}

export function getFeaturedProjects(): Project[] {
  return getProjects().filter((p) => p.featured);
}
