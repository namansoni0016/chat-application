import Logout from "@/components/Logout";
import { createClient } from "@/utils/supabase/server";

export default async function ChatsPage() {
    const supabase = await createClient();
    const { data: {user} } = await supabase.auth.getUser();
    return (
        <>
            <div>
                <h1>Chats Page</h1>
                {user?.email}
                <Logout />
            </div>
        </>
    );
}