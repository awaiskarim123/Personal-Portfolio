import Link from "next/link";
import { getFeaturedProjects } from "@/lib/mdx";
import { Button } from "@/components/ui/button";
import { MotionSection, MotionDiv, MotionP, MotionLink } from "@/components/motion-client";

const TECH_STACK = [
  "Next.js",
  "TypeScript",
  "React",
  "Node.js",
  "PostgreSQL",
  "Redis",
  "Docker",
  "AWS",
];

export default function HomePage() {
  const featured = getFeaturedProjects().slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden border-b border-border/40 px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <MotionP
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-lg font-medium text-primary"
          >
            Hi, I&apos;m a Full-Stack Engineer
          </MotionP>
          <MotionDiv
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              I build fast, scalable
              <br />
              <span className="text-primary">web applications</span>
            </h1>
          </MotionDiv>
          <MotionP
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
          >
            Focused on performance, clean architecture, and great UX. I write
            about system design and share project learnings on the blog.
          </MotionP>
          <MotionDiv
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Button asChild size="lg">
              <Link href="/projects">View Projects</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/blog">Read Blog</Link>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <Link href="/system-design">System Design</Link>
            </Button>
          </MotionDiv>
        </div>
      </section>

      {featured.length > 0 && (
        <MotionSection
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="border-b border-border/40 px-4 py-20 sm:px-6 lg:px-8"
        >
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Featured Projects
            </h2>
            <p className="mt-2 text-muted-foreground">
              A selection of recent work. More on the Projects page.
            </p>
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((project, i) => (
                <MotionLink
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="group block rounded-xl border border-border/60 bg-card p-6 shadow-sm transition-colors hover:border-primary/30 hover:bg-accent/20"
                >
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-primary">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.techStack.slice(0, 3).map((tech) => (
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
            <div className="mt-10 text-center">
              <Button asChild variant="outline">
                <Link href="/projects">All Projects</Link>
              </Button>
            </div>
          </div>
        </MotionSection>
      )}

      <MotionSection
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Tech Stack
          </h2>
          <p className="mt-2 text-muted-foreground">
            Tools and technologies I use day to day.
          </p>
          <ul className="mt-10 flex flex-wrap justify-center gap-3">
            {TECH_STACK.map((tech, i) => (
              <MotionDiv
                key={tech}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
              >
                <li className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground shadow-sm">
                  {tech}
                </li>
              </MotionDiv>
            ))}
          </ul>
        </div>
      </MotionSection>
    </>
  );
}
