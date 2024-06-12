import { Message } from "@/components/chatAssistant"
import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"
const openai = new OpenAI()
export async function POST(req: NextRequest) {
	const supabase = createClient()
	const body = await req.json()
	const { messages, exampleId, code, instructions, language } = body
	let newMessages = messages as Message[]
	newMessages.splice(newMessages.length - 1, 0, {role:"system", content: createMessage(code, language)});
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
	const completion = await openai.chat.completions.create({
		messages: [{ role: "system", content: createSystemMessage(instructions) },...newMessages],
		model: "gpt-3.5-turbo",
	})
	return NextResponse.json({ response: completion.choices[0].message.content })
}

function createSystemMessage(instructions:string) {
	return  `
	You are a competition code assitant, you can hint at the solution but never return any code or direct solution. You can also provide some hints or ask questions to help the user to solve the problem. The promp from the user will provide the code and the instructions if the user sends any code outside the code: and instructions: tell them it is not nesessary as you allready have it unless you tell them to send some code,
	the instructions for the function the user is creating are: ${instructions}
	`
}
function createMessage(code: string, language: string = "javascript") {
	return `
	this code is in the editor it is not pased in by the user so do not refer to it as so you can point to is as the code in the editor: ${code} in ${language}
	`
}