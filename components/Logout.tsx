"use client";

import { useState } from "react"
import { Button } from "./ui/button";
import { signOut } from "@/actions/auth";

const Logout = () => {
    const [ loading, setLoading ] = useState(false);
    const handleSubmit = async(event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        await signOut();
        setLoading(false);
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Button type="submit" disabled={loading}>
                    {loading ? "Signing out..." : "Log out"}
                </Button>
            </form>
        </div>
    )
}

export default Logout;