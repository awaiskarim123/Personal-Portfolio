import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProjectBySlug, getProjectSlugs } from "@/lib/mdx";
import { MDXContent } from "@/components/mdx-content";
import { Button } from "@/components/ui/button";
import { MotionDiv } from "@/components/motion-client";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug: slug.replace(/\.mdx?$/, "") }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project" };
  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <MotionDiv
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Link
          href="/projects"
          className="text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          ← Back to Projects
        </Link>
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          {project.title}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          {project.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          {project.githubUrl && (
            <Button asChild variant="default">
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </Button>
          )}
          {project.liveUrl && (
            <Button asChild variant="outline">
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                Live Demo
              </a>
            </Button>
          )}
        </div>

        {project.image && (
          <div className="relative mt-10 aspect-video w-full overflow-hidden rounded-xl border border-border bg-muted">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
              priority
            />
          </div>
        )}

        {project.content && (
          <article className="prose prose-invert mt-12 max-w-none">
            <MDXContent source={project.content} />
          </article>
        )}
      </MotionDiv>
    </div>
  );
}
