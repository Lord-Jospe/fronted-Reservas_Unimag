
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

function PublicRoute() {
  const auth = useAuth();
  return auth.isAuthenticated ? <Navigate to="/home" /> : <Outlet />;
}

export default PublicRoute;
