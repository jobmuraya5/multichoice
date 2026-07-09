import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // Secure the cron job with a secret token provided by Vercel or your env
  const authHeader = request.headers.get("authorization");
  
  // Example: Vercel sends `Bearer ${CRON_SECRET}` if configured
  const CRON_SECRET = process.env.CRON_SECRET;
  
  if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Get the host from the request to construct absolute URL for the internal fetch
  const host = request.headers.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  
  try {
    // We call our own POST route so logic isn't duplicated
    const res = await fetch(`${protocol}://${host}/api/payments/trigger`, {
      method: "POST",
    });

    const data = await res.json();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Cron fetch error:", error);
    return NextResponse.json({ error: "Failed to trigger payments" }, { status: 500 });
  }
}
