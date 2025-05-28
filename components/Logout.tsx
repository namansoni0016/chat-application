"use client";

import { useState } from "react"
import { Button } from "./ui/button";
import { signOut } from "@/actions/auth";
import { useChatStore } from "@/store/chatStore";
import { useRouter } from "next/navigation";

const Logout = () => {
    const router = useRouter();
    const [ loading, setLoading ] = useState(false);
    const handleSubmit = async(event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        await signOut();
        useChatStore.getState().reset();
        router.replace("/login");
        setLoading(false);
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Button type="submit" className="font-bold bg-green-600" disabled={loading}>
                    {loading ? "Signing out..." : "Log out"}
                </Button>
            </form>
        </div>
    )
}

export default Logout;