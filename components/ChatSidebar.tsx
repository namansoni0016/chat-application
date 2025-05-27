"use client"

import { RiFolderDownloadFill } from "react-icons/ri";
import { Button } from "./ui/button";
import { getAllOtherUsers } from "@/actions/chats";
import { FaPhone } from "react-icons/fa6";
import { Badge } from "./ui/badge";
import { useEffect, useState } from "react";
import { useChatStore } from "@/store/chatStore";

const ChatSidebar = () => {
    const [ users, setUsers ] = useState<{id: string, name: string, phone: string}[]>([]);
    const setSelectedUserStore = useChatStore((state) => state.setSelectedUser);
    const [ selectedUser, setSelectedUser ] = useState<string | null>();
    useEffect(() => {
        const fetchUsers = async () => {
            const {users} = await getAllOtherUsers();
            setUsers(users);
        };
        fetchUsers();
    }, []);
    return (
        <aside className="h-full w-20 lg:w-90 border-r border-base-300 flex flex-col transition-all duration-200">
            <div className="border-b border-base-300 bg-muted/40 w-full p-3">
                <div className="flex items-center gap-2">
                    <RiFolderDownloadFill className="text-green-600" />
                    <span className="text-sm font-bold text-green-600">Custom Filter</span>
                    <Button variant="outline" className="rounded-none font-bold text-muted-foreground p-1 h-7">Save</Button>
                </div>
            </div>
            <div className="overflow-y-auto w-full">
                {users.map((user) => (
                    <button key={user.id} onClick={() => {setSelectedUserStore(user); setSelectedUser(user.id)}} className={`w-full p-1 flex items-center gap-2 transition-colors rounded ${selectedUser === user.id ? "bg-muted" : "hover:bg-base-300"}`}>
                        <div className="relative flex-shrink-0 mx-auto lg:mx-0">
                            <img src="/avatar.png" alt={user.name} className="size-11 object-cover rounded-full" />
                        </div>
                        {/* User info */}
                        <div className="hidden lg:flex flex-col  w-full">
                            <div className="text-sm font-bold text-start truncate">{user.name}</div>
                            <p className="text-sm text-start text-gray-500 mb-1">Lorem ipsum dolor sit amet consec...</p>
                            <div className="flex justify-between items-center w-full">
                                <Badge variant="secondary" className="flex items-center gap-0.5 text-gray-400 px-1 py-0.5 text-[10px] h-4" >
                                    <FaPhone className="w-2 h-2" />
                                    {user.phone}
                                </Badge>
                                <span className="text-gray-400 text-[10px] whitespace-nowrap">24-Feb-25</span>
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </aside>
    );
}

export default ChatSidebar;