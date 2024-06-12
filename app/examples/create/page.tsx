"use client"

import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@nextui-org/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createClient } from "@/lib/supabase/client"
import { useState } from "react"
import { CiSquarePlus } from "react-icons/ci"
import { to } from "@react-spring/three"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export interface testCase {
	input: string
	output: string
	type: CastType
	isArray: boolean
}

type CastType = "string" | "number" | "boolean";

export default function Page() {
	const [instructions, setInstructions] = useState<string>("")
	const [testCases, setTestCases] = useState<testCase[]>([])
	const [input, setInput] = useState<string>("")
	const [output, setOutput] = useState<string>("")
	const [name, setName] = useState<string>("")
	const [funcName, setFuncName] = useState<string>("")
	const [type, setType] = useState<CastType>("string")
	const [isArray, setIsArray] = useState<boolean>(false)
	const router = useRouter()
	const supabase = createClient()
	function addTestCase() {
		if (input === "" || output === "") return
		setInput("")
		setOutput("")
		console.log(testCases)
		setTestCases([...testCases, { input, output, type, isArray}])
	}
	async function handleSubmit() {
		const { error, data } = await supabase.from("examples_public").insert({ instructions, func_name: funcName, name }).select("*").single()
		if (error) {
			console.error(error)
			toast.error("Failed to create example")
			return
		}
		const { data: data2, error: error2 } = await supabase.from("examples_private").insert({ exampleId: data.id, test_cases: JSON.stringify(testCases) }).select("*").single()
		if (error2) {
			supabase.from("examples_public").delete().match({ id: data.id })
			console.error(error2)
			toast.error("Failed to create example")
			return
		}
		toast.success("Example created successfully")
		router.push(`/examples/${data.id}`)

	}
	return (
		<main className=" ">
			<div className=" instructions flex flex-col gap-4" >
				<h1 className=" text-5xl text-center">Instructions</h1>
				<Textarea className=" w-1/2 min-w-96 mx-auto h-96 min-h-fit" onChange={(e) => setInstructions(e.target.value)}></Textarea>
				<Input className=" w-64 mx-auto" label="name" onChange={(e) => setName(e.target.value)}></Input>
				<Input className=" w-64 mx-auto" label="function name" onChange={(e) => setFuncName(e.target.value)}></Input>
				<h1 className=" text-xl text-center">Test cases</h1>
				<div className=" mx-auto flex flex-col items-center w-1/2 gap-4 p-4">
					<div className="w-fit h-fit self-end ">
						<Dialog>
							<DialogTrigger asChild>
								<CiSquarePlus className="w-12 h-12 fill-primary hover:bg-primary rounded hover:fill-primary-foreground transition-all duration-1000" />
							</DialogTrigger>
							<DialogContent className="sm:max-w-[425px]">
								<DialogHeader>
									<DialogTitle>Edit profile</DialogTitle>
									<DialogDescription>
										Make changes to your profile here. Click
										save when youre done.
									</DialogDescription>
								</DialogHeader>
								<div className="grid gap-4 py-4">
									<div className="grid grid-cols-4 items-center gap-4">
										<Label
											htmlFor="input"
											className="text-right"

										>
											Input
										</Label>
										<Input
											onChange={(e) => setInput(String(e.target.value))}
											required
											id="input"
											className="col-span-3"
										/>
									</div>
									<div className="grid grid-cols-4 items-center gap-4">
										<Label
											htmlFor="output"
											className="text-right"
										>
											Output
										</Label>
										<Input
											onChange={(e) => setOutput(e.target.value)}
											id="output"
											className="col-span-3"
										/>
									</div>
									<div className=" flex justify-between items-center">
									<Select onValueChange={(v) => setType(v as CastType)}>
										<SelectTrigger className="w-[180px]">
											<SelectValue placeholder="type" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="number">Number</SelectItem>
											<SelectItem value="string">String</SelectItem>
											<SelectItem value="boolean">Boolean</SelectItem>
										</SelectContent>
									</Select>
									<p>Array</p>
									<Checkbox  onChange={(e) => setIsArray(Boolean(e.currentTarget.value))} />
									</div>
								</div>
								<DialogFooter>
									<DialogClose asChild>
										<Button
											type="submit"
											onClick={addTestCase}
										>
											Save changes
										</Button>
									</DialogClose>
								</DialogFooter>
							</DialogContent>
						</Dialog>
					</div>
					{testCases.map((_, index) => {
						return (
							<div
								key={index}
								className=" w-full h-12 border border-border rounded-xl text-center flex items-center justify-center gap-4 p-4"
							>
								{testCases[index].input + " " + testCases[index].output}
							</div>
						)
					})}
					<Button onClick={handleSubmit}>Submit</Button>
				</div>
			</div>
		</main>
	)
}
