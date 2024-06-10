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
export default function LeftPanel({ data }: { data: string }) {
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
				<TabsContent value="instructions" className=" h-full mt-0 text-center">
					<Card className=" h-full rounded-none">
						<CardHeader>
							<CardTitle>Zadani</CardTitle>
						</CardHeader>
						<CardContent className="space-y-2">

						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="sketch" className=" h-full mt-0 text-center ">
					<Card className=" h-full rounded-none">
						<CardHeader>
							<CardTitle>White board</CardTitle>
						</CardHeader>
						<CardContent className="space-y-2">

						</CardContent>
					</Card>
				</TabsContent>
                <TabsContent value="notes" className=" h-full mt-0 text-center ">
                    <Card className=" h-full rounded-none">
                        <CardHeader>
                            <CardTitle>Poznamky</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
 
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="hint" className=" h-full mt-0 text-center ">
                    <Card className=" h-full rounded-none">
                        <CardHeader>
                            <CardTitle>Rada</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
  
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="assistant" className=" h-full mt-0 text-center ">
                    <Card className=" h-full rounded-none">
                        <CardHeader>
                            <CardTitle>Assistant</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">

                        </CardContent>
                    </Card>
                </TabsContent>
			</Tabs>
		</div>
	)
}
