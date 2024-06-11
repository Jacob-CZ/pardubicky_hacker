"use client"

import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { CiSquarePlus } from "react-icons/ci"

export default function Page() {
    const [instructions, setInstructions] = useState<string>('')
    const [testCases, setTestCases] = useState<string[]>([])
    function addTestCase() {
        setTestCases([...testCases, ''])
    }
	return (
		<main className=" ">
			<div className=" instructions flex-col justify-stretch">
				<h1 className=" text-5xl text-center">Instructions</h1>
				<Textarea className=" w-1/2 min-w-96 mx-auto h-96 min-h-fit"></Textarea>
				<div className=" mx-auto flex flex-col items-center w-1/2 gap-4 p-4" >
					<div className="w-fit h-fit self-end " onClick={addTestCase}>
						<CiSquarePlus className="w-12 h-12 hover:bg-white rounded hover:fill-black transition-all duration-1000"/>
					</div>
					{testCases.map((_, index) => {
						return (
							<div
								key={index}
								className=" w-full h-12 border border-border rounded-xl "
							></div>
						)
					})}
				</div>
			</div>
		</main>
	)
}
