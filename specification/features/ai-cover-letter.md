# Feature: AI Cover Letter Generation

**Route:** `/ai/cover-letter`
**Access:** Protected

## How It Works

1. User selects an application (or pastes job description directly)
2. Chooses tone: Professional / Casual / Confident
3. System sends job description + user skills + tone to OpenAI
4. Returns a tailored cover letter

## AI Prompt Structure

```
Write a cover letter for this job application.

Candidate name: [user name]
Candidate skills: [user skills]
Candidate background: Frontend / Full-Stack Developer

Job description:
[job description text]

Tone: [professional/casual/confident]

Rules:
- Keep it to 3-4 paragraphs
- Mention specific skills that match the job requirements
- Be specific, not generic
- Don't use cliches like "I'm a passionate developer"
- Mention genuine interest in the company's work
- Keep it under 300 words
```

## UI

- Tone selector (3 buttons)
- "Generate" button with loading state
- Generated text in an editable textarea
- "Copy to clipboard" button
- "Save" button (stores in database linked to application)
- "Regenerate" button for a new version