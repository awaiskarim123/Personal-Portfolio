import { Suspense } from "react";
import type { Metadata } from "next";
import { getBlogPosts } from "@/lib/mdx";
import { BlogList } from "@/components/blog-list";

export const metadata: Metadata = {
  title: "Blog",
  description: "Articles and posts about development, architecture, and learnings.",
};

function BlogListFallback() {
  return (
    <div className="mt-10 animate-pulse space-y-8">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-32 rounded-xl bg-muted" />
      ))}
    </div>
  );
}

export default function BlogPage() {
  const posts = getBlogPosts();
  const allTags = Array.from(
    new Set(posts.flatMap((p) => p.tags))
  ).sort();

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Blog
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Notes, tutorials, and thoughts on building software.
        </p>
      </div>
      <Suspense fallback={<BlogListFallback />}>
        <BlogList posts={posts} allTags={allTags} />
      </Suspense>
    </div>
  );
}
