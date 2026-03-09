import type { MetadataRoute } from "next";
import { getBlogSlugs } from "@/lib/mdx";
import { getProjectSlugs } from "@/lib/mdx";
import { getSystemDesignSlugs } from "@/lib/mdx";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const blog = getBlogSlugs().map((slug) => ({
    url: `${baseUrl}/blog/${slug.replace(/\.mdx?$/, "")}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const projects = getProjectSlugs().map((slug) => ({
    url: `${baseUrl}/projects/${slug.replace(/\.mdx?$/, "")}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const systemDesign = getSystemDesignSlugs().map((slug) => ({
    url: `${baseUrl}/system-design/${slug.replace(/\.mdx?$/, "")}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/projects`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/system-design`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.8 },
    ...blog,
    ...projects,
    ...systemDesign,
  ];
}
