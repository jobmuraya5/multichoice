# Build and Deployment Plan

## Local Development
1. Clone the repository.
2. Run `cd stk-dashboard` and then `npm install`.
3. Copy `.env.example` to `.env.local` and add values for:
   - `FINASWIFT_API_KEY`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (for secure server-side operations)
   - `CRON_SECRET` (to protect the cron route)
4. Run `npm run dev` to start the local development server.

## Production Deployment (Vercel)
1. Push the repository to GitHub.
2. Import the project into Vercel.
3. In Vercel Project Settings > Environment Variables, add all the variables from step 3 above.
4. Deploy the project.
5. Vercel will automatically detect `vercel.json` and configure the Scheduled Function to run every 2 minutes.

## Database Setup
1. In the Supabase SQL Editor, run the schema provided in `supabase/schema.sql` to create the `transactions` table.
