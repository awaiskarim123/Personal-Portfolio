import type { Metadata } from "next";
import { getProjects } from "@/lib/mdx";
import { MotionSection, MotionLink } from "@/components/motion-client";

export const metadata: Metadata = {
  title: "Projects",
  description: "A selection of projects I've built — web apps, tools, and experiments.",
};

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <MotionSection
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Projects
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Things I&apos;ve built. Each has a detail page with overview, tech
          stack, and links.
        </p>
      </MotionSection>

      <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <MotionLink
            key={project.slug}
            href={`/projects/${project.slug}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: Math.min(i * 0.08, 0.4) }}
            className="group block rounded-xl border border-border/60 bg-card p-6 shadow-sm transition-colors hover:border-primary/30 hover:bg-accent/20"
          >
            <h2 className="text-xl font-semibold text-foreground group-hover:text-primary">
              {project.title}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
              {project.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.techStack.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </MotionLink>
        ))}
      </div>

      {projects.length === 0 && (
        <p className="mt-14 text-center text-muted-foreground">
          No projects yet. Add MDX files in <code className="rounded bg-muted px-1.5 py-0.5">content/projects/</code>.
        </p>
      )}
    </div>
  );
}
