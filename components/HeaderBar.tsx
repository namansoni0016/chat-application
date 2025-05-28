import { FaCommentDots } from "react-icons/fa6";
import { CgSync } from "react-icons/cg";
import { FaRegQuestionCircle } from "react-icons/fa";
import { Button } from "./ui/button";
import { GoDesktopDownload } from "react-icons/go";
import { FaBellSlash } from "react-icons/fa6";
import { BsStars } from "react-icons/bs";
import { FaListUl } from "react-icons/fa";

const HeaderBar = () => {
    return (
        <div className="flex items-center justify-between w-full px-4 py-2 border-b">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <FaCommentDots />
                <span className="font-bold">chats</span>
            </div>
            <div className="flex items-center gap-4">
                <Button variant="outline" className="rounded-sm text-[12px] font-semibold w-20 h-7">
                    <CgSync className="text-[8px]" />Refresh
                </Button>
                <Button variant="outline" className="rounded-sm text-[12px] font-semibold w-18 h-7">
                    <FaRegQuestionCircle className="text-[8px]" />Help
                </Button>
                <Button variant="outline" className="btn relative rounded-sm text-[12px] w-24 h-7">
                    <span className="absolute w-2 h-2 bg-yellow-400 rounded-full left-1 top-2 mr-2" />
                    <span className="ml-3 font-semibold">5/6 phones</span>
                </Button>
                <Button variant="outline" className="rounded-sm text-[12px] font-bold w-10 h-7">
                    <GoDesktopDownload className="text-[8px]" />
                </Button>
                <Button variant="outline" className="rounded-sm text-[12px] font-bold w-10 h-7">
                    <FaBellSlash className="text-[8px]" />
                </Button>
                <Button variant="outline" className="rounded-sm text-[12px] font-bold w-18 h-7">
                    <BsStars className="text-[8px] text-yellow-400" />
                    <FaListUl className="text-[8px] text-gray-600" />
                </Button>
            </div>
        </div>
    )
}

export default HeaderBar;