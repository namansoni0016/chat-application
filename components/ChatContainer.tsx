"use client";

import { useEffect, useState } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { useChatStore } from "@/store/chatStore";
import { getMessages } from "@/actions/chats";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";

type Message = {
    id: string,
    sender_id: string,
    receiver_id: string,
    content: string,
    created_at: string,
    messages_sender_id_fkey?: {
        id: string,
        name?: string,
        phone?: string,
    };
};

const ChatContainer = () => {
    const [ user, setUser ] = useState<User | null>(null);
    const [ messages, setMessages ] = useState<Message[]>([]);
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
    useEffect(() => {
        const supabase = createClient();
        if(!selectedUser?.id) return;
        const channel = supabase.channel("realtime-messages").on("postgres_changes", {
            event: "INSERT",
            schema: "public",
            table: "messages",
            filter: `sender_id=eq.${selectedUser.id}`,
        }, (payload) => {
            console.log("New message received: ", payload.new);
            fetchMessages();
        }).subscribe();
        return () => {
            supabase.removeChannel(channel);
        };
    }, [selectedUser]);
    useEffect(() => {
        const supabase = createClient();
        if(!selectedUser?.id) return;
        const channel = supabase.channel("messages-channel").on("postgres_changes", {
            event: "INSERT",
            schema: "public",
            table: "messages",
            filter: `receiver_id=eq.${user?.id}`,
        }, (payload) => {
            console.log("New message received: ", payload.new);
            fetchMessages();
        }).subscribe();
        return () => {
            supabase.removeChannel(channel);
        };
    }, [selectedUser?.id, user?.id]);
    useEffect(() => {
        const chatContainer = document.getElementById("chat-scroll-container");
        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    }, [messages]);
    const fetchMessages = async() => {
        if(selectedUser?.id) {
            const res = await getMessages(selectedUser.id);
            if(Array.isArray(res)) {
                setMessages(res);
            } else {
                console.error("Error fetching messages: ", res.message);
                setMessages([]);
            }
        }
    }
    useEffect(() => {
        fetchMessages();
    }, [selectedUser]);
    return (
        <div className="flex-1 flex flex-col overflow-auto">
            <ChatHeader />
            <div className="flex-1 overflow-y-auto px-4 py-2" id="chat-scroll-container" style={{ backgroundImage: "url('/chat_bg.png')", backgroundSize: "cover"}}>
                {messages.length > 0 ? (
                    messages.map((msg, index) => {
                        const isCurrentUser = msg.sender_id === user?.id;
                        const showDate = index === 0 || new Date(messages[index].created_at).toDateString() !== new Date(messages[index-1].created_at).toDateString();
                        return (
                            <div key={msg.id}>
                                {showDate && (
                                    <div className="mx-auto w-fit my-4 text-gray-500 text-xs bg-gray-200 font-semibold px-2 py-1 rounded-sm shadow-sm">
                                        {new Date(msg.created_at).toLocaleDateString("en-GB", {
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "numeric"
                                        })}
                                    </div>
                                )}
                                <div className={`flex ${isCurrentUser ? "justify-end" : "justify-start"} my-6`}>
                                    <div className={`max-w-[80%] rounded-md shadow-md px-4 py-2 ${
                                        isCurrentUser ? "bg-green-100 text-left text-sm" : "bg-white text-left text-sm" 
                                    }`}>
                                        {!isCurrentUser && (
                                            <div className="text-green-600 font-semibold text-xs flex justify-between gap-6">
                                                <div>
                                                    {msg.messages_sender_id_fkey?.name ?? "Unknown User"}
                                                </div>
                                                <div className="text-gray-400">
                                                    {msg.messages_sender_id_fkey?.phone ?? "N/A"}
                                                </div>
                                            </div>
                                        )}
                                        {isCurrentUser && (
                                            <div className="text-green-600 font-semibold text-xs flex justify-between gap-6">
                                                <div>
                                                    {msg.messages_sender_id_fkey?.name ?? "Unknown User"}
                                                </div>
                                                <div className="text-gray-400">
                                                    {msg.messages_sender_id_fkey?.phone ?? "N/A"}
                                                </div>
                                            </div>
                                        )}
                                        <div className="text-md text-black">{msg.content}</div>
                                        <div className="text-right text-[10px] text-gray-400 mt-1">
                                            {new Date(msg.created_at).toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                ) : (
                    <div className="text-center font-bold text-gray-700 mt-4">No messages yet.</div>
                )}
            </div>
            <MessageInput onMessageSent={fetchMessages} />
        </div>
    );
}

export default ChatContainer;