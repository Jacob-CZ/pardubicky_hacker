import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, { params }: { params: { lang: string } }) {
  const body = await req.json();
  const { code } = body;
  const res = await fetch(`${process.env.CODE_RUNNER_URL}/${params.lang}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code }),
  });
  const data = await res.text();
  return NextResponse.json(data);
}