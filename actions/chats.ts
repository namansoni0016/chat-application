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
    ]).select().single();
    if(error) {
        return { status: "error", message: error.message };
    }
    return data;
}

export async function getMessages(userId: string) {
    const supabase = await createClient();
    const { data, error } = await supabase.from("messages")
        .select("*, messages_sender_id_fkey(id, name, phone)")
        .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
        .order("created_at", { ascending: true });
    if(error) {
        return { status: "error", message: error.message };
    }
    return data;
}