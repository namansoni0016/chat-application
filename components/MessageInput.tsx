import { IoMdSend } from "react-icons/io";
import { FiPaperclip } from "react-icons/fi";
import { VscSmiley } from "react-icons/vsc";
import { FaRegClock } from "react-icons/fa";
import { PiClockClockwiseFill } from "react-icons/pi";
import { BsStars } from "react-icons/bs";
import { MdInsertChart } from "react-icons/md";
import { FaMicrophone } from "react-icons/fa6";
import { Badge } from "./ui/badge";
import { GiPeriscope } from "react-icons/gi";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import { sendMessages } from "@/actions/chats";
import { useChatStore } from "@/store/chatStore";

const MessageInput = () => {
    const selectedUser = useChatStore((state) => state.selectedUser);
    const [ text, setText ] = useState("");
    const handleSend = async(e: React.FormEvent) => {
        e.preventDefault();
        if(!text.trim()) return;
        try {
            await sendMessages(selectedUser?.id, text);
            setText("");
        } catch (error) {
            console.error("Failed to send message: ", error);
        }
    }
    return (
        <div className="w-full border p-4 shadow-sm bg-white flex flex-col gap-3">
            <form onSubmit={handleSend}>
                <div className="flex items-center mb-4">
                    <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Message..." className="flex-grow outline-none border-none bg-transparent font-bold text-gray-500" />
                    <button type="submit" className="text-green-700 hover:text-green-600 text-xl ml-2">
                        <IoMdSend />
                    </button>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex gap-6 text-gray-700 text-lg">
                        <FiPaperclip />
                        <VscSmiley />
                        <FaRegClock />
                        <PiClockClockwiseFill />
                        <BsStars />
                        <MdInsertChart className="rotate-90" />
                        <FaMicrophone />
                    </div>
                    <Badge variant="outline" className="flex justify-between rounded-md gap-20 py-1">
                        <div className="flex flex-row gap-1 font-bold">
                            <p className="border border-green-700 rounded-full"><GiPeriscope className="text-green-700 text-lg" /></p> Periskope
                        </div>
                        <div>
                            <IoIosArrowUp />
                            <IoIosArrowDown />
                        </div>
                    </Badge>
                </div>
            </form>
        </div>
    )
}

export default MessageInput;