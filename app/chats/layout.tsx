import HeaderBar from "@/components/HeaderBar";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

export default async function ChatsLayout({ children }: { children: ReactNode }) {
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
        redirect("/login"); 
    }
    return (
        <div className="h-screen flex flex-col">
            <HeaderBar />
            <main className="flex-1 overflow-hidden">
                {children}
            </main>
        </div>
    );
}
