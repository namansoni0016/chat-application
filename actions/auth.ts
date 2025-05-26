"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getUserSession() {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getSession();
    if(error) {
        return null;
    } 
    return { status: "success", user: data.session?.user };
}

export async function signUp(formData: FormData) {
    const supabase = await createClient();
    const credentials = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        password: formData.get("password") as string,
    };
    const { error, data } = await supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password,
        options: {
            data: {
                name: credentials.name,
                phone: credentials.phone,
            },
        },
    });
    if(error) {
        return {
            status: error?.message,
            user: null,
        };
    } else if (data?.user?.identities?.length === 0) {
        return {
            status: "User with this email already exists",
            user: null
        }
    }
    revalidatePath("/login", "layout");
    return { status: "success", user: data.user};
}

export async function signIn(formData: FormData) {
    const supabase = await createClient();
    const credentials = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    }
    const { error, data } = await supabase.auth.signInWithPassword(credentials);
    if(error) {
        return {
            status: error?.message,
            user: null,
        }
    }
    const { data: existingUser } = await supabase.from("user_profiles").select("*").eq("email", credentials?.email).limit(1).single();
    if(!existingUser) {
        const { error: insertError } = await supabase.from("user_profiles").insert({
            email: data?.user.email,
            name: data?.user?.user_metadata?.name,
            phone: data?.user?.user_metadata?.phone,
        });
        if(insertError) {
            return {
                status: insertError?.message,
                user: null,
            };
        }
    }
    revalidatePath("/chats", "layout");
    return { status: "success", user: data.user };
}

export async function signOut() {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();
    if(error) {
        redirect("/error");
    }
    revalidatePath("/chats", "layout");
    redirect("/login");
}