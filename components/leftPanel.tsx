"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import Markdown from "react-markdown"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import remarkGfm from "remark-gfm"
import { Database as db } from "@/types/supabase"
import {
	MainContainer,
	ChatContainer,
	MessageList,
	Message,
	MessageInput,
} from "@chatscope/chat-ui-kit-react"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ChatAssistant from "./chatAssistant"
import { use, useEffect } from "react"
import useCodeStore from "./useCodeStore"

export default function LeftPanel({
	data,
}: {
	data: {
		created_at: string
		func_name: string | null
		id: string
		instructions: string | null
		name: string | null
	} | null
}) {
	const { setInstructions } = useCodeStore()
	useEffect(() => {
		if (data?.instructions) {
			setInstructions(data.instructions)
		}
	}, [data])
	return (
		<div className="flex flex-col h-full w-full items-center justify-center">
			<Tabs defaultValue="instructions" className="w-full h-full">
				<TabsList className="h-12 grid w-full grid-cols-5 rounded-none">
					<TabsTrigger value="instructions">Zadani</TabsTrigger>
					<TabsTrigger value="sketch">White board</TabsTrigger>
					<TabsTrigger value="notes">Poznamky</TabsTrigger>
					<TabsTrigger value="hint">Rada</TabsTrigger>
					<TabsTrigger value="assistant">Assistant</TabsTrigger>
				</TabsList>
				<TabsContent
					value="instructions"
					className=" h-full mt-0 text-center"
				>
					<Card className=" h-full rounded-none">
						<CardHeader>
							<CardTitle>Zadani</CardTitle>
						</CardHeader>
						<CardContent className="w-full h-full text-left">
							<ReactMarkdown
								remarkPlugins={[remarkGfm]}
								components={{
									code({
										node,
										className,
										children,
										...props
									}) {
										const match = /language-(\w+)/.exec(
											className || ""
										)
										const { ref, ...rest } = props;
										return  match ? (
											<SyntaxHighlighter
												style={darcula as any}
												language={match[1]}
												PreTag="div"
												{...rest}
											>
												{String(
													children
												).replace(/\n$/, "")}
											</SyntaxHighlighter>
										) : (
											<code
												className={className}
												{...props}
											>
												{children}
											</code>
										)
									}
								}}
							>
								{data?.instructions}
							</ReactMarkdown>
							
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent
					value="sketch"
					className=" h-full mt-0 text-center "
				>
					<Card className=" h-full rounded-none">
						<CardHeader>
							<CardTitle>White board</CardTitle>
						</CardHeader>
						<CardContent className="space-y-2"></CardContent>
					</Card>
				</TabsContent>
				<TabsContent
					value="notes"
					className=" h-full mt-0 text-center "
				>
					<Card className=" h-full rounded-none">
						<CardHeader>
							<CardTitle>Poznamky</CardTitle>
						</CardHeader>
						<CardContent className="space-y-2"></CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="hint" className=" h-full mt-0 text-center ">
					<Card className=" h-full rounded-none">
						<CardHeader>
							<CardTitle>Rada</CardTitle>
						</CardHeader>
						<CardContent className="space-y-2"></CardContent>
					</Card>
				</TabsContent>
				<TabsContent
					value="assistant"
					className=" h-full mt-0 text-center "
				>
					<Card className=" h-full rounded-none">
						<CardHeader>
							<CardTitle>Assistant</CardTitle>
						</CardHeader>
						<CardContent className="w-full h-full relative">
								<ChatAssistant/>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	)
}
