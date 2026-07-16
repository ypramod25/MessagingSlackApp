import combineContext from "@/utils/combineContext";
import { AuthContextProvider } from "./AuthContextProvider";
import { CreateWorkspaceContextProvider } from "./CreateWorkspaceContext";
import { WorkspacePreferencesModalContextProvider } from "./WorkspacePreferencesModalContext";
import { CreateChannelContextProvider } from "./CreateChannelContext";
import { WorkspaceContextProvider } from "./WorkspaceContext";

export const AppContextProvider = combineContext(
    AuthContextProvider,
    WorkspaceContextProvider,
    CreateWorkspaceContextProvider,
    CreateChannelContextProvider,
    WorkspacePreferencesModalContextProvider
);