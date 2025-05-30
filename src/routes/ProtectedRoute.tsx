import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
//import { useState } from "react";


function ProtectedRoute(){
    //const [isLoggedIn, /*setIsLoggedIn*/] = useState(false);
    const auth = useAuth();

    return auth.isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;