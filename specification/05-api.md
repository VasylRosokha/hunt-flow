# 5. API Routes (Next.js Route Handlers)

## Auth

| Method     | Endpoint                       | Description        |
|------------|--------------------------------|--------------------|
| GET/POST   | `/api/auth/[...nextauth]`      | NextAuth handlers  |

## Applications

| Method  | Endpoint                            | Description                                  |
|---------|-------------------------------------|----------------------------------------------|
| GET     | `/api/applications`                 | List all (with filters as query params)      |
| POST    | `/api/applications`                 | Create new                                   |
| GET     | `/api/applications/[id]`            | Get one                                      |
| PATCH   | `/api/applications/[id]`            | Update                                       |
| DELETE  | `/api/applications/[id]`            | Delete                                       |
| PATCH   | `/api/applications/[id]/status`     | Update status (creates StatusChange record)  |

## AI

| Method | Endpoint                  | Description                |
|--------|---------------------------|----------------------------|
| POST   | `/api/ai/analyze`         | Analyze job description    |
| POST   | `/api/ai/cover-letter`    | Generate cover letter      |

## Cover Letters

| Method | Endpoint                    | Description              |
|--------|-----------------------------|--------------------------|
| GET    | `/api/cover-letters`        | List user's cover letters |
| POST   | `/api/cover-letters`        | Save a cover letter       |
| DELETE | `/api/cover-letters/[id]`   | Delete                    |

## User

| Method | Endpoint               | Description                 |
|--------|------------------------|-----------------------------|
| GET    | `/api/user/profile`    | Get user profile            |
| PATCH  | `/api/user/profile`    | Update profile & skills     |

## Dashboard

| Method | Endpoint                  | Description                       |
|--------|---------------------------|-----------------------------------|
| GET    | `/api/dashboard/stats`    | Aggregated stats for dashboard    |