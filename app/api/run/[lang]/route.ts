import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, { params }: { params: { lang: string } }) {
  const body = await req.json();
  const { code } = body;
  const res = await fetch(`http://localhost:5000/${params.lang}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code }),
  });
  const data = await res.text();
  console.log(data);
  return NextResponse.json(data);
  return NextResponse.json({ lang: params.lang });
}