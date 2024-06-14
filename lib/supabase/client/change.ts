import { toast } from "sonner";
import { createClient } from "../client";

const supabase = createClient();
export async function chnageName(name: string) {
    const { data, error } = await supabase.auth.updateUser({
        data: {
            name
        }
    })
    if (error) {
        console.log(error)
        toast.error("Error updating name")
    }
}
export async function changeEmail(email: string) {
    const { data, error } = await supabase.auth.updateUser({
        data: {
            email
        }
    })
    if (error) {
        console.log(error)
        toast.error("Error updating email")
    }
}
export async function changePassword(password: string) {
    const { data, error } = await supabase.auth.updateUser({
        data: {
            password
        }
    })
    if (error) {
        console.log(error)
        toast.error("Error updating password")
    }
}
export async function changeNickname(nickname: string) {
    const { data, error } = await supabase.auth.updateUser({
        data: {
            nickname
        }
    })
    if (error) {
        console.log(error)
        toast.error("Error updating nickname")
    }
}