# OSIMIRI Implementation Plan

## Current Progress
- Scaffolded the Next.js app in `osimiri/`.
- Added the global luxury design system, navigation shell, footer, cursor layer, and enquiry drawer.
- Replaced the starter home page with a branded first pass.
- Added the main top-level routes: collections, projects, custom furniture, manufacturing, architects, about, experience centre, contact, blogs, and search.
- Added shared mock content and a Supabase form route handler stub.

## Environment Setup
- Paste Supabase credentials into `.env.local`.
- `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are enough if you keep the anon insert policies from `supabase/schema.sql`.
- `SUPABASE_SERVICE_ROLE_KEY` is optional if you want server-side inserts without relying on anon RLS policies.

## Recommended Next Pass
- Replace the enquiry drawer placeholder fields with full React Hook Form + Zod powered submission components.
- Add collection detail, product detail, blog detail, and project detail dynamic routes.
- Hook page content to Supabase CMS tables if you want dashboard-managed content instead of mock data.
- Free disk space and run `npm install`, `npm run lint`, and `npm run dev` for full verification.
