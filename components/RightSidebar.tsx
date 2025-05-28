import { RiFolderImageFill } from "react-icons/ri";
import { TbLayoutSidebarLeftCollapseFilled } from "react-icons/tb";
import { AiOutlineSync } from "react-icons/ai";
import { LuPenLine } from "react-icons/lu";
import { FaBarsStaggered } from "react-icons/fa6";
import { IoIosPeople } from "react-icons/io";
import { CiBoxList } from "react-icons/ci";
import { FiAtSign } from "react-icons/fi";
import { RiListSettingsLine } from "react-icons/ri";

const RightSidebar = () => {
    return (
        <div className="h-screen w-14 border-r shadow-sm flex flex-col items-center py-2 justify-between">
            <div className="relative">
                <div className="flex flex-col items-center text-gray-400 gap-8 mt-10">
                    <TbLayoutSidebarLeftCollapseFilled size={20} />
                    <AiOutlineSync size={20} />
                    <LuPenLine size={20} />
                    <FaBarsStaggered size={20} />
                    <CiBoxList size={20} />
                    <IoIosPeople size={20} />
                    <FiAtSign size={20} />
                    <RiFolderImageFill size={20} />
                    <RiListSettingsLine size={20} />
                </div>
            </div>
        </div>
    );
}

export default RightSidebar;