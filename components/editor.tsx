"use client"
import { Editor } from "@monaco-editor/react"
import { useTheme } from "next-themes"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select"
import { Button } from "./ui/button"
import { use, useEffect, useState } from "react"
import useOutputStore from "@/lib/useOutputStore"
import useCodeStore from "./useCodeStore"

export default function RightEditor({
	data,
}: {
	data: {
		created_at: string;
		func_name: string | null;
		id: string;
		instructions: string | null;
		name: string | null;
	}
}) {
	useEffect(() => {
		setCode(langDefaultValues[language])
	},[])
	const { theme, setTheme } = useTheme()
	const {code, setCode} = useCodeStore()
	const { setOutput, setLanguage, language } = useOutputStore()
	const languageMap: { [key: string]: string } = {
		js: "javascript",
		ts: "typescript",
		py: "python",
		c: "c",
		cpp: "cpp",
		java: "java",
		cs: "csharp",
		go: "go",
		rust: "rust",
	};
	const langDefaultValues: { [key: string]: string } = {
		js : `function ${data.func_name}(){

}
		`,
		py: `def ${data.func_name}():
	
		`, 
		c: `#include <stdio.h>
int ${data.func_name}(){

}
		`,
		cpp: `#include <iostream>
using namespace std;
int ${data.func_name}(){
		}`,
		java: `public class Main {
	public static void ${data.func_name}(String[] args) {

	}
}
		`,
		cs: `using System;
class Program
{
	static void ${data.func_name}()
	{

	}
}
		`,
		go: `package main
import "fmt"
func ${data.func_name}() {

}
		`,
		ts: `
function ${data.func_name}(){
	
}
		`,
		rust: `fn ${data.func_name}() {
`
	}
	async function runCode() {
		setOutput("hacker@delta-skola:~$ run program." + language)	
		const res = await fetch("/api/run/" + language, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				code: code,
				exampleId : data.id
			}),
		})
		const outputData = await res.json()
		setOutput(outputData)
	}
	async function submitCode() {
		const res = await fetch("/api/submit/" + language, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				code: code,
				codeId : "123"
			}),
		})
		const data = await res.json()
		console.log(data)
	}
	function chnageTheme() {
		if (theme === "dark") {
			setTheme("light")
		} else {
			setTheme("dark")
		}
	}
	return (
		<div className="flex flex-col h-full items-start justify-center relative ">
			<div className=" flex w-full   h-fit  p-1 justify-between pr-24">
			<Select onValueChange={(e) => setLanguage(e)}>
				<SelectTrigger className=" w-fit">
					<SelectValue placeholder="vyber jazyk" />
				</SelectTrigger>
				<SelectContent>
						<SelectItem value="js">java script</SelectItem>
						<SelectItem value="ts">typescript</SelectItem>
						<SelectItem value="py">python</SelectItem>
						<SelectItem value="c">c</SelectItem>
						<SelectItem value="cpp">c++</SelectItem>
						<SelectItem value="java">java</SelectItem>
						<SelectItem value="cs">C#</SelectItem>
						<SelectItem value="go">go</SelectItem>
						<SelectItem value="rust">rust</SelectItem>
				</SelectContent>
			</Select>
			<Button onClick={chnageTheme}>Zmenit barvu</Button>
			<Button onClick={runCode}>Spustit</Button>
			<Button onClick={submitCode}>Odevzdat</Button>
			</div>
			<Editor
				language={languageMap[language]}
				value={langDefaultValues[language]}
				theme={theme === "dark" ? "vs-dark" : "vs-light"}
				onChange={(value) => setCode(value||"")}
			/>
		</div>
	)
}
