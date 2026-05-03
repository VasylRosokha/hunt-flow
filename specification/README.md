# HuntFlow — Specification Index

This directory contains the complete product specification for **HuntFlow**, an AI-powered job application tracker.

Built as a **Next.js full-stack monolith** — frontend pages and API routes in a single project.

Each file covers a single concern and can be read, reviewed, and updated independently.

## Structure

| File | Description |
|------|-------------|
| [01-overview.md](01-overview.md) | Product overview, target user, differentiators |
| [02-tech-stack.md](02-tech-stack.md) | Technology choices and rationale |
| [03-database-schema.md](03-database-schema.md) | Prisma schema, models, enums, indexes |
| [04-routes.md](04-routes.md) | Pages, URL structure, route protection |
| [05-api.md](05-api.md) | REST API endpoints (Next.js Route Handlers) |
| [06-ui-design.md](06-ui-design.md) | Design direction, colors, typography, layout |
| [07-project-structure.md](07-project-structure.md) | File and folder organization |
| [08-environment.md](08-environment.md) | Environment variables reference |
| [09-development-phases.md](09-development-phases.md) | Phased implementation plan |
| [10-readme-template.md](10-readme-template.md) | GitHub README template |
| [11-skills-matrix.md](11-skills-matrix.md) | What this project demonstrates to employers |

### Features (one file per feature)

| File | Description |
|------|-------------|
| [features/authentication.md](features/authentication.md) | OAuth sign-in flow and session management |
| [features/dashboard.md](features/dashboard.md) | Main dashboard with stats and charts |
| [features/applications-list.md](features/applications-list.md) | Applications list, filters, sorting, bulk actions |
| [features/application-detail.md](features/application-detail.md) | Single application detail view |
| [features/application-form.md](features/application-form.md) | Add/edit application form |
| [features/ai-analysis.md](features/ai-analysis.md) | AI job description analysis |
| [features/ai-cover-letter.md](features/ai-cover-letter.md) | AI cover letter generation |
| [features/settings.md](features/settings.md) | User profile and preferences |