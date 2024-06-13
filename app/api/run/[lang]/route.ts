import { testCase } from "@/app/examples/create/page";
import precompileCode from "@/app/valitade";
import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
export async function POST(req: NextRequest, { params }: { params: { lang: string } }) {
  function compareResults(results: any[], testCases: testCase[]) {
    return testCases.map((testCase, index) => JSON.stringify(results[index]) === testCase.output);
}
  const body = await req.json();
  const supabase = createClient();
  const { code, exampleId } = body;
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
  const testCaseArray = JSON.parse(String(testCases)) as testCase[]
  const inputs = testCaseArray.map((testCase: any) => testCase.input)
  const inputString = "[[" + inputs.join("][") + "]]"
  const funcName = publicEampleData.func_name
  const secret = uuidv4();
  const compiledCode = precompileCode(code,params.lang, funcName!, inputString ,secret)
  const res = await fetch(`${process.env.CODE_RUNNER_URL}/${params.lang}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code: compiledCode }),
  });
  const data = await res.text();
  console.log(data)
  const dataToUser  = data.split(secret)[0]
  let results = data.split(secret)[1]
  if (!results) {
    return NextResponse.json("Failed to run code", { status: 500 });
  }
  results = results.replace(/(undefined)/gm, "");
  const result: boolean[] = compareResults(JSON.parse(results), testCaseArray)
  for (let index = 0; index < result.length; index++) {
    if (!result[index]){
      console.log(result[index])
      return NextResponse.json(String(`Test cases failed expected:${testCaseArray[index].output} got:${(JSON.parse(results) as Array<any>)[index]} \n output:${dataToUser}`), { status: 400 })
    }
  }
  return NextResponse.json(dataToUser +  "all testcasese passed", { status: 200 });
}

