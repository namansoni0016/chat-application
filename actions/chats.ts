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