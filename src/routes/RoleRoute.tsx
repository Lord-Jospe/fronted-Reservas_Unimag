import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

const RoleRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" />;
  if (!allowedRoles.includes(role || "")) return <Navigate to="/home" />;

  return <Outlet />;
};

export default RoleRoute;
