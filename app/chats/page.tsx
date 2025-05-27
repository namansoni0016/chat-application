import ChatSidebar from "@/components/ChatSidebar";
import EmptyChat from "@/components/EmptyChat";
import Logout from "@/components/Logout";
import { createClient } from "@/utils/supabase/server";
import ChatContainer from "@/components/ChatContainer";

export default async function ChatsPage() {
    const supabase = await createClient();
    const { data: {user} } = await supabase.auth.getUser();
    return (
        <>
            {/* <div>
                {user?.email}
                <Logout />
            </div> */}
            <div className="h-screen">
                <div className="flex items-center justify-center pt-20 px-4">
                    <div className="bg-base-100 rounded-lg shadown-xl w-full h-[calc(100vh-8rem)]">
                        <div className="flex h-full rounded-lg overflow-hidden">
                            <ChatSidebar />
                            <ChatContainer />
                            {/* <EmptyChat /> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}