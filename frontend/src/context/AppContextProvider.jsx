import combineContext from "@/utils/combineContext";
import { AuthContextProvider } from "./AuthContextProvider";
import { CreateWorkspaceContextProvider } from "./createWorkspaceContext";
import { WorkspacePreferencesModalContextProvider } from "./WorkspacePreferencesModalContext";

export const AppContextProvider = combineContext(
    AuthContextProvider,
    CreateWorkspaceContextProvider,
    WorkspacePreferencesModalContextProvider
);