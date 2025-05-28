import { FaChartLine, FaList, } from "react-icons/fa6";
import { GiPeriscope } from "react-icons/gi";
import { LuNetwork } from "react-icons/lu";
import { PiSparkleFill } from "react-icons/pi";
import { IoMdHome } from "react-icons/io";
import { FaCommentDots } from "react-icons/fa6";
import { IoTicket } from "react-icons/io5";
import { HiSpeakerphone } from "react-icons/hi";
import { RiContactsBookFill } from "react-icons/ri";
import { RiFolderImageFill } from "react-icons/ri";
import { MdChecklist } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { TbStarsFilled } from "react-icons/tb";
import { TbLayoutSidebarLeftExpandFilled } from "react-icons/tb";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { createClient } from "@/utils/supabase/server";
import Logout from "./Logout";

const Sidebar = async () => {
    const supabase = await createClient();
    const { data: { user }} = await supabase.auth.getUser();
    return (
        <div className="h-screen w-14 border-r shadow-sm flex flex-col items-center py-4 justify-between">
            <div className="relative">
                <div className="bg-green-600 text-white p-2 rounded-full relative mb-8">
                    <GiPeriscope size={20} />
                    <span className="absolute -bottom-1 -right-1 text-xs bg-white text-green-700 rounded-full px-1 font-bold">12</span>
                </div>
                <div className="flex flex-col items-center gap-2 mt-2">
                    <IconWrapper><IoMdHome size={20} /></IconWrapper>
                    <IconWrapper active><FaCommentDots size={20} /></IconWrapper>
                    <IconWrapper><IoTicket size={20} /></IconWrapper>
                    <IconWrapper><FaChartLine size={20} /></IconWrapper>
                    <IconWrapper><FaList size={20} /></IconWrapper>
                    <IconWrapper><HiSpeakerphone size={20} /></IconWrapper>
                    <IconWrapper>
                        <div className="relative">
                            <LuNetwork size={20} />
                            <PiSparkleFill size={10} className="absolute -top-1 -right-1 text-yellow-400" />
                        </div>
                    </IconWrapper>
                    <IconWrapper><RiContactsBookFill size={20} /></IconWrapper>
                    <IconWrapper><RiFolderImageFill size={20} /></IconWrapper>
                    <IconWrapper><MdChecklist size={20} /></IconWrapper>
                    <Popover>
                        <PopoverTrigger>
                            <IconWrapper><IoMdSettings size={20} /></IconWrapper>
                        </PopoverTrigger>
                        <PopoverContent className="w-full flex flex-col items-center">
                            <p className="font-bold text-gray-700 border-b mb-4">{user?.user_metadata.name}</p>
                            <Logout />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
            <div className="flex flex-col items-center gap-4">
                <IconWrapper><TbStarsFilled size={20} /></IconWrapper>
                <IconWrapper><TbLayoutSidebarLeftExpandFilled size={20} /></IconWrapper>
            </div>
        </div>
    );
}

export default Sidebar;

const IconWrapper = ({
    children, active = false
} : {
    children: React.ReactNode;
    active?: boolean
}) => {
    return (
        <div className={`p-2 rounded-md cursor-pointer hover:bg-gray-100 ${active ? "bg-gray-100 text-green-600" : "text-gray-500"}`}>
            {children}
        </div>
    )
}