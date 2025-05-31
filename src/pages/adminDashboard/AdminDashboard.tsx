import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import SidebarAdmin from "../../components/sidebar/SidebarAdmin";
import "./adminDashboard.css";
import ReservasService from "../../services/ReservasService";
import { useAuth } from "../../auth/AuthProvider";
import EspacioService from "../../services/EspacioService";
import TableData from "../../components/tableReservation/TableData";

interface Reserva {
  idReserva: number;
  idEstudiante: number;
  idHorarioEspacio: number;
  estadoReserva: string;
  fecha: string;
  motivo: string;
}

interface Espacio {
  id: number;
  nombre: string;
  tipo: string;
  restricciones: string;
  idSede: number;
  disponible: boolean;
}

function AdminDashboard() {
  const [selectedCategory, setSelectedCategory] = useState("Inicio");
  const { role, isAuthenticated } = useAuth();

  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [espacios, setEspacios] = useState<Espacio[]>([]);

  const options = [
    "Inicio",
    "Espacios",
    "Reservas",
    "Reporte de problemas",
    "Notificaciones",
    "Configuración",
    "Usuarios",
  ];

  useEffect(() => {
    if (!isAuthenticated || role !== "ADMINISTRADOR") return;

    if (selectedCategory === "Reservas") {
      ReservasService.getAllReservas()
        .then((response) => {
          console.log("Datos de reservas:", response.data);
          setReservas(response.data);
        })
        .catch((error) => console.error("Error al obtener reservas:", error));
    }

    if (selectedCategory === "Espacios") {
      // Similar para espacios
      EspacioService.getAllEspacios()
        .then((response) => {
          console.log("Datos de espacios:", response.data);
          setEspacios(response.data);
        })
        .catch((error) => console.error("Error al obtener espacios:", error));
    }
  }, [selectedCategory, espacios, isAuthenticated, role]);

  console.log("Selected Category:", selectedCategory);
  console.log("Reservas Data:", espacios);
  //console.log("Espacios Data:", reservas);
  console.log("Token:", localStorage.getItem("token"));
  return (
    <>
      <Navbar />
      <div className="content-container">
        <div className="sidebar-container">
          <SidebarAdmin correo="John.doe@gamil.com" nombre="John Doe" />
          <Sidebar
            onSelectCategory={setSelectedCategory}
            selected={selectedCategory}
            options={options}
          />
        </div>
        <div className="content-container">
          <h3 className="title-content">{selectedCategory}</h3>
          {selectedCategory === "Reservas" && (
            <TableData
              columnas={[
                { label: "ID", field: "idReserva" },
                { label: "Estado", field: "estadoReserva" },
                { label: "Fecha", field: "fecha" },
                { label: "Estudiante", field: "idEstudiante" },
                { label: "Horario", field: "idHorarioEspacio" },
                { label: "Motivo", field: "motivo" },
              ]}
              datos={reservas}
            />
          )}

          {selectedCategory === "Espacios" && (
            <TableData
              columnas={[
                { label: "ID", field: "id" },
                { label: "Nombre", field: "nombre" },
                { label: "Tipo", field: "tipo" },
                 { label: "Restricciones", field: "restricciones" },
                { label: "Ubicación", field: "idSede" },
                { label: "Disponible", field: "disponible" },
              ]}
              datos={espacios}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
