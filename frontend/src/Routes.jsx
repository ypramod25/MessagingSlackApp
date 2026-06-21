import { Route, Routes } from "react-router-dom"
import { Auth } from "./pages/Auth/Auth"
import { SignupContainer } from "./components/organisms/Auth/SignupContainer"
import { SigninContainer } from "./components/organisms/Auth/SigninContainer"
import { HomePage } from "./pages/HomePage"
import { NotFound } from "./pages/NotFound"

export const AppRoutes = () => {
    return (
        <Routes>
          <Route path="/auth/signup" element={<Auth><SignupContainer /></Auth>} />
          <Route path="/auth/signin" element={<Auth><SigninContainer /></Auth>} />
          <Route path="/home" element={<HomePage/>} />
          <Route path="*" element={<NotFound />}/>
        </Routes>
    )
}