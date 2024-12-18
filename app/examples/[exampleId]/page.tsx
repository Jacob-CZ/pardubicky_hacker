import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable"
import LeftPanel from "@/components/leftPanel"
import RightEditor from "@/components/editor"
import TerminalComponent from "@/components/terminal"

type ExampleData = {
	id: string
	title: string
	description: string
	difficulty: "beginner" | "intermediate" | "advanced"
	code: {
		initial: string
		solution: string
	}
	instructions: string
	hints: string[]
	created_at: string
	func_name: string | null
	name: string | null
}

export default async function Page({
	params,
}: {
	params: { exampleId: string }
}) {
	const mockData: ExampleData = {
		id: params.exampleId,
		title: "Basic Array Manipulation",
		description:
			"Learn how to perform basic operations with arrays in JavaScript",
		difficulty: "beginner",
		code: {
			initial: "function reverseArray(arr) {\n  // Your code here\n}",
			solution:
				"function reverseArray(arr) {\n  return arr.reverse();\n}",
		},
		instructions: "Write a function that reverses the elements of an array",
		hints: [
			"Think about using a loop",
			"You can swap elements using a temporary variable",
			"Consider the array.reverse() method as an alternative",
		],
		created_at: new Date().toISOString(),
		func_name: null,
		name: null,
	}

	return (
		<div className="h-screen w-screen">
			<ResizablePanelGroup
				direction="horizontal"
				className="border h-screen w-screen"
			>
				<ResizablePanel defaultSize={50} minSize={25}>
					<LeftPanel data={mockData} />
				</ResizablePanel>
				<ResizableHandle />
				<ResizablePanel defaultSize={50} minSize={25}>
					<ResizablePanelGroup direction="vertical">
						<ResizablePanel defaultSize={75} minSize={50}>
							<RightEditor data={mockData} />
						</ResizablePanel>
						<ResizableHandle />
						<ResizablePanel defaultSize={25} minSize={15}>
							<TerminalComponent />
						</ResizablePanel>
					</ResizablePanelGroup>
				</ResizablePanel>
			</ResizablePanelGroup>
		</div>
	)
}
