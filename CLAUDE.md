@AGENTS.md

# HuntFlow — AI-Powered Job Application Tracker

## Tech Stack
- Next.js 16.2.2 (uses `proxy.ts` NOT `middleware.ts`)
- NextAuth v5 (Auth.js) with database sessions via PrismaAdapter
- Prisma v7 with `prisma-client` generator + `@prisma/adapter-pg` (required driver adapter)
- Tailwind CSS v4 with `@theme` directive
- PostgreSQL via Docker Compose (port 5433)

## Key Architecture Decisions
- Auth config split: `auth.config.ts` (Edge-safe, providers only) and `auth.ts` (full, with Prisma adapter)
- Proxy (`src/proxy.ts`) imports from `@/lib/auth` (full auth, Node.js runtime) — NOT from `auth.config.ts`
- Session strategy: `database` (not JWT)
- Prisma client imports from `@/generated/prisma/client` (not `@/generated/prisma`)
- Route group `(protected)` wraps all authenticated pages with sidebar layout
- Server actions for mutations, server components for data fetching (no API routes for CRUD)

## Completed
- **Phase 1 — Foundation:** Project setup, Prisma schema, NextAuth (Google + GitHub OAuth), proxy auth guard, sidebar navigation, login page, landing page
- **Phase 2 — Core CRUD:** Application create/edit/delete, applications list with filters/search, application detail with status transitions and history timeline, dashboard with stats cards and status breakdown
- **Phase 3 — AI Integration:** Groq API (Llama 3.3 70B) setup, job description analysis with match scoring, cover letter generation with tone selection, AI analysis UI with score meter

## Next Up
- **Phase 4 — Dashboard & Charts:** Recharts, status donut chart, weekly bar chart, response funnel
- **Phase 5 — Polish & Testing:** Tests, responsive pass, loading states, error handling, seed script
- **Phase 6 — Deploy:** Vercel, Neon PostgreSQL, production build

## Commit Convention
- One commit per phase
- No Co-Authored-By lines in commits
- Push after committing

## Specs
- Full feature specs in `specification/features/`
- Routes, API, UI design in `specification/`