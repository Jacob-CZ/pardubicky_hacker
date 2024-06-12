import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable"
import LeftPanel from "@/components/leftPanel"
import RightEditor from "@/components/editor"
import TerminalComponent from "@/components/terminal"
import { createClient } from "@/lib/supabase/server"
export default async function Page({ params }: { params: { exampleId: string } }) {
	const supabase = createClient()
	const exampleId = params.exampleId
	const {data : exampleData , error} = await supabase.from("examples_public").select("*").eq("id", exampleId).single()
	if(error) {
		console.error(error)
		return <div>Failed to fetch example</div>
	}
	if(!exampleData) {
		return <div>Example not found</div>
	}
	return (
		<div className="h-screen w-screen">
			<ResizablePanelGroup
				direction="horizontal"
				className="border h-screen w-screen"
			>
				<ResizablePanel defaultSize={50} minSize={25}>
					<LeftPanel data={exampleData} />
				</ResizablePanel>
				<ResizableHandle />
				<ResizablePanel defaultSize={50} minSize={25}>
					<ResizablePanelGroup direction="vertical">
						<ResizablePanel defaultSize={75} minSize={50}>
								<RightEditor data={exampleData}/>
						</ResizablePanel>
						<ResizableHandle />
						<ResizablePanel defaultSize={25} minSize={15}>
							<TerminalComponent	/>
						</ResizablePanel>
					</ResizablePanelGroup>
				</ResizablePanel>
			</ResizablePanelGroup>
		</div>
	)
}
