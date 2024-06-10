import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable"
import LeftPanel from "@/components/leftPanel"
import RightEditor from "@/components/editor"
import TerminalComponent from "@/components/terminal"
export default async function Page({ params }: { params: { exampleId: string } }) {
    const data = await fetch(process.env.URL + "/mdtest.md",{cache:"no-cache"}).then((res) => res.text())
	return (
		<div className="h-screen w-screen">
			<ResizablePanelGroup
				direction="horizontal"
				className="border h-screen w-screen"
			>
				<ResizablePanel defaultSize={50} minSize={25}>
					<LeftPanel data={data} />
				</ResizablePanel>
				<ResizableHandle />
				<ResizablePanel defaultSize={50} minSize={25}>
					<ResizablePanelGroup direction="vertical">
						<ResizablePanel defaultSize={75}>
								<RightEditor  defaultValue={`const test = "test"`}	/>
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
