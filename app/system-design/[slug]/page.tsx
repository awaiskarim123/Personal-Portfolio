import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getSystemDesignBySlug, getSystemDesignSlugs } from "@/lib/mdx";
import { MDXContent } from "@/components/mdx-content";
import { MotionDiv } from "@/components/motion-client";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getSystemDesignSlugs().map((slug) => ({
    slug: slug.replace(/\.mdx?$/, ""),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getSystemDesignBySlug(slug);
  if (!article) return { title: "System Design" };
  return {
    title: article.title,
    description: article.description,
  };
}

export default async function SystemDesignArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getSystemDesignBySlug(slug);
  if (!article) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <MotionDiv
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Link
          href="/system-design"
          className="text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          ← Back to System Design
        </Link>
        <header className="mt-6">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            {article.title}
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            {article.description}
          </p>
          <time
            dateTime={article.publishedAt}
            className="mt-4 block text-sm text-muted-foreground"
          >
            {article.publishedAt}
          </time>
        </header>
        <div className="prose prose-invert mt-10 max-w-none">
          <MDXContent source={article.content ?? ""} />
        </div>
      </MotionDiv>
    </article>
  );
}
