import Gradient from "@/components/gradient"
import Link from "next/link"
import React from "react"

const exampleData = [
	{ id: 1, name: "Example 1", difficulty: "Easy" },
	{ id: 2, name: "Example 2", difficulty: "Medium" },
	{ id: 3, name: "Example 3", difficulty: "Hard" },
]

export default function Page() {
	return (
		<div className="w-full min-h-screen z-0 ">
			<div className=" grid grid-cols-4 gap-4 p-4 bg-transparent ">
				{exampleData.map((example) => (
					<Link
						href={"examples/" + example.id}
						key={example.id}
						className=" font-terminal text-console justify-around z-50 flex h-full rounded-xl bg-[#0005] border-2 backdrop-blur-lg  p-2 items-center  max-h-24 "
					>
						<h1 className="text-3xl">{example.name}</h1>
						<p className="text-lg  ">
							{" "}
							difficulty:{" "}
							<span className="text-red-800">
								{example.difficulty}
							</span>
						</p>
					</Link>
				))}
			</div>
			<Gradient />
		</div>
	)
}
