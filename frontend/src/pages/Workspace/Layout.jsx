import { WorkspaceNavbar } from "@/components/organisms/Workspace/WorkspaceNavbar"
import { WorkspacePanel } from "@/components/organisms/Workspace/WorkspacePanel"
import { WorkspaceSideBar } from "@/components/organisms/Workspace/WorkspaceSidebar"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"

export const WorkspaceLayout = ({children}) => {
    return(
        <div className="h-screen">
            <WorkspaceNavbar/>
            <div className="flex h-[calc(100vh-40px)]">
                <WorkspaceSideBar />
                <ResizablePanelGroup
                    direction="horizontal"
                    className="flex-1"
                    autoSaveId="workspace-layout"
                >
                    <ResizablePanel
                        defaultSize={30}
                        minSize={25}
                        className="bg-slack-medium"
                    >
                        <WorkspacePanel/>
                    </ResizablePanel>

                    <ResizableHandle withHandle />

                    <ResizablePanel
                        defaultSize={70}
                        minSize={25}
                    >
                        {children}
                    </ResizablePanel>
                </ResizablePanelGroup>
            </div>
        </div>
    )
}
