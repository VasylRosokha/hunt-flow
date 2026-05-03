# Feature: Application Form

**Routes:** `/applications/new`, `/applications/[id]/edit`
**Access:** Protected

## Form Fields

| Field             | Required | Notes                                                        |
|-------------------|----------|--------------------------------------------------------------|
| Company name      | Yes      |                                                              |
| Position          | Yes      |                                                              |
| Job posting URL   | No       |                                                              |
| Platform          | No       | Dropdown: LinkedIn, jobs.cz, startupjobs.cz, company website, other |
| Location          | No       |                                                              |
| Salary range      | No       |                                                              |
| Status            | No       | Default: SAVED                                               |
| Job description   | No       | Large textarea                                               |
| Notes             | No       |                                                              |
| Contact name      | No       |                                                              |
| Contact email     | No       |                                                              |

## On Submit

- If job description is provided, automatically trigger AI analysis in the background
- Redirect to application detail page