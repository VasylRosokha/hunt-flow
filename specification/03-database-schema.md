# 3. Database Schema (Prisma)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  image         String?
  skills        String[]  // user's own skills for AI matching
  accounts      Account[]
  sessions      Session[]
  applications  Application[]
  coverLetters  CoverLetter[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?
  user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model Application {
  id              String            @id @default(cuid())
  userId          String
  user            User              @relation(fields: [userId], references: [id], onDelete: Cascade)

  // Core fields
  company         String
  position        String
  location        String?
  salary          String?           // "60k-80k CZK" or "€3000-4000"
  url             String?           // link to job posting
  platform        String?           // "LinkedIn", "jobs.cz", "startupjobs.cz", etc.

  // Job description & AI
  jobDescription  String?           // full job description text
  aiMatchScore    Int?              // 0-100 match percentage
  aiAnalysis      String?           // AI-generated analysis JSON

  // Status tracking
  status          ApplicationStatus @default(SAVED)
  appliedAt       DateTime?
  respondedAt     DateTime?
  interviewAt     DateTime?

  // Notes
  notes           String?
  contactName     String?
  contactEmail    String?

  // Relations
  coverLetters    CoverLetter[]
  statusHistory   StatusChange[]

  createdAt       DateTime          @default(now())
  updatedAt       DateTime          @updatedAt

  @@index([userId, status])
  @@index([userId, createdAt])
}

enum ApplicationStatus {
  SAVED        // bookmarked, not yet applied
  APPLIED      // application submitted
  SCREENING    // initial HR screening
  INTERVIEW    // interview stage
  TECHNICAL    // technical interview/test
  OFFER        // received offer
  ACCEPTED     // accepted offer
  REJECTED     // rejected by company
  WITHDRAWN    // withdrawn by user
}

model StatusChange {
  id            String            @id @default(cuid())
  applicationId String
  application   Application       @relation(fields: [applicationId], references: [id], onDelete: Cascade)
  fromStatus    ApplicationStatus
  toStatus      ApplicationStatus
  changedAt     DateTime          @default(now())

  @@index([applicationId])
}

model CoverLetter {
  id            String      @id @default(cuid())
  userId        String
  user          User        @relation(fields: [userId], references: [id], onDelete: Cascade)
  applicationId String?
  application   Application? @relation(fields: [applicationId], references: [id], onDelete: SetNull)
  content       String      // generated cover letter text
  tone          String      @default("professional") // "professional", "casual", "confident"
  createdAt     DateTime    @default(now())

  @@index([userId])
}
```