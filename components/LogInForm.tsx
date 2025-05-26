"use client";

import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { useRouter } from "next/navigation"
import { signIn } from "@/actions/auth";

const LogInForm = () => {
    const [ error, setError ] = useState<string | null>(null);
    const [ loading, setLoading ] = useState<boolean>(false);
    const router = useRouter();
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        const formData = new FormData(event.currentTarget);
        const result = await signIn(formData);
        if(result.status === "success") {
            router.push("/chats");
        } else {
            setError(result.status);
        }
        setLoading(false);
    }
    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
                <div className="flex flex-col gap-y-2">
                    <Label>Email</Label>
                    <Input type="email" id="Email" name="email" placeholder="johndoe@email.com" required/>
                </div>
                <div className="flex flex-col gap-y-2">
                    <Label>Password</Label>
                    <Input type="password" id="password" name="password" placeholder="******" required/>
                </div>
                <Button className="bg-green-700 font-bold" disabled={loading}>Log In</Button>
            </form>
        </>
    )
}

export default LogInForm;