import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import SidebarAdmin from "../../components/sidebar/SidebarAdmin";
import "./adminDashboard.css";
import ReservasService, {
  ReservaDtoResponse,
} from "../../services/ReservaService";
import EspacioService, {
  EspacioDTOResponse,
} from "../../services/EspacioService";
import TableData from "../../components/tableData/TableData";
import { useAuth } from "../../auth/AuthProvider";
import { jwtDecode } from "jwt-decode";

function AdminDashboard() {
  const [selectedCategory, setSelectedCategory] = useState("Inicio");
  const { role, isAuthenticated } = useAuth();

  const [reservas, setReservas] = useState<ReservaDtoResponse[]>([]);
  const [espacios, setEspacios] = useState<EspacioDTOResponse[]>([]);
  const [correoUsuario, setCorreoUsuario] = useState<string>("");

  const options = [
    "Inicio",
    "Espacios",
    "Reservas",
    "Reporte de problemas",
    "Notificaciones",
    "Configuración",
    "Usuarios",
  ];

  //Obtener el usuario autenticado
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        setCorreoUsuario(decoded.correo || decoded.sub); 
      } catch (error) {
        console.error("Error al decodificar token:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated || role !== "ADMINISTRADOR") return;

    if (selectedCategory === "Reservas") {
      ReservasService.getTodasReservas()
        .then((response) => {
          setReservas(response.data);
        })
        .catch((error) => console.error("Error al obtener reservas:", error));
    }

    if (selectedCategory === "Espacios") {
      EspacioService.listarEspacios()
        .then((response) => {
          setEspacios(response.data);
        })
        .catch((error) => console.error("Error al obtener espacios:", error));
    }
  }, [selectedCategory, isAuthenticated, role]);

  return (
    <>
      <Navbar />
      <div className="contenedor-principal">
        <div className="contenedor-sidebars">
          <SidebarAdmin correo={correoUsuario} nombre="Administrador" />
          <Sidebar
            onSelectCategory={setSelectedCategory}
            selected={selectedCategory}
            options={options}
          />
        </div>

        <div className="contenedor-contenido">
          <h3>{selectedCategory}</h3>

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
              onEditClick={(item) => {
                console.log("Editar problema:", item);
                // Aquí puedes implementar la lógica para editar el problema
              }}
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
              onEditClick={(item) => {
                console.log("Editar problema:", item);
                // Aquí puedes implementar la lógica para editar el problema
              }}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
