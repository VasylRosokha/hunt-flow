# Feature: Authentication

**Route:** `/login`

## Sign-in Options

- Google OAuth
- GitHub OAuth (developers will love this)

## Flow

1. User clicks "Sign in" on landing page
2. Redirected to OAuth provider
3. On success, redirected to `/dashboard`
4. Session stored in database via NextAuth

## Protected Routes

All routes except `/` and `/login` require authentication. Middleware redirects unauthenticated users to `/login`.