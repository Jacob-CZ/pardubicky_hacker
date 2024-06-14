"use client"
import useOutputStore from '@/lib/useOutputStore';
import { useEffect, useRef } from 'react';

export default function TerminalComponent() {
    const { output, language } = useOutputStore();
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (bottomRef.current && output.length > 0) { 
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    console.log(output)
    }, [output]);

    return (
        <div className="flex h-full flex-col overflow-y-auto">
            {output.map((line:string, index) => {
                return <div key={index} className="text-white">{ typeof line == "string" ? line.split('\n').map((item, key) => {
                  return <span key={key}>{item}<br/></span>
                }): "error"}</div>
            })}
            <div ref={bottomRef} />
        </div>
    )
}