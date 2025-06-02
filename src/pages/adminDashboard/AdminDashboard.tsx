import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import SidebarAdmin from "../../components/sidebar/SidebarAdmin";
import "./adminDashboard.css";
import ReservasService, {
  ReservaDtoRequest,
  ReservaDtoResponse,
} from "../../services/ReservaService";
import EspacioService, {
  EspacioDTOResponse,
} from "../../services/EspacioService";
import TableData from "../../components/tableData/TableData";
import { useAuth } from "../../auth/AuthProvider";
import { jwtDecode } from "jwt-decode";
import ProblemaAdminService, {
  ProblemaDtoResponse,
} from "../../services/ProblemaAdminService";
import HistorialReservaService, {
  HistorialReservaDtoResponse,
} from "../../services/HistorialReservaService";
import EstudianteService, {
  EstudianteDTOResponse,
} from "../../services/EstudianteService";
import ReservaService from "../../services/ReservaService";
import EditModal from "../../components/editModal/editModal";
import { toast } from "react-toastify";

function AdminDashboard() {
  const [selectedCategory, setSelectedCategory] = useState("Inicio");
  const { role, isAuthenticated } = useAuth();

  const [reservas, setReservas] = useState<ReservaDtoResponse[]>([]);
  const [espacios, setEspacios] = useState<EspacioDTOResponse[]>([]);
  const [estudiantes, setEstudiantes] = useState<EstudianteDTOResponse[]>([]);
  const [historialReservas, setHistorialReservas] = useState<
    HistorialReservaDtoResponse[]
  >([]);
  const [problemas, setProblemas] = useState<ProblemaDtoResponse[]>([]);
  const [correoUsuario, setCorreoUsuario] = useState<string>("");

  const options = [
    "Inicio",
    "Espacios",
    "Reservas",
    "Estudiantes",
    "Historial de Reservas",
    "Reporte de problemas",
    "Notificaciones",
    "Configuración",
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

    switch (selectedCategory) {
      case "Reservas":
        ReservasService.getTodasReservas()
          .then((response) => setReservas(response.data))
          .catch((error) => console.error("Error al obtener reservas:", error));
        break;

      case "Espacios":
        EspacioService.listarEspacios()
          .then((response) => setEspacios(response.data))
          .catch((error) => console.error("Error al obtener espacios:", error));
        break;

      case "Estudiantes":
        EstudianteService.findAllEstudiantes()
          .then((response) => setEstudiantes(response.data))
          .catch((error) =>
            console.error("Error al obtener estudiantes:", error)
          );
        break;

      case "Historial de Reservas":
        HistorialReservaService.findAllHistoriales()
          .then((response) => setHistorialReservas(response.data))
          .catch((error) =>
            console.error("Error al obtener historial de reservas:", error)
          );

        break;

      case "Reporte de problemas":
        ProblemaAdminService.getAllProblemas()
          .then((response) => setProblemas(response.data))
          .catch((error) =>
            console.error("Error al obtener problemas:", error)
          );

        break;

      default:
        break;
    }
  }, [selectedCategory, isAuthenticated, role]);

  const refreshReservas = () => {
  ReservasService.getTodasReservas()
    .then((response) => setReservas(response.data))
    .catch((error) => console.error("Error al obtener reservas:", error));
};

  const handleEdit = (reserva: ReservaDtoResponse) => {
  EditModal<ReservaDtoResponse>({
    title: "Cambiar estado de la Reserva",
    item: reserva,
    fields: [
      { label: "Estado", field: "estadoReserva", type: "string" },
    ],
    onConfirm: async (updated) => {
      try {
        await ReservaService.actualizarReserva(updated.idReserva, updated); // llamado al servicio
        toast.success("Reserva actualizada");
        refreshReservas(); // actualiza tabla si es necesario
      } catch (error) {
        toast.error("Error al actualizar");
      }
    }
  });
};
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
              onEditClick={handleEdit}
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

          {selectedCategory === "Estudiantes" && (
            <TableData
              columnas={[
                { label: "ID", field: "idEstudiante" },
                { label: "Nombre", field: "nombre" },
              ]}
              datos={estudiantes}
              onEditClick={(item) => console.log("Editar estudiante:", item)}
            />
          )}

          {selectedCategory === "Historial de Reservas" && (
            <TableData
              columnas={[
                { label: "ID", field: "idHistorial" },
                { label: "Fecha", field: "fechaCambio" },
                { label: "idReserva", field: "idReserva" },
                { label: "Estado", field: "estadoReserva" },
                { label: "Comentario", field: "comentario" },
              ]}
              datos={historialReservas}
              onEditClick={(item) => console.log("Editar historial:", item)}
            />
          )}

          {selectedCategory === "Reporte de problemas" && (
            <TableData
              columnas={[
                { label: "ID", field: "idProblema" },
                { label: "Descripción", field: "descripcion" },
                { label: "Espacio", field: "espacioId" },
                { label: "Estado", field: "estado" },
                { label: "Fecha Reporte", field: "fecha" },
                { label: "Estudiante", field: "idEstudiante" },
              ]}
              datos={problemas}
              onEditClick={(item) => console.log("Editar problema:", item)}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
