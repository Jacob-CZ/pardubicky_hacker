import { testCase } from "@/app/examples/create/page";
import precompileCode from "@/app/valitade";
import { cast } from "@/lib/codeRuning/parsing";
import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import test from "node:test";
import { v4 as uuidv4 } from "uuid";
 
export async function POST(req: NextRequest, { params }: { params: { lang: string } }) {
  const body = await req.json();
  const supabase = createClient();
  const { code, exampleId } = body;
  console.log(code, exampleId)
  if (!code || !exampleId) {
    return NextResponse.json("Code or exampleId is missing", { status: 400 });
  }
  const { data: publicEampleData, error: publicError } = await supabase.from("examples_public").select("*").eq("id", exampleId).single();
  const { data: exampleData, error } = await supabase.from("examples_private").select("*").eq("exampleId", exampleId).single();
  if (error || publicError) {
    console.error(error, publicError);
    return NextResponse.json(error || publicError, { status: 500 });
  }
  if (!exampleData || !publicEampleData) {
    return NextResponse.json("Example not found", { status: 404 });
  }
  const testCases = exampleData.test_cases
  console.log(testCases)
  const testCaseArray = JSON.parse(String(testCases)) as testCase[]
  console.log(testCaseArray)
  const inputs = testCaseArray.map((testCase: any) => testCase.input)
  const inputString = "[" + inputs.join(",") + "]"
  const funcName = publicEampleData.func_name
  const secret = uuidv4();
  const compiledCode = precompileCode(params.lang, funcName!, inputString ,secret)
  console.log(compiledCode)
  // const res = await fetch(`${process.env.CODE_RUNNER_URL}/${params.lang}`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({ compiledCode }),
  // });
  // const data = await res.text();
  // console.log(data)
  return NextResponse.json(compiledCode);
}