import type { Metadata } from "next";
import { MotionSection, MotionDiv, MotionP } from "@/components/motion-client";

export const metadata: Metadata = {
  title: "About",
  description:
    "Developer background, skills, and experience.",
};

const SKILLS = [
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"] },
  { category: "Backend", items: ["Node.js", "Python", "PostgreSQL", "Redis", "REST & GraphQL"] },
  { category: "DevOps & Tools", items: ["Docker", "AWS", "Git", "CI/CD", "Linux"] },
];

const EXPERIENCE = [
  {
    role: "Senior Full-Stack Engineer",
    company: "Tech Company",
    period: "2022 – Present",
    summary: "Lead development of customer-facing and internal tools. Improved performance and reliability of core services.",
  },
  {
    role: "Full-Stack Developer",
    company: "Startup",
    period: "2020 – 2022",
    summary: "Built and shipped features end-to-end. Introduced TypeScript and modern frontend tooling.",
  },
  {
    role: "Software Developer",
    company: "Agency",
    period: "2018 – 2020",
    summary: "Delivered multiple client projects using React and Node.js.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <MotionSection
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          About
        </h1>
        <MotionP
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-6 text-lg text-muted-foreground"
        >
          I&apos;m a full-stack engineer focused on building fast, maintainable
          web applications. I care about clean architecture, performance, and
          developer experience. When I&apos;m not coding, I write about system
          design and share learnings from production systems.
        </MotionP>
      </MotionSection>

      <MotionSection
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="mt-20"
      >
        <h2 className="text-2xl font-bold text-foreground">Skills</h2>
        <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((group, i) => (
            <MotionDiv
              key={group.category}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-xl border border-border/60 bg-card p-6"
            >
              <h3 className="text-lg font-semibold text-foreground">
                {group.category}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-md bg-muted px-3 py-1 text-sm text-muted-foreground"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </MotionDiv>
          ))}
        </div>
      </MotionSection>

      <MotionSection
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="mt-20"
      >
        <h2 className="text-2xl font-bold text-foreground">Experience</h2>
        <ul className="mt-8 space-y-10">
          {EXPERIENCE.map((job, i) => (
            <MotionDiv
              key={job.role + job.company}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="border-l-2 border-primary/50 pl-6"
            >
              <h3 className="text-lg font-semibold text-foreground">
                {job.role}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {job.company} · {job.period}
              </p>
              <p className="mt-3 text-muted-foreground">{job.summary}</p>
            </MotionDiv>
          ))}
        </ul>
      </MotionSection>
    </div>
  );
}
