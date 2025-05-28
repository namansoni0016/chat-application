"use client";

import ChatSidebar from "@/components/ChatSidebar";
import EmptyChat from "@/components/EmptyChat";
import ChatContainer from "@/components/ChatContainer";
import { useChatStore } from "@/store/chatStore";

export default function ChatsPage() {
    const selectedUser = useChatStore((state) => state.selectedUser);
    return (
        <>
            <div className="flex h-full rounded-lg overflow-hidden bg-base-100">
                <ChatSidebar />
                {selectedUser ? <ChatContainer /> : <EmptyChat />}
            </div>
        </>
    );
}