import { createClient } from "@/lib/supabase/server"
import Link from "next/link"

export default async function Page(){
    const supabase = createClient()
    const {data, error} = await supabase.from("examples_public").select("*")
    if(error){
        console.error(error)
        return <div>Failed to fetch examples</div>
    }
    if(!data){
        return <div>Examples not found</div>
    }
    return (
        <div>
            {data.map((example) => (
                <Link href={example.id} key={example.id} className=" mx-auto flex h-10 bg-primary-foreground m-4 rounded items-center justify-center max-w-32">
                    <h1>{example.name}</h1>
                </Link>
            ))}
        </div>
    )
}