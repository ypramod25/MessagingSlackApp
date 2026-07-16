import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import { cva } from "class-variance-authority"; // cva is a utility function that allows you to create a class variance authority (CVA) for your components. It helps in managing and applying different class names based on the component's state or props.
import { cn } from "@/lib/utils";

const sideBarItemVariants = cva(
    'flex items-center justify-start gap-1.5 font-normal h-7 px-5 text-sm overflow-hidden',
    {
        variants: {
            variant: {
                default: 'text-[#f9edffcc]',
                active: 'text-[#481350] bg-white/90 hover:bg-white/80'
            }
        },
        defaultVariants: 'default'
    }
)

export const SideBarItem = ({
    label,
    id, // channel id
    icon: Icon,
    variant
}) => {

    const {workspaceId} = useParams();
    return (
        <Button 
            variant="transparent" 
            size="sm"
            className={cn(sideBarItemVariants({variant}))}
        >
            <Link 
                to={`/workspaces/${workspaceId}/channels/${id}`}
                className='flex items-center gap-1.5'
            >
                <Icon className="size-3.5 mr-1" />
                <span className="text-sm">{label}</span>
            </Link>
        </Button>
    )
}