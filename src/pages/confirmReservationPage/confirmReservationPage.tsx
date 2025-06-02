import "./ConfirmReservationPage.css";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";

import EspacioService, {
  EspacioDTOResponse,
} from "../../services/EspacioService";
import SchedulesSpace from "../../components/schedulesSpaces/SchedulesSpaces";
import { HorarioEspacioDtoResponse } from "../../services/HorarioEspacioService";
import ReservaEstudianteService, {
  ReservaEstDtoRequest,
} from "../../services/ReservaEstudianteService";

//Función para obtener la fecha actual en formato YYYY-MM-DD
function obtenerFechaActual(): string {
  const hoy = new Date();
  const dia = String(hoy.getDate()).padStart(2, "0");
  const mes = String(hoy.getMonth() + 1).padStart(2, "0");
  const anio = hoy.getFullYear();

  return `${anio}-${mes}-${dia}`;
}

// Función para obtener el día de la semana en inglés a partir de una fecha
function getNombreDiaSemanaIngles(fechaStr: string): string {
  const dias = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
  const [anio, mes, dia] = fechaStr.split("-").map(Number);
  const date = new Date(anio, mes - 1, dia);
  return dias[date.getDay()];
}

function ConfirmReservationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { dia, horaInicio, horaFin, idEspacio, nombreSede } =
    location.state || {};
  const [motivo, setMotivo] = useState("");
  const [fechaSeleccionada, setFechaSeleccionada] = useState(
    obtenerFechaActual()
  );
  const [horarioSeleccionado, setHorarioSeleccionado] =
    useState<HorarioEspacioDtoResponse | null>(null);
  const [space, setSpace] = useState<EspacioDTOResponse | null>(null);
  const idEstudiante = Number(localStorage.getItem("idEstudiante"));
  const diaSeleccionado = getNombreDiaSemanaIngles(fechaSeleccionada);

  useEffect(() => {
    const fetchData = async () => {
      if (!idEspacio) return;

      try {
        const espacioRes = await EspacioService.obtenerEspacio(
          Number(idEspacio)
        );
        const espacioData: EspacioDTOResponse = espacioRes.data;
        setSpace(espacioData);
      } catch (error) {
        console.error("Error al obtener el espacio:", error);
      }
    };
    fetchData();
  }, [idEspacio]);

  const handleConfirmar = async () => {
    if (!horarioSeleccionado) {
      alert("Selecciona un horario antes de confirmar.");
      return;
    }
    if (motivo.trim().length < 5) {
      alert("El motivo debe tener al menos 5 caracteres.");
      return;
    }
    if (diaSeleccionado !== horarioSeleccionado.dia.toUpperCase()) {
      alert(
        `La fecha seleccionada no coincide con el día del horario (${horarioSeleccionado.dia}).`
      );
      return;
    }

    const hoy = new Date();
    const fechaElegida = new Date(fechaSeleccionada);
    if (fechaElegida <= hoy) {
      alert("La fecha debe ser futura.");
      return;
    }
    console.log("Confirmando reserva...");
    console.log("IdHorarioEspacio:", horarioSeleccionado.idHorarioEspacio);
    console.log("Fecha seleccionada:", fechaSeleccionada);
    console.log("Motivo:", motivo);
    const reserva: ReservaEstDtoRequest = {
      idHorarioEspacio: horarioSeleccionado.idHorarioEspacio,
      fecha: fechaSeleccionada,
      motivo,
    };

    try {
      // Asumiendo que ya tienes el ID del estudiante disponible (ej: por sesión)
      await ReservaEstudianteService.guardarReserva(idEstudiante, reserva);
      alert("Reserva confirmada");
      navigate("/");
    } catch (error) {
      console.error("Error al guardar la reserva:", error);
      alert("Hubo un error al confirmar la reserva.");
    }
    console.log({ dia, horaInicio, horaFin, idEspacio, motivo });
  };

  if (!location.state) return <p>Datos no disponibles.</p>;
  if (!space) return <p>Espacio no encontrado.</p>;

  return (
    <>
      <Navbar />

      <div className="confirm-reservation-container">
        <div className="title-content">
          <h1>Crear Reserva</h1>
        </div>
        <div className="form-content">
          <div className="form-row">
            <h4>Tipo</h4>
            <input type="text" value={space.tipo} disabled />
          </div>
          <div className="form-row">
            <h4>Sede</h4>
            <input type="text" value={nombreSede} disabled />
          </div>

          <div className="form-row">
            <h4>Nombre</h4>
            <input type="text" value={space.nombre} disabled />
          </div>
          <div className="form-row">
            <h4>Fecha</h4>
            <input
              type="date"
              min={obtenerFechaActual()}
              value={fechaSeleccionada}
              onChange={(e) => setFechaSeleccionada(e.target.value)}
            />
          </div>
        </div>
        <div className="horario-content">
          <h4>Horarios Disponible en esa fecha</h4>
          <SchedulesSpace
            idEspacio={idEspacio}
            fecha={fechaSeleccionada}
            onSelectHorario={setHorarioSeleccionado}
          />
        </div>
        <div className="reservation-details">
          <h4>Motivo de la reserva:</h4>
          <textarea
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            style={{ width: "50%", height: "100px", marginBottom: "1rem" }}
          />
        </div>
        <div className="button-container">
          <button onClick={handleConfirmar}>Confirmar Reserva</button>
        </div>
      </div>
    </>
  );
}

export default ConfirmReservationPage;
