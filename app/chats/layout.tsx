import HeaderBar from "@/components/HeaderBar";
import Sidebar from "@/components/Sidebar";
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
        <div className="flex h-screen">
            <div className="w-16">
                <Sidebar />
            </div>
            <div className="flex-1 flex flex-col">
                <HeaderBar />
                <main className="flex-1 overflow-hidden">
                    {children}
                </main>
            </div>
        </div>
    );
}
