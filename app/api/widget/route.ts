import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Widget from "@/lib/models/widget";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { color,title,fontFamily } = await req.json();
    console.log(fontFamily);
    const widget = await Widget.create({ color:color, title:title, fontFamily:fontFamily });

    return NextResponse.json({ id: widget._id.toString() });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
