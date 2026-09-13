import { Route, Routes } from "react-router-dom"
import { Auth } from "./pages/Auth/Auth"
import { SignupContainer } from "./components/organisms/Auth/SignupContainer"
import { SigninContainer } from "./components/organisms/Auth/SigninContainer"
import { HomePage } from "./pages/Home/HomePage"
import { NotFound } from "./pages/NotFound"
import { ProtectedRoute } from "./components/molecules/ProtectedRoute/ProtectedRoute"
import { WorkspaceLayout } from "./pages/Workspace/Layout"
import { JoinPage } from "./pages/Workspace/JoinPage"
import { Channel } from "./pages/Workspace/Channel/Channel"
import { JoinWorkspace } from "./pages/Workspace/JoinWorkspacePage"
import { Payments } from "./pages/Payments/Payments"

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/auth/signup" element={<Auth><SignupContainer /></Auth>} />
            <Route path="/" element={<Auth><SigninContainer /></Auth>} />
            <Route path="/auth/signin" element={<Auth><SigninContainer /></Auth>} />
            <Route path="/home" element={<ProtectedRoute><HomePage/></ProtectedRoute>} />
            
            <Route 
                path="/workspaces/:workspaceId" 
                element={<ProtectedRoute><WorkspaceLayout>Workspace</WorkspaceLayout></ProtectedRoute>}
            />
            
            <Route 
                path="/workspaces/:workspaceId/channels/:channelId" 
                element={<ProtectedRoute><WorkspaceLayout><Channel/></WorkspaceLayout></ProtectedRoute>}
            />

            <Route
                path="/workspace/join"
                element={<JoinWorkspace />}
            />

            <Route path="/makepayment" element={<ProtectedRoute><Payments /></ProtectedRoute>}/>
            
            <Route path="/workspaces/join/:workspaceId" element={<JoinPage />} />
            <Route path="*" element={<NotFound />}/>
        </Routes>
    )
}