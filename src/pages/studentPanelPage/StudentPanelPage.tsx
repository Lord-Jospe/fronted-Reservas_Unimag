import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./studentPanelPage.css";
import ReservaEstudianteService, {
  ReservaDtoResponse,
} from "../../services/ReservaEstudianteService";
import { ProblemaDtoResponse } from "../../services/ProblemaAdminService";
import ProblemaEstudianteService from "../../services/ProblemaEstudianteService";
import TableData from "../../components/tableData/TableData";
import { useNavigate } from "react-router-dom";

function StudentPanelPage() {
  const [selectedCategory, setSelectedCategory] = useState("Mis Reservas");
  const [reservas, setReservas] = useState<ReservaDtoResponse[]>([]);
  const [problemas, setProblemas] = useState<ProblemaDtoResponse[]>([]);
  const idEstudiante = Number(localStorage.getItem("idEstudiante"));
  const navigate = useNavigate();

  const options = [
    "Mis Reservas",
    "Reportes de problemas",
    "Notificaciones",
    "Configuración",
  ];

  useEffect(() => {
    if (selectedCategory === "Mis Reservas") {
      ReservaEstudianteService.getReservasPorEstudiante(idEstudiante)
        .then((response) => {
          console.log("Datos de reservas:", response.data);
          setReservas(response.data);
        })
        .catch((error) => console.error("Error al obtener reservas:", error));
    }

    if (selectedCategory === "Reportes de problemas") {
      ProblemaEstudianteService.getProblemasPorEstudiante(idEstudiante)
        .then((response) => {
          console.log("Datos de reportes:", response.data);
          setProblemas(response.data);
        })
        .catch((error) => console.error("Error al obtener reportes:", error));
    }
  }, [selectedCategory, idEstudiante]);

  const handlerEditClick = (item: ReservaDtoResponse) => {
    console.log("Editar reserva:", item);
    navigate(`/reservation-formPage/${item.idReserva}`);
  };
  return (
    <>
      <Navbar />
      <div className="contenedor-principal">
        <Sidebar
          onSelectCategory={setSelectedCategory}
          selected={selectedCategory}
          options={options}
        />

        <div className="contenedor-contenido">
          <h3>{selectedCategory}</h3>
          {selectedCategory === "Mis Reservas" && (
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
              onEditClick={handlerEditClick}
            />
          )}

          {selectedCategory === "Reportes de problemas" && (
            <TableData
              columnas={[
                { label: "ID", field: "idProblema" },
                { label: "Descripción", field: "descripcion" },
                { label: "Estado", field: "estado" },
                { label: "Fecha", field: "fecha" },
                { label: "idEspacio", field: "espacioId" },
                { label: "idEstudiante", field: "idEstudiante" },
              ]}
              datos={problemas}
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

export default StudentPanelPage;
