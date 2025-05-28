"use server";

import { createClient } from "@/utils/supabase/server";

export async function getAllOtherUsers() {
    const supabase = await createClient();
    const { data: authData, error: authError } = await  supabase.auth.getUser();
    if(authError || !authData?.user) {
        return { status: "error", message: "Not Authenticated", users: []};
    }
    const currentUserEmail = authData.user.email;
    const { data: otherUsers, error: queryError } = await supabase.from("user_profiles").select("id, name, email, phone").neq("email", currentUserEmail);
    if(queryError) {
        return { status: "error", message: queryError.message, users: []};
    }
    return { status: "success", users: otherUsers };
}

export async function sendMessages(recieverId: string | undefined, content: string) {
    const supabase = await createClient();
    const user = await supabase.auth.getUser();
    const senderId = user.data.user?.id;
    if(!senderId) {
        return { status: "error", message: "User not authenticated!"};
    }
    const { data, error } = await supabase.from("messages").insert([
        {
            sender_id: senderId,
            receiver_id: recieverId,
            content,
        },
    ]);
    if(error) {
        return { status: "error", message: error.message };
    }
    return data;
}

export async function getMessages(otherId: string | undefined) {
    const supabase = await createClient();
    const currentUser = await supabase.auth.getUser();
    const currentUserId = currentUser.data.user?.id;
    const { data, error } = await supabase.from("messages").select("*")
        .or(`and(sender_id.eq.${currentUserId}, receiver_id.eq.${otherId}),and(sender_id.eq.${otherId}, receiver_id.eq.${currentUserId})`)
        .order("created_at", { ascending: true });
    if(error) {
        return { status: "error", message: error.message };
    }
    return data;
}