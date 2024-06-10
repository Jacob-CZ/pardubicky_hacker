"use client"
import { useInView } from "framer-motion"
import { useEffect, useRef, useState } from "react"

export default function ConsoleWritingAnimation() {
    const containerRef = useRef(null)
    const inWiev = useInView(containerRef, {once:true , margin: '-500px'})
    const text = `Váženy spolu programatore, vítej na strankach nejlepši progrmatorske soutěže v čechách`
    const [textArray, setTextArray] = useState(text.split(''))
    const [array, setArray] = useState<string[]>([])

    useEffect(() => {
        if (inWiev) {
            const interval = setInterval(() => {
                setArray((prev) => {
                    const nextChar = textArray[prev.length];
                    if (nextChar === ' ') {
                        return [...prev, '&nbsp;', textArray[prev.length + 1]];
                    }
                    return [...prev, nextChar];
                })
                if (array.length >= textArray.length) {
                    clearInterval(interval)
                }
            }, 100)
            return () => clearInterval(interval)
        }
    }, [inWiev])

    return (
            <div ref={containerRef} className="w-full h-24 flex justify-center items-center bg-black text-white">
                <div className="text-2xl font-mono h-fit flex">
                    {array.map((letter, index) => (
                        <span key={index} dangerouslySetInnerHTML={{ __html: letter }}></span>
                    ))}
                    <div className="blinking-cursor">

                    </div>
                </div>
            </div>
    )
}