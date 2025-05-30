import { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import SidebarAdmin from "../../components/sidebar/SidebarAdmin";
import "./adminDashboard.css";

function AdminDashboard() {
  const [selectedCategory, setSelectedCategory] = useState("Inicio");

  const options = [
    "Inicio",
    "Espacios",
    "Reservas",
    "Reporte de problemas",
    "Notificaciones",
    "Configuración",
    "Usuarios",
  ];

  return (
    <>
      <Navbar />
      <div className="sidebar-container">
        <SidebarAdmin correo="John.doe@gamil.com" nombre="John Doe" />
        <Sidebar
          onSelectCategory={setSelectedCategory}
          selected={selectedCategory}
          options={options}
        />
      </div>
    </>
  );
}

export default AdminDashboard;