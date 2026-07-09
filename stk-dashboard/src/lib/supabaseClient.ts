import { createClient } from "@supabase/supabase-js";

// Make sure these are defined in your .env.local or Vercel Environment Variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://dummy.supabase.co";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "dummy-key";

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn("Supabase credentials are missing. Please add them to your environment variables.");
}

// We use the service role key so that our cron jobs can bypass Row Level Security 
// to automatically read pending transactions and update statuses.
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
