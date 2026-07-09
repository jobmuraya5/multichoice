import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseClient";

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("settings")
    .select("auto_process_enabled")
    .eq("id", 1)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  try {
    const { auto_process_enabled } = await request.json();

    const { data, error } = await supabaseAdmin
      .from("settings")
      .update({ auto_process_enabled })
      .eq("id", 1)
      .select()
      .single();

    if (error) throw error;
    
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
