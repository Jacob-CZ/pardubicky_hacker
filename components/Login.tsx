import { createClient } from "@/lib/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useEffect, useState } from "react";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "./ui/input-otp";
import { toast } from "sonner";


export default function Login() {
    const [user, setUser] = useState<any>(null)
    const supabase = createClient();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [otp, setOtp] = useState<boolean | string>(false)
    useEffect(() => {
        async function getUser() {
            const { data, error } = await supabase.auth.getUser()
            if (error || !data.user) return
            setUser(data.user)

        }
        getUser()
    }, [])
    async function signIn() {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })
        if (error) {
            setError(error.message)
            console.log(error)
        } else {
            setUser(data?.user)
            console.log(user)
        }

    }
    async function signUp() {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        })
        if (error) {
            setError(error.message)
            console.log(error)
        } else {
            setUser(data?.user)
            setOtp(true)
            console.log(user)
        }
    }
    async function google() {
        const {data,error} = await supabase.auth.signInWithOAuth({
            provider: "google"
        })
        if (error) {
            setError(error.message)
            console.log(error)
            toast.error("Error signing in with Google")
        } else {
            console.log(user)
        }
    }
    async function gitHub() {
        const {data,error} = await supabase.auth.signInWithOAuth({
            provider: "github"
        })
        if (error) {
            setError(error.message)
            console.log(error)
            toast.error("Error signing in with GitHub")
        } else {
            console.log(user)
        }
    }
    async function verifyOtp() {
        if (typeof otp !== "string") return
        const {data , error} = await supabase.auth.verifyOtp({
            email: email,
            token: otp,
            type: "signup"
        })
        if (error) {
            setError(error.message)
            console.log(error)
        }
        if (data) {
            setOtp(false)
        }
    }
    async function signOut() {
        const { error } = await supabase.auth.signOut()
        if (error) {
            console.log(error)
            toast.error("Error signing out")
        } else {
            setUser(null)
        }
    }
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Avatar className=" fixed top-4 right-4" >
                        <Avatar>
                            <AvatarImage src="/dalmatian.webp" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </Avatar>
                </DialogTrigger>
                {user && !otp && (<DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when youre done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="name"
                                defaultValue="Pedro Duarte"
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                Username
                            </Label>
                            <Input
                                id="username"
                                defaultValue="@peduarte"
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" className="mr-auto">Save changes</Button>
                        <Button type="submit" onClick={signOut}>Sign out</Button>
                    </DialogFooter>
                </DialogContent>)}
                {!user && !otp && (<DialogContent className="sm:max-w-[425px]" >
                    <DialogHeader>
                        <DialogTitle>Sign in</DialogTitle>
                        <DialogDescription>
                            Sign in to your account to access your profile.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">
                                Email
                            </Label>
                            <Input
                                onChange={(e) => setEmail(e.target.value)}
                                id="email"
                                type="email"
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="password" className="text-right">
                                Password
                            </Label>
                            <Input
                                onChange={(e) => setPassword(e.target.value)}
                                id="password"
                                type="password"
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-2 items-center gap-4">
                            <Button className="" type="submit" onClick={google}>Google</Button>
                            <Button type="submit" onClick={gitHub}>Git Hub</Button>
                        </div>
                    </div>
                    <p className="text-center">{error}</p>
                    <DialogFooter>
                        <Button className="mr-auto" type="submit" onClick={signUp}>Sign up</Button>
                        <Button type="submit" onClick={signIn}>Sign in</Button>
                    </DialogFooter>
                </DialogContent>)}
                {otp && (<DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Enter OTP</DialogTitle>
                        <DialogDescription>
                            Enter the OTP sent to your email.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <InputOTP maxLength={6} onChange={e => setOtp(e)}>
                                <InputOTPGroup>
                                    <InputOTPSlot index={0} />
                                    <InputOTPSlot index={1} />
                                    <InputOTPSlot index={2} />
                                </InputOTPGroup>
                                <InputOTPSeparator />
                                <InputOTPGroup>
                                    <InputOTPSlot index={3} />
                                    <InputOTPSlot index={4} />
                                    <InputOTPSlot index={5} />
                                </InputOTPGroup>
                            </InputOTP>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" onClick={verifyOtp}>Verify</Button>
                        <p>{error}</p>
                    </DialogFooter>
                </DialogContent>)}

            </Dialog>

        </div>
    );
}