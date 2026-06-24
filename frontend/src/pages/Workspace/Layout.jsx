import { WorkspaceNavbar } from "@/components/organisms/Workspace/WorkspaceNavbar"
import { WorkspaceSideBar } from "@/components/organisms/Workspace/WorkspaceSidebar"

export const WorkspaceLayout = ({children}) => {
    return(
        <div className="h-screen">
                <WorkspaceNavbar/>
            <div className="flex h-[calc(100vh-40px)]">
                <WorkspaceSideBar />
                {children}
            </div>
        </div>
    )
}