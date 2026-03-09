import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getBlogPostBySlug, getBlogSlugs } from "@/lib/mdx";
import { MDXContent } from "@/components/mdx-content";
import { MotionDiv } from "@/components/motion-client";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getBlogSlugs().map((slug) => ({
    slug: slug.replace(/\.mdx?$/, ""),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "Blog" };
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <MotionDiv
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Link
          href="/blog"
          className="text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          ← Back to Blog
        </Link>
        <header className="mt-6">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            {post.title}
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            {post.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
            <time dateTime={post.publishedAt}>{post.publishedAt}</time>
            <span>{post.readingTime}</span>
            {post.tags.length > 0 && (
              <span className="flex gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded bg-muted px-2 py-0.5 text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </span>
            )}
          </div>
        </header>
        <div className="prose prose-invert mt-10 max-w-none">
          <MDXContent source={post.content ?? ""} />
        </div>
      </MotionDiv>
    </article>
  );
}
