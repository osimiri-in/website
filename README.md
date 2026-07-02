This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Product Manager (Admin)

A Shopify-style product manager lives at **`/admin`** (CRUD, bulk CSV import,
multi-select bulk actions, image uploads). It is backed by Supabase.

### One-time setup

1. **Database & storage** — open the Supabase SQL editor and run
   [`supabase/products.sql`](supabase/products.sql). It creates the `products`
   table (RLS on, no anon policies), a public `product-images` Storage bucket,
   and seeds one demo product.
2. **Environment** — add these to `.env.local` (and to your Vercel project env):

   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key   # server-only, keep secret
   ADMIN_PASSWORD=choose-a-strong-password           # the admin login password
   ADMIN_SESSION_SECRET=long-random-string           # signs the session cookie
   ```

3. Restart `npm run dev`, visit `/admin`, and sign in with `ADMIN_PASSWORD`.

### How it connects

- The public `/products` and `/products/[slug]` pages read **Active** products
  live from Supabase. When Supabase isn't configured, they fall back to the
  static sample in `lib/product-demo.ts`, so the site always renders.
- All admin reads/writes go through `/api/admin/*` routes using the service-role
  key. `middleware.ts` guards `/admin` and `/api/admin` behind the session
  cookie.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
