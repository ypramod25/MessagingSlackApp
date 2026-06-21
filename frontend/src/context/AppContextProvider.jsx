import combineContext from "@/utils/combineContext";
import { AuthContextProvider } from "./AuthContextProvider";

export const AppContextProvider = combineContext(
    AuthContextProvider
);