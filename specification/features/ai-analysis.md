# Feature: AI Job Description Analysis

**Route:** `/ai/analyze`
**Access:** Protected

## How It Works

1. User pastes a full job description
2. System sends to OpenAI API along with user's skills list from their profile
3. Returns structured analysis

## AI Prompt Structure

```
You are a career advisor AI. Given the following job description and the
candidate's skills, provide:

1. match_score: 0-100 percentage match
2. matching_skills: array of candidate skills that match requirements
3. missing_skills: array of required skills the candidate lacks
4. key_requirements: top 5 requirements from the job description
5. recommendation: 2-3 sentence advice on whether to apply and what to highlight
6. seniority_level: "junior", "mid", "senior" based on job description

Candidate skills: [user's skills array]

Job description:
[pasted text]

Respond in JSON format only.
```

## UI

- Textarea for pasting job description
- "Analyze" button
- Results displayed as cards with visual match meter
- "Save as Application" button that pre-fills a new application with extracted data (company name, position parsed from description if possible)