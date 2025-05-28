"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useRouter } from "next/navigation";
import { signUp } from "@/actions/auth";

const SignUpForm = () => {
    const [ loading, setLoading ] = useState<boolean>(false);
    const router = useRouter();
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        const formData = new FormData(event.currentTarget);
        const result = await signUp(formData);
        if(result.status === "success") {
            router.push("/login");
        } else {
            console.log(result.status);
        }
        setLoading(false);
    }
    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
                <div className="flex flex-col gap-y-2">
                    <Label>Full Name</Label>
                    <Input type="text" id="name" name="name" placeholder="John Doe" required/>
                </div>
                <div className="flex flex-col gap-y-2">
                    <Label>Phone Number</Label>
                    <Input type="text" id="phone" name="phone" placeholder="+919999999999" required/>
                </div>
                <div className="flex flex-col gap-y-2">
                    <Label>Email</Label>
                    <Input type="email" id="Email" name="email" placeholder="johndoe@email.com" required/>
                </div>
                <div className="flex flex-col gap-y-2">
                    <Label>Password</Label>
                    <Input type="password" name="password" id="password" placeholder="******" required/>
                </div>
                <Button className="bg-green-700 font-bold" disabled={loading}>Sign Up</Button>
            </form>
        </>
    )
}

export default SignUpForm;