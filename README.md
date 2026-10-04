# Bangla News 24 (বাংলা নিউজ ২৪)

A modern, visually polished Bengali online news platform built with Next.js 16 (App Router), React 19, TypeScript 5, Tailwind CSS v4, daisyUI 5, and Better Auth.

---

## Features

- **Fully Bengali user interface (`<html lang="bn">`)**
  - Google Fonts: **Noto Serif Bengali** (logo, headlines, numerals) and **Hind Siliguri** (body text, navigation).
  - All dates, times, and serial numbers are displayed in Bengali numerals and formats (`Intl.DateTimeFormat('bn-BD', ...)` / `toBengaliDigits`).
- **Live scrolling breaking news ticker**
  - Red background with a dark red "Latest" (সর্বশেষ) badge and smoothly scrolling headlines powered by `react-marquee-text`. The ticker pauses on mouse hover.
- **Homepage layout (pixel-perfect to the reference design)**
  - Large featured card for the top story: big image, red category label, red serif headline, 3-line summary, and a Bengali timestamp.
  - A list of 4 top headlines.
  - A 3-card grid of "Selected News".
  - A "Most Read" sidebar on the right, with large red Bengali numerals from 1 to 10 alongside headlines.
  - Category-based grids for other sections: Bangladesh, India, World, Health, Video, and More News.
- **Dynamic category pages (`/category/[slug]`)**
  - The active category is highlighted in the navigation (`usePathname`).
  - Responsive news card grid, with handling for empty or invalid categories.
- **News detail pages (`/news/[id]`)**
  - Large serif headline, author byline, publish time, and hero image.
  - Structured body rendering: paragraphs, subheadings, images with captions/credits, quotes, and lists.
  - Related topics and tag chips.
  - A "Most Read" list in the sidebar.
  - Dynamic metadata and Open Graph tags.
- **Authentication (Better Auth + MongoDB)**
  - Email and password sign-in (`/sign-in`) and sign-up (`/sign-up`).
  - Client-side validation with Bengali error messages.
  - `react-hot-toast` notifications.
  - The header shows the user's name and a sign-out button when logged in, or sign-in and sign-up buttons when not.
  - Database separation: uses only the `bangla-news-24` database.
- **Accessibility and responsiveness**
  - Semantic HTML (`<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>`).
  - Responsive grids that adapt cleanly to mobile, tablet, and desktop.

---

## Required Environment Variables

Create a `.env.local` file in the project root (or verify the existing one) containing the following variables:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/bangla-news-24?retryWrites=true&w=majority
BETTER_AUTH_SECRET=your_better_auth_secret_key_here
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=https://news-api-v2.vercel.app
```

> **Warning**: Never commit secrets or credentials to Git. The `.env.example` file contains only a template.

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

### 3. Run the linter

```bash
npm run lint
```

### 4. Create and test a production build

```bash
npm run build
npm start
```

---

## Project Structure

```
newsapp-bangla/
├── src/
│   ├── app/
│   │   ├── layout.tsx                  # Global layout (fonts, header, footer, toaster)
│   │   ├── globals.css                 # Tailwind v4, daisyUI 5, color tokens
│   │   ├── page.tsx                    # Homepage (featured card, headlines, most read, sections)
│   │   ├── category/[slug]/page.tsx    # Category page
│   │   ├── news/[id]/page.tsx          # News detail page
│   │   ├── sign-in/page.tsx            # Sign-in page
│   │   ├── sign-up/page.tsx            # Sign-up page
│   │   ├── api/auth/[...all]/route.ts  # Better Auth handler
│   │   ├── loading.tsx                 # Skeleton loading state
│   │   ├── error.tsx                   # Error page
│   │   └── not-found.tsx               # 404 page
│   ├── components/
│   │   ├── Header.tsx                  # Header (logo, Bengali date)
│   │   ├── HeaderAuth.tsx              # Session-based auth wrapper for the header
│   │   ├── NavLinks.tsx                # Client-side category navigation
│   │   ├── AuthButtons.tsx             # Sign-in / sign-up / sign-out buttons
│   │   ├── TickerBar.tsx               # Scrolling latest-news ticker
│   │   ├── FeaturedCard.tsx            # Large featured top-story card
│   │   ├── HeadlineList.tsx            # List of 4 top headlines
│   │   ├── MostRead.tsx                # "Most Read" list (1–10)
│   │   ├── NewsCard.tsx                # Reusable news card
│   │   ├── SectionHeading.tsx          # Section title with red underline
│   │   ├── ArticleBody.tsx             # Structured article body block renderer
│   │   └── Footer.tsx                  # Bengali footer
│   ├── lib/
│   │   ├── api.ts                      # API fetch helpers (caching, revalidation, filtering)
│   │   ├── format.ts                   # Bengali date, time, and numeral formatting
│   │   ├── mongodb.ts                  # MongoClient with connection pooling
│   │   ├── auth.ts                     # Better Auth configuration (MongoDB adapter)
│   │   └── auth-client.ts              # Better Auth React client
│   └── types/
│       └── news.ts                     # TypeScript type definitions
├── public/                             # Static assets
├── .env.example                        # Sample environment variables
├── next.config.ts                      # Next Image remote patterns and settings
├── tsconfig.json                       # TypeScript paths and configuration
└── package.json                        # Project metadata and dependencies
```

---

## Quality Rules and Standards

- No static or hard-coded dummy news; all data is loaded live from the REST API.
- Structured, type-safe code (TypeScript `strict: true`, no `any`).
- `npm run lint` and `npm run build` both pass with zero errors.