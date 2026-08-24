import combineContext from "@/utils/combineContext";
import { AuthContextProvider } from "./AuthContextProvider";
import { CreateWorkspaceContextProvider } from "./CreateWorkspaceContext";
import { WorkspacePreferencesModalContextProvider } from "./WorkspacePreferencesModalContext";
import { CreateChannelContextProvider } from "./CreateChannelContext";
import { WorkspaceContextProvider } from "./WorkspaceContext";
import { SocketContextProvider } from "./SocketContext";

export const AppContextProvider = combineContext(
    SocketContextProvider,
    AuthContextProvider,
    WorkspaceContextProvider,
    CreateWorkspaceContextProvider,
    CreateChannelContextProvider,
    WorkspacePreferencesModalContextProvider
);