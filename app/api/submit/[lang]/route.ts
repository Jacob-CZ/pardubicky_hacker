import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest, { params }: { params: { lang: string } }) {
  return NextResponse.json({ lang: params.lang });
}