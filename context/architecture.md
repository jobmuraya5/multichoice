# Architecture

## Stack

| Layer                          | Tool                     | Purpose                                          |
| ------------------------------ | ------------------------ | ------------------------------------------------ |
| Framework                      | Next.js 14 (App Router)  | Full stack framework                             |
| Auth + DB                      | Supabase                 | PostgreSQL database for transactions             |
| UI / Styling                   | Tailwind CSS             | UI components and styling                        |
| Automation                     | Vercel Cron Jobs         | 2-minute recurring trigger for API processing    |
| API Integration                | Finaswift STK Push API   | Payment processor for mobile payments            |
| Language                       | TypeScript strict        | Throughout                                       |

---

## Folder Structure

- `.agents/` — AI instructions and workflow context
- `context/` — Project documentation and design tokens
- `stk-dashboard/` — Next.js application root
  - `src/`
    - `app/` — Next.js pages and API routes
      - `api/payments/trigger/` — STK Push integration endpoint
      - `api/cron/trigger-payments/` — Vercel Cron endpoint
    - `components/` — Reusable UI elements (Dashboard, MetricCard)
    - `lib/` — Utility functions (Supabase client, API helpers)
- `supabase/` — Database schemas and migrations
