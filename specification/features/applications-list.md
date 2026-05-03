# Feature: Applications List

**Route:** `/applications`
**Access:** Protected

## Table/Card View Columns

- Company name
- Position
- Status (color-coded badge)
- AI Match Score (if analyzed)
- Applied date
- Days since last update
- Platform

## Filters

- By status (multi-select)
- By platform
- By date range
- Search by company name or position

## Sorting

- By date (newest/oldest)
- By match score (highest first)
- By days since update (follow-up reminders)

## Follow-up Indicator

Applications in APPLIED status for 7+ days without response get highlighted with an amber "Follow up?" badge.

## Bulk Actions

- Mark multiple as REJECTED
- Delete multiple