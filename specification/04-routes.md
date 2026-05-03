# 4. Pages & Routes

| Route                        | Page                     | Access    |
|------------------------------|--------------------------|-----------|
| `/`                          | Landing page — features, CTA to sign in | Public |
| `/login`                     | Sign in with Google or GitHub | Public |
| `/dashboard`                 | Main dashboard with stats, charts, recent activity | Protected |
| `/applications`              | All applications list with filters and search | Protected |
| `/applications/new`          | Add new application form | Protected |
| `/applications/[id]`         | Application detail — full info, AI analysis, status history | Protected |
| `/applications/[id]/edit`    | Edit application | Protected |
| `/ai/analyze`                | Paste job description, get AI match analysis | Protected |
| `/ai/cover-letter`           | Generate cover letter for an application | Protected |
| `/settings`                  | User profile, skills list, preferences | Protected |

## Protection Rules

All routes except `/` and `/login` require authentication. Middleware redirects unauthenticated users to `/login`.