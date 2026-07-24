# Focuscreen

A calm, full-screen daily focus dashboard with a current goal, priority tasks, a focus timer, inspiring scenery, a to-do list, YouTube focus music, and Clerk authentication.

## Clerk setup

1. Create an application in the [Clerk Dashboard](https://dashboard.clerk.com).
2. Copy `.env.example` to `.env.local`.
3. Add your Clerk publishable and secret keys.
4. In Vercel, add the same values under **Project Settings > Environment Variables**:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
```

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

Import this repository into Vercel and add the Clerk environment variables before deploying.
