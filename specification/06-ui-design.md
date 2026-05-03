# 6. UI Design Direction

## Aesthetic

Clean, professional, slightly editorial. Not playful — this is a serious productivity tool.

## Color Palette

| Token            | Value     | Usage              |
|------------------|-----------|--------------------|
| Background       | `#FAFAFA` | Warm white          |
| Card background  | `#FFFFFF` | Card surfaces       |
| Primary          | `#2563EB` | Blue-600, trustworthy, professional |
| Success          | `#16A34A` | Green-600           |
| Warning          | `#F59E0B` | Amber-500           |
| Danger           | `#DC2626` | Red-600             |
| Text primary     | `#111827` | Gray-900            |
| Text secondary   | `#6B7280` | Gray-500            |

## Status Colors

| Status     | Color                  |
|------------|------------------------|
| SAVED      | Gray                   |
| APPLIED    | Blue                   |
| SCREENING  | Cyan                   |
| INTERVIEW  | Purple                 |
| TECHNICAL  | Indigo                 |
| OFFER      | Green                  |
| ACCEPTED   | Emerald with star      |
| REJECTED   | Red                    |
| WITHDRAWN  | Gray strikethrough     |

## Typography

| Usage       | Font           | Notes                            |
|-------------|----------------|----------------------------------|
| Headings    | DM Sans        | Bold, modern but warm            |
| Body        | DM Sans        | Clean readability                |
| Code/data   | JetBrains Mono | For match scores, dates          |

## Layout

- Sidebar navigation (collapsible on mobile)
- Content area with max-width 1280px
- Cards with subtle shadows and rounded corners (`rounded-xl`)
- Tables for application lists on desktop, card view on mobile