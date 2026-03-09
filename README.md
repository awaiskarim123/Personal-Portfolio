# Personal Portfolio

A modern, fast personal developer portfolio built with **Next.js 15** (App Router), **TypeScript**, **Tailwind CSS**, **Shadcn-style UI**, and **Framer Motion**. Content is managed via **MDX** files—no CMS or admin dashboard.

## Features

- **Static site generation (SSG)** for maximum performance
- **Dark mode** by default
- **Responsive**, mobile-first layout with large typography
- **Smooth animations** via Framer Motion
- **MDX** for blog posts, system design articles, and project pages
- **SEO**: metadata per page, sitemap, robots.txt

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Shadcn UI (Button, Radix primitives)
- Framer Motion
- next-mdx-remote (MDX compilation)
- gray-matter, reading-time

## Project Structure

```
app/                 # Routes and pages
components/          # Reusable UI and layout
content/
  blog/              # Blog MDX files
  projects/          # Project MDX files
  system-design/     # System design article MDX files
lib/                 # Utilities and MDX loading
types/               # TypeScript types
utils/               # Helpers (if needed)
```

## Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Run development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

3. **Build for production**

   ```bash
   npm run build
   npm start
   ```

## Content Management

### Blog (`content/blog/*.mdx`)

Frontmatter:

- `title` (string)
- `description` (string)
- `publishedAt` (string, date)
- `tags` (string[])

### Projects (`content/projects/*.mdx`)

Frontmatter:

- `title`, `description`, `publishedAt`
- `techStack` (string[])
- `githubUrl`, `liveUrl` (optional)
- `image` (optional, URL for cover image)
- `featured` (boolean, for home page)

### System Design (`content/system-design/*.mdx`)

Frontmatter:

- `title`, `description`, `publishedAt`

Body is standard MDX (headings, lists, code, links).

## Deployment (Vercel)

1. Push the repo to GitHub and import the project in Vercel.
2. Set **NEXT_PUBLIC_SITE_URL** to your production URL (e.g. `https://yourportfolio.vercel.app`) for correct sitemap and Open Graph URLs.
3. Deploy; the build runs `next build` and generates static pages.

## Scripts

- `npm run dev` – Start dev server (Turbopack)
- `npm run build` – Production build
- `npm start` – Start production server
- `npm run lint` – Run ESLint
