import type { Metadata } from "next";
import { getSystemDesignArticles } from "@/lib/mdx";
import { MotionSection, MotionLink } from "@/components/motion-client";

export const metadata: Metadata = {
  title: "System Design",
  description:
    "Articles on backend systems: real-time chat, rate limiting, caching, auth flows, and more.",
};

export default function SystemDesignPage() {
  const articles = getSystemDesignArticles();

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <MotionSection
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          System Design
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Backend systems explained: architecture, trade-offs, and examples.
        </p>
      </MotionSection>

      <ul className="mt-14 space-y-8">
        {articles.map((article, i) => (
          <li key={article.slug}>
            <MotionLink
              href={`/system-design/${article.slug}`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="block rounded-xl border border-border/60 bg-card p-6 transition-colors hover:border-primary/30 hover:bg-accent/20"
            >
              <h2 className="text-xl font-semibold text-foreground">
                {article.title}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                {article.description}
              </p>
              <p className="mt-4 text-xs text-muted-foreground">
                {article.publishedAt}
              </p>
            </MotionLink>
          </li>
        ))}
      </ul>

      {articles.length === 0 && (
        <p className="mt-14 text-center text-muted-foreground">
          No articles yet. Add MDX files in{" "}
          <code className="rounded bg-muted px-1.5 py-0.5">
            content/system-design/
          </code>
          .
        </p>
      )}
    </div>
  );
}
