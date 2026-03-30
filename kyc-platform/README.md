# KYC Platform

A production-structured Next.js platform for **Know Your Commodity**.

## What is included
- Homepage feed
- Article pages with premium gating UI
- Search page
- Login flow with demo sessions
- Subscription page
- Contact form
- CMS / admin dashboard
- Adapter-based architecture so infra can be plugged later

## Demo credentials
- admin@kyc.news / admin123
- reader@kyc.news / reader123
- free@kyc.news / free123

## Run locally
```bash
npm install
npm run dev
```

## Infra plugins to wire later
- MongoDB Atlas
- NextAuth / Google OAuth
- Razorpay
- Cloudflare R2
- Email provider
- Search provider

## Swap points
- `lib/adapters/posts.ts`
- `lib/adapters/users.ts`
- `lib/adapters/contacts.ts`
- `lib/session.ts`
