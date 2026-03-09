"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { MotionLink } from "@/components/motion-client";
import type { BlogPost } from "@/types";

export function BlogList({
  posts,
  allTags,
}: {
  posts: BlogPost[];
  allTags: string[];
}) {
  const searchParams = useSearchParams();
  const activeTag = searchParams.get("tag");

  const filtered = useMemo(() => {
    if (!activeTag) return posts;
    return posts.filter((p) => p.tags.includes(activeTag));
  }, [posts, activeTag]);

  return (
    <>
      {allTags.length > 0 && (
        <div className="mt-10 flex flex-wrap gap-2">
          <Link
            href="/blog"
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              !activeTag
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:bg-accent"
            }`}
          >
            All
          </Link>
          {allTags.map((tag) => (
            <Link
              key={tag}
              href={activeTag === tag ? "/blog" : `/blog?tag=${encodeURIComponent(tag)}`}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                activeTag === tag
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:bg-accent"
              }`}
            >
              {tag}
            </Link>
          ))}
        </div>
      )}

      <ul className="mt-10 space-y-8">
        {filtered.map((post, i) => (
          <li key={post.slug}>
            <MotionLink
              href={`/blog/${post.slug}`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="block rounded-xl border border-border/60 bg-card p-6 transition-colors hover:border-primary/30 hover:bg-accent/20"
            >
              <h2 className="text-xl font-semibold text-foreground">
                {post.title}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                {post.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted-foreground">
                <span>{post.publishedAt}</span>
                <span>{post.readingTime}</span>
                {post.tags.length > 0 && (
                  <span>
                    {post.tags.map((t) => (
                      <span
                        key={t}
                        className="mr-2 rounded bg-muted px-1.5 py-0.5"
                      >
                        {t}
                      </span>
                    ))}
                  </span>
                )}
              </div>
            </MotionLink>
          </li>
        ))}
      </ul>

      {filtered.length === 0 && (
        <p className="mt-14 text-center text-muted-foreground">
          No posts found. Add MDX files in{" "}
          <code className="rounded bg-muted px-1.5 py-0.5">
            content/blog/
          </code>
          .
        </p>
      )}
    </>
  );
}
