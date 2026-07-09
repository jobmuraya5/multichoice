import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseClient";
import { buildStkPayload } from "@/lib/payload";

const FINASWIFT_API_KEY = process.env.FINASWIFT_API_KEY || "";
const FINASWIFT_API_URL = "https://api.finaswift.com/v1/stkpush";

export async function POST() {
  if (!FINASWIFT_API_KEY) {
    return NextResponse.json({ error: "API Key missing" }, { status: 500 });
  }

  try {
    // 0. Check if automation is enabled
    const { data: settings } = await supabaseAdmin
      .from("settings")
      .select("auto_process_enabled")
      .eq("id", 1)
      .single();

    if (!settings || !settings.auto_process_enabled) {
      return NextResponse.json({ message: "Automation is currently disabled." });
    }

    // 1. Fetch pending transactions
    const { data: pendingTx, error: fetchError } = await supabaseAdmin
      .from("transactions")
      .select("*")
      .eq("status", "pending")
      .limit(10); // Batch size to avoid timeouts

    if (fetchError) throw fetchError;
    
    if (!pendingTx || pendingTx.length === 0) {
      return NextResponse.json({ message: "No pending transactions found." });
    }

    const results = [];

    // 2. Process each transaction
    for (const tx of pendingTx) {
      try {
        const payload = buildStkPayload(FINASWIFT_API_KEY, tx.email, tx.amount, tx.msisdn, tx.reference);

        const response = await fetch(FINASWIFT_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        // The python script did response.json()
        let data = {};
        try {
          data = await response.json();
        } catch (e) {
          data = { text: await response.text() };
        }

        // 3. Update Supabase status based on success/failure
        const newStatus = response.ok ? "completed" : "failed";
        
        await supabaseAdmin
          .from("transactions")
          .update({ 
            status: newStatus,
            finaswift_response: data 
          })
          .eq("id", tx.id);

        results.push({ id: tx.id, status: newStatus, response: data });

      } catch (err) {
        console.error(`Failed to process TX ${tx.id}`, err);
        
        await supabaseAdmin
          .from("transactions")
          .update({ status: "failed", finaswift_response: { error: String(err) } })
          .eq("id", tx.id);
        
        results.push({ id: tx.id, status: "failed", error: String(err) });
      }
    }

    return NextResponse.json({ message: "Processed batch", results });

  } catch (error) {
    console.error("Trigger error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
