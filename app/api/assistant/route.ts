import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"
const openai = new OpenAI()
export async function POST(req: NextRequest) {
	const supabase = createClient()
	const body = await req.json()
	const { messages, exampleId } = body
	// const { data, error } = await supabase
	// 	.from("examples_user")
	// 	.select("*")
	// 	.eq("id", exampleId)
	// 	.single()
	// if (error) {
	// 	console.error(error)
	// 	return NextResponse.json("Failed to fetch example", { status: 500 })
	// }
	// if (!data) {
	// 	return NextResponse.json("Example not found", { status: 404 })
	// }
    console.log(messages)
	const completion = await openai.chat.completions.create({
		messages: [{ role: "system", content: "You are a helpful assistant." },...messages],
		model: "gpt-3.5-turbo",
	})
	return NextResponse.json({ response: completion.choices[0].message.content })
}
