import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import useCodeStore from "./useCodeStore";
import useOutputStore from "@/lib/useOutputStore";
export interface Message {
    content: string
    role: "user" | "assistant"| "system"
}
export default function ChatAssistant() {
    const [messages, setMessages] = useState<Array<Message>>([])
    const [input, setInput] = useState<string>("")
    const {code, instructions} = useCodeStore()
    const {language} = useOutputStore()
    async function handleSend() {
        if (!input) return
        setMessages((prev) => ([{content: input, role: "user"}, ...prev]))
        setInput("")
        const {response} = await fetch("/api/assistant", {
            method: "POST",
            body: JSON.stringify({messages: [{content: input, role: "user"}, ...messages].reverse(), code, instructions, language}),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
        setMessages((prev) => ([{content: response, role: "assistant"}, ...prev]))
    }
    function Message({message, role}:{message:string, role: "user" | "assistant" | "system"}): JSX.Element {
        return (
            <div className={ role === "user" ? " h-fit w-fit flex-shrink ml-auto p-3 rounded-3xl rounded-br-none bg-secondary bg-sky-600" : "h-fit w-fit flex-shrink mr-auto p-3 rounded-3xl rounded-bl-none bg-secondary "}>
                {message}
        </div>
        )
    }
    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            handleSend()
        }
    }
	return (
		<>
			<div className="bg-primary-foreground w-full h-4/5 rounded-3xl flex flex-col-reverse p-4 gap-2 overflow-y-auto">
                {messages?.map((message, index) => {
                    if(message.role !== "system") {
                    return <Message key={index} message={message.content} role={message.role} />
                    }
                })}
			</div>
			<div className=" flex w-full h-full pt-6">
				<Input onKeyDown={handleKeyDown} value={input} onChange={(e) => setInput(e.target.value)} placeholder="Napiste zpravu " className="" />
				<Button className="ml-4" onClick={handleSend}>Send</Button>
			</div>
		</>
	)
}
