import type { Metadata } from "next";
import { MotionSection, MotionDiv, MotionP } from "@/components/motion-client";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch via email or social links.",
};

const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com", icon: "GitHub" },
  { label: "LinkedIn", href: "https://linkedin.com", icon: "LinkedIn" },
  { label: "Twitter", href: "https://twitter.com", icon: "Twitter" },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <MotionSection
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Contact
        </h1>
        <MotionP
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-6 text-lg text-muted-foreground"
        >
          I&apos;m open to interesting projects and conversations. Reach out via
          email or socials.
        </MotionP>

        <MotionDiv
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12"
        >
          <a
            href="mailto:hello@example.com"
            className="text-2xl font-semibold text-primary underline-offset-4 hover:underline sm:text-3xl"
          >
            hello@example.com
          </a>
        </MotionDiv>

        <nav className="mt-14 flex flex-wrap justify-center gap-8">
          {SOCIAL_LINKS.map((link, i) => (
            <MotionDiv
              key={link.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
            >
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            </MotionDiv>
          ))}
        </nav>
      </MotionSection>
    </div>
  );
}
