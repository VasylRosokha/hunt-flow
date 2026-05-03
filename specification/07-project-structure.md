# 7. Project Structure

```
huntflow/
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts                    # seed script with demo data
├── src/
│   ├── app/
│   │   ├── layout.tsx             # root layout with sidebar
│   │   ├── page.tsx               # landing page (public)
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── applications/
│   │   │   ├── page.tsx           # list view
│   │   │   ├── new/
│   │   │   │   └── page.tsx       # add form
│   │   │   └── [id]/
│   │   │       ├── page.tsx       # detail view
│   │   │       └── edit/
│   │   │           └── page.tsx   # edit form
│   │   ├── ai/
│   │   │   ├── analyze/
│   │   │   │   └── page.tsx
│   │   │   └── cover-letter/
│   │   │       └── page.tsx
│   │   ├── settings/
│   │   │   └── page.tsx
│   │   └── api/
│   │       ├── auth/
│   │       │   └── [...nextauth]/
│   │       │       └── route.ts
│   │       ├── applications/
│   │       │   ├── route.ts       # GET list, POST create
│   │       │   └── [id]/
│   │       │       ├── route.ts   # GET, PATCH, DELETE
│   │       │       └── status/
│   │       │           └── route.ts
│   │       ├── ai/
│   │       │   ├── analyze/
│   │       │   │   └── route.ts
│   │       │   └── cover-letter/
│   │       │       └── route.ts
│   │       ├── cover-letters/
│   │       │   ├── route.ts
│   │       │   └── [id]/
│   │       │       └── route.ts
│   │       ├── user/
│   │       │   └── profile/
│   │       │       └── route.ts
│   │       └── dashboard/
│   │           └── stats/
│   │               └── route.ts
│   ├── components/
│   │   ├── ui/                    # reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── Textarea.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── StatusBadge.tsx
│   │   │   └── MatchScoreMeter.tsx
│   │   ├── forms/
│   │   │   ├── ApplicationForm.tsx
│   │   │   └── SkillsInput.tsx
│   │   ├── dashboard/
│   │   │   ├── StatsCards.tsx
│   │   │   ├── StatusChart.tsx
│   │   │   ├── WeeklyChart.tsx
│   │   │   ├── FunnelChart.tsx
│   │   │   └── RecentActivity.tsx
│   │   ├── applications/
│   │   │   ├── ApplicationTable.tsx
│   │   │   ├── ApplicationCard.tsx
│   │   │   ├── StatusTimeline.tsx
│   │   │   └── Filters.tsx
│   │   └── ai/
│   │       ├── AnalysisResult.tsx
│   │       └── CoverLetterEditor.tsx
│   ├── lib/
│   │   ├── prisma.ts              # Prisma client singleton
│   │   ├── auth.ts                # NextAuth configuration
│   │   ├── openai.ts              # OpenAI client & prompt templates
│   │   └── utils.ts               # helper functions
│   └── types/
│       └── index.ts               # shared TypeScript types
├── __tests__/
│   ├── api/
│   │   ├── applications.test.ts
│   │   └── ai.test.ts
│   └── components/
│       ├── StatusBadge.test.tsx
│       └── ApplicationForm.test.tsx
├── public/
│   └── images/
├── specification/                 # product specification
├── .env.example
├── .env.local
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── jest.config.ts
├── package.json
├── docker-compose.yml             # local PostgreSQL for development
└── README.md
```