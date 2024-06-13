import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
export default function Console({ focus = false }) {
    const inputRef = useRef<HTMLInputElement>(null)
    const [history, setHistory] = useState<string[]>([])
    const [command, setCommand] = useState<string>("")
    const [commandHistory, setCommandHistory] = useState<string[]>([""])
    const [commandIndex, setCommandIndex] = useState<number>(0)
    const router = useRouter()
    interface Commands {
        [command: string]: () => void;
    }

    const commands: Commands = {
        clear: () => { setCommand(""); setHistory([]) },
        examples: () => { router.push("/examples") },
        about: () => { setHistory([...history, aboutText]) },
        help: () => { setHistory([...history, "clear - clear the console", "examples - show examples", "about - about the competition", "help - show this help"]) }
    }
    useEffect(() => {
        if (focus) {
            inputRef.current!.focus()
        }
    }, [focus])
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCommand(e.target.value)
    }
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && e.currentTarget.value !== "") {
            const userCommand = e.currentTarget.value.replace("hacker@delta_skola:~$ ", "").trim(); // get the command and remove the prefix
            setCommandHistory([...commandHistory, userCommand])
            setHistory([...history, command])
            setCommand("");
            if (commands[userCommand]) { // add an index signature to allow any string as an index
                commands[userCommand](); // run the command
            }
            e.currentTarget.value = ""
        }
        if (e.key === "ArrowUp") {
            e.preventDefault()
            if (commandIndex < commandHistory.length) {
                setCommand(commandHistory[commandHistory.length - commandIndex - 1])
                setCommandIndex(commandIndex + 1)
            }
            else {
                setCommand(commandHistory[0])
            }
        }
        if (e.key === "ArrowDown") {
            e.preventDefault()
            if (commandIndex > 0) {
                setCommand(commandHistory[commandHistory.length - commandIndex])
                setCommandIndex(commandIndex - 1)
            } else {
                setCommand("")
            }
        }
    }
    return (
        <div className="w-full h-screen">
            <div className=" items-center flex w-full h-6 bg-background text-console font-terminal text-2xl mb-4">
                <div className=" mr-3">
                    type help for list of commands
                </div>
            </div>
            {history.map((command, index) => (
                <div key={index} className="items-center flex h-6 text-console font-terminal text-2xl">
                    hacker@delta_skola:~$ {command}
                </div>
            ))}
            <div className=" items-center flex w-full h-6 bg-background text-console font-terminal text-2xl">
                <div className=" mr-3">
                    hacker@delta_skola:~$
                </div>
                <input ref={inputRef} value={command} onKeyDown={handleKeyDown} onChange={handleChange} className=" w-full h-6 bg-background text-console focus:outline-none  font-terminal text-2xl " />
            </div>
        </div>
    )
}

var aboutText = "Toto je nejvetsi programatorska soutez v cr organizovana skolou delta a jejmi sudenty, primarne Jakubem"