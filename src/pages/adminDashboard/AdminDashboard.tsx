import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import SidebarAdmin from "../../components/sidebar/SidebarAdmin";
import "./adminDashboard.css";
import ReservasService from "../../services/ReservasService";
import { useAuth } from "../../auth/AuthProvider";
import EspacioService from "../../services/EspacioService";
import TableReservation from "../../components/tableReservation/TableReservation";

interface Reserva {
  idReserva: number;
  estadoReserva: string;
  fecha: string;
  idEstudiante: string;
  idHorarioEspacio: string;
  motivo: string;
}

interface Espacio {
  id: number;
  nombre: string;

  tipo: string;
    ubicacion: string;
}

function AdminDashboard() {
  const [selectedCategory, setSelectedCategory] = useState("Inicio");
  const { role, isAuthenticated } = useAuth();

  const [reservas, setReservas] = useState<Array<Array<string | number>>>([]);
  const [espacios, setEspacios] = useState<Array<Array<string | number>>>([]);

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
          // Transforma los datos si es necesario
          const datosTransformados = response.data.map((reserva: Reserva) => [
            reserva.idReserva,
            reserva.estadoReserva,
            reserva.fecha,
            reserva.idEstudiante,
            reserva.idHorarioEspacio,

            reserva.motivo,
          ]);
          setReservas(datosTransformados);
        })
        .catch((error) => console.error("Error al obtener reservas:", error));
    }

    if (selectedCategory === "Espacios") {
      // Similar para espacios
      EspacioService.getAllEspacios()
        .then((response) => {
          const datosTransformados = response.data.map((espacio: Espacio) => [
            espacio.id,
            espacio.nombre,
            espacio.tipo,
            espacio.ubicacion,
          ]);
          setEspacios(datosTransformados);
        })
        .catch((error) => console.error("Error al obtener espacios:", error));
    }
  }, [selectedCategory, isAuthenticated, role]);

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
            <TableReservation
              columna={[
                "Espacio",
                "Usuario",
                "Fecha",
                "Hora Inicio",
                "Hora Fin",
                "Estado",
              ]}
              datos={reservas}
            />
          )}

          {selectedCategory === "Espacios" && (
            <TableReservation
              columna={["idEspacio", "Nombre", "Tipo", "idSede"]}
              datos={espacios}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
