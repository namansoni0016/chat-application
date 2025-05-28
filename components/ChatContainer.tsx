"use client";

import { useEffect, useState } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { useChatStore } from "@/store/chatStore";
import { getMessages } from "@/actions/chats";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";

const ChatContainer = () => {
    const [ user, setUser ] = useState<User | null>(null);
    const [ messages, setMessages ] = useState<any[]>([]);
    const selectedUser = useChatStore((state) => state.selectedUser);
    useEffect(() => {
        if(selectedUser?.id) {
            getMessages(selectedUser.id).then((res) => {
                if(Array.isArray(res)) {
                    setMessages(res);
                } else {
                    console.error("Error fetching messages: ", res.message);
                    setMessages([]);
                }
            });
        }
    }, [selectedUser]);
    useEffect(() => {
        const getUser = async () => {
            const supabase = createClient();
            const { data, error } = await supabase.auth.getUser();
            if(error) {
                console.error("Error fetching user", error.message);
            } else {
                setUser(data?.user);
            }
        };
        getUser();
    }, []);
    return (
        <div className="flex-1 flex flex-col overflow-auto">
            <ChatHeader />
            <div className="flex flex-col gap-2 p-4 overflow-y-auto flex-1" style={{backgroundImage: "url('/chat_bg.png')", backgroundSize: "cover", backgroundRepeat: "repeat"}}>
                {messages.map((msg) => {
                    const isSender = msg.sender_id === user?.id;
                    return (
                        <div key={msg.id} className={`flex ${isSender ? "justify-end" : "justify-start"}`}>
                            <div className={`max-w-xs md:max-w-md rounded-lg p-3 text-sm shadow ${isSender ? "bg-green-100 text-black" : "bg-white text-black"}`}>
                                <p>{msg.content}</p>
                                <p className="text-xs text-gray-500 text-right mt-1">
                                    {new Date(msg.created_at).toLocaleDateString([], {
                                        hour: "2-digit",
                                        minute: "2-digit"
                                    })}
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>
            <MessageInput />
        </div>
    );
}

export default ChatContainer;