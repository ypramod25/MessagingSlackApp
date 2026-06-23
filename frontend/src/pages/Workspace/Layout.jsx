import { WorkspaceSideBar } from "@/components/organisms/Workspace/WorkspaceSidebar"

export const WorkspaceLayout = ({children}) => {
    return(
        <div className="h-screen">
            <div className="flex h-full">
                <WorkspaceSideBar />
                {children}
            </div>
        </div>
    )
}