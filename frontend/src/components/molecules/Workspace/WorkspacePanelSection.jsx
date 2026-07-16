import { Button } from "@/components/ui/button";
import { PlusIcon, PlusSquareIcon } from "lucide-react";
import { useState } from "react";
import { FaCaretDown, FaCaretRight } from "react-icons/fa";

export const WorkspacePanelSection = ({children, label, onIconClick}) => {
    const [open, setOpen] = useState  (false);

    return (
        <div className="flex flex-col mt-3 px-2">
            <div className="flex items-center px-3.5 group">
                <Button
                    variant="transparent"
                    className="p-0.5 text-sm size-6 text-[#f9edffcc]"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <FaCaretDown className='size-4'/> : <FaCaretRight className='size-4'/>}
                </Button>
                <Button
                    variant="transparent "
                    size='sm'
                    className='group px-1.5 text-sm text-[#f9edffcc] h-7.5 justify-start items-center overflow-hidden'
                >
                    <span>{label}</span>
                </Button>
                {onIconClick && (
                    <Button
                        onClick={onIconClick}
                        variant="transparent"
                        size='sm'
                        className='ml-auto p-0.5 size-6 text-[#f9edffcc] hover:bg-dark'
                    >
                        <PlusSquareIcon className="size-5" />
                    </Button>
                )}
            </div>
            {open && children}
        </div>
    )
} 