"use client";
import { useChatStore } from "@/store/chatStore";
import { BsStars } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";

const ChatHeader = () => {
    const selectedUser = useChatStore((state) => state.selectedUser);
    return (
        <div className="flex justify-between items-center w-full p-1 border-b">
            <div className="flex flex-col">
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="size-10 rounded-full relative">
                            <img src="/avatar.png" alt={selectedUser?.name} />
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold">{selectedUser?.name}</h3>
                        <p className="text-sm text-muted-foreground">
                            Online
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-4 pr-4">
                <BsStars className="text-gray-600 hover:text-black text-lg" />
                <IoSearch className="text-gray-600 hover:text-black text-lg" />
            </div>
        </div>
    );
}

export default ChatHeader;