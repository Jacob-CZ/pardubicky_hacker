"use client"
import { useInView } from "framer-motion"
import { Input } from "postcss"
import { useEffect, useRef, useState } from "react"
import Console from "./myConsole"

export default function ConsoleWritingAnimation() {
    const containerRef = useRef(null)
    const inWiev = useInView(containerRef, {once:true , margin: '-500px'})
    const text = `Váženy spolu programatore, vítej na strankach nejlepši progrmatorske soutěže v čechách`
    const [textArray, setTextArray] = useState(text.split(''))
    const [array, setArray] = useState<string[]>([])
    const inputRef = useRef<HTMLInputElement>(null) 
    const [focus, setFocus] = useState<boolean>(false)
    useEffect(() => {
        if (inWiev) {
            const interval = setInterval(() => {
                setArray((prev) => {
                    const nextChar = textArray[prev.length];
                    if (prev.length >= textArray.length) {
                        setFocus(true)
                        clearInterval(interval)
                    }
                    if (nextChar === ' ') {
                        return [...prev, '&nbsp;'];
                    }
                    return [...prev, nextChar];
                })

            }, 100)
            return () => clearInterval(interval)
        }
    }, [inWiev])

    return (
            <div ref={containerRef} className=" p-2 w-full h-screen flex flex-col text-console">
                <div className="text-2xl font-terminal h-fit flex">
                    {array.map((letter, index) => (
                        <span key={index} dangerouslySetInnerHTML={{ __html: letter }}></span>
                    ))}
                    <div style={ focus ? {animation: "none", backgroundColor: "transparent"}: {}} className="blinking-cursor h-6 w-2 bg-console ml-1">
                    </div>
                </div>
                <br/>
                    <Console focus={focus}/>
            </div>
    )
}