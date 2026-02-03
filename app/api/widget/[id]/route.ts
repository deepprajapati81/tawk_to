import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Widget from "@/lib/models/widget";
import { title } from "process";

export const dynamic = "force-dynamic";

export async function GET(req: Request, context: any) {
  try {
    const { id } = await context.params;
    await connectDB();
    const widget = await Widget.findById(id);

    if (!widget) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ id: widget._id.toString(), color: widget.color,title: widget.title });
  } catch (e) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function PATCH(req: Request, context: any) {
  try {
    const { id } = await context.params;
    const body = await req.json();
    if (!body || typeof body.color !== 'string') {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    await connectDB();
    const widget = await Widget.findByIdAndUpdate(id, { color: body.color }, { new: true });
    if (!widget) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    return NextResponse.json({ id: widget._id.toString(), color: widget.color });
  } catch (e) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
