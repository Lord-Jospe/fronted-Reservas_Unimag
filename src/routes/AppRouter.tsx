import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/loginPage/Loginpage";
import HomePage from "../pages/homePage/HomePage";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import SpaceDetail from "../pages/SpaceDetail/SpaceDetail";
import ConfirmReservationPage from "../pages/confirmReservationPage/confirmReservationPage";
import UserProfile from "../pages/userProfilePage/UserProfile";
import RoleRoute from "./RoleRoute";
import AdminDashboard from "../pages/adminDashboard/AdminDashboard";
import StudentPanelPage from "../pages/studentPanelPage/StudentPanelPage";

// ← si ya creaste el RoleRoute
// import RoleRoute from "./RoleRoute";

const AppRouter = createBrowserRouter([
  // RUTAS PÚBLICAS (sin autenticación)
  {
    path: "/",
    element: <PublicRoute />,
    children: [
      {
        path: "/",
        element: <LoginPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },

  // RUTAS PROTEGIDAS (requieren login)
  {
    path: "/*",
    element: <ProtectedRoute />,
    children: [
      // 📘 ESTUDIANTE
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "space/:idEspacio",
        element: <SpaceDetail />,
      },
      {
        path: "confirm-reservation",
        element: <ConfirmReservationPage />,
      },
      {
        path: "student-panel",
        element: <StudentPanelPage />,
      },
      {
        path: "profile",
        element: <UserProfile />,
      },

      // 🔒 ADMINISTRADOR (vistas en construcción)
      // Puedes usar un RoleRoute si deseas restringir aún más el acceso por rol
      {
        path: "admin",
        element: <RoleRoute allowedRoles={['ADMINISTRADOR']} />,
        children: [
          {
            path: "dashboard",
            element: <AdminDashboard />, // <- por crear
          },/*
          {
            path: "manage-users",
            element: <ManageUsers />, // <- por crear
          },
          {
            path: "reports",
            element: <AdminReports />, // <- por crear
          },*/
        ],
      },
    ],
  },
]);

export default AppRouter;
