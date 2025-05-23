import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LoginPage from "../pages/loginPage/Loginpage";
import RegisterPage from "../pages/registerPage/RegisterPage";
import HomePage from "../pages/homePage/HomePage";
import ProtectedRoute from "./ProtectedRoute";

// Importamos los componentes de las páginas que queremos usar en las rutas
const AppRouter = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/register",
        element: <RegisterPage />,
    },
    {
        path: "/",
        element: <ProtectedRoute />,
        children: [
            {  
                path: "/home",
                element: <HomePage />,
            },],
    }

]);

export default AppRouter;