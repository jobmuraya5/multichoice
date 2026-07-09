import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseClient";

export async function POST(request: Request) {
  try {
    const { numbers, amount, reference, email } = await request.json();

    if (!numbers || !Array.isArray(numbers) || numbers.length === 0) {
      return NextResponse.json({ error: "No phone numbers provided" }, { status: 400 });
    }
    if (!amount || !reference || !email) {
      return NextResponse.json({ error: "Missing required fields (amount, reference, email)" }, { status: 400 });
    }

    // Format the insert payload
    const insertPayload = numbers.map((msisdn: string) => ({
      msisdn: msisdn.trim(),
      amount: Number(amount),
      reference: reference.trim(),
      email: email.trim(),
      status: "pending",
    }));

    // Bulk insert into Supabase
    const { data, error } = await supabaseAdmin
      .from("transactions")
      .insert(insertPayload)
      .select();

    if (error) {
      console.error("Batch insert error:", error);
      return NextResponse.json({ error: "Failed to queue transactions" }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      message: `Successfully queued ${data.length} transactions` 
    });
    
  } catch (error: any) {
    console.error("Batch API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
