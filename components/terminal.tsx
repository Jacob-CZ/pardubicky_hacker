"use client"
import useOutputStore from '@/lib/useOutputStore';
import { useEffect, useRef } from 'react';
import Terminal, { ColorMode, TerminalOutput } from 'react-terminal-ui';

export default function TerminalComponent() {
    const { output, language } = useOutputStore();
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (bottomRef.current && output.length > 0) { 
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    }, [output]);

    return (
        <div className="flex h-full flex-col overflow-y-auto">
            {output.map((line:string, index) => {
                return <div key={index} className="text-white">{line.includes("\n")? line.split('\n').map((item, key) => {
                  return <span key={key}>{item}<br/></span>
                })
            : line
            }</div>
            })}
            <div ref={bottomRef} />
        </div>
    )
}