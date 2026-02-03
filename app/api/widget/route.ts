import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Widget from "@/lib/models/widget";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { color,title } = await req.json();
    console.log(title);
    const widget = await Widget.create({ color:color, title:title });

    return NextResponse.json({ id: widget._id.toString() });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
