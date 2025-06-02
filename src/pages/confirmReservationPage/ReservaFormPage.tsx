import "./reservaFormPage.css";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";

import EspacioService, {
  EspacioDTOResponse,
} from "../../services/EspacioService";
import SchedulesSpace from "../../components/schedulesSpaces/SchedulesSpaces";
import HorarioEspacioService, {
  HorarioEspacioDtoResponse,
} from "../../services/HorarioEspacioService";
import ReservaEstudianteService, {
  ReservaDtoResponse,
  ReservaEstDtoRequest,
} from "../../services/ReservaEstudianteService";
import SedeService from "../../services/SedeService";

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
  const dias = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];
  const [anio, mes, dia] = fechaStr.split("-").map(Number);
  const date = new Date(anio, mes - 1, dia);
  return dias[date.getDay()];
}

function ReservaFormPage() {
  const { idReserva } = useParams(); // Nuevo: para obtener el ID de la URL
  const location = useLocation();
  const navigate = useNavigate();

  const { dia, horaInicio, horaFin, idEspacio, nombreSede } =
    location.state || {};
  const [motivo, setMotivo] = useState("");
  const [nombreSedefinal, setNombreSede] = useState(nombreSede);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(
    obtenerFechaActual()
  );
  const [horarioSeleccionado, setHorarioSeleccionado] =
    useState<HorarioEspacioDtoResponse | null>(null);
  const [space, setSpace] = useState<EspacioDTOResponse | null>(null);

  const [isEditing, setIsEditing] = useState(false); //para controlar el modo edición

  const idEstudiante = Number(localStorage.getItem("idEstudiante"));
  const diaSeleccionado = getNombreDiaSemanaIngles(fechaSeleccionada);

  // Cargar datos de la reserva existente si estamos editando
  useEffect(() => {
    const loadReservaData = async () => {
      if (idReserva) {
        //Modo edición de una reserva existente
        try {
          setIsEditing(true);
          const response = await ReservaEstudianteService.getReservaPorId(
            idEstudiante,
            Number(idReserva)
          );
          const reserva: ReservaDtoResponse = response.data;

          // Cargar datos del horario
          const horarioResponse = await HorarioEspacioService.getHorarioById(
            reserva.idHorarioEspacio
          );
          const horario: HorarioEspacioDtoResponse = horarioResponse.data;

          // Cargar datos del espacio
          const espacioRes = await EspacioService.obtenerEspacio(
            horario.idEspacio
          );
          const espacioData: EspacioDTOResponse = espacioRes.data;

          const SedeRes = await SedeService.listarSedes();
          const sedeData = SedeRes.data.find(
            (sede) => sede.id === espacioData.idSede
          );

          // Establecer estados
          setMotivo(reserva.motivo);
          setFechaSeleccionada(reserva.fecha);
          setHorarioSeleccionado(horario);
          setSpace(espacioData);
          setNombreSede(sedeData ? sedeData.name : "Sede no encontrada");
        } catch (error) {
          console.error("Error al cargar la reserva:", error);
          //navigate("/home"); // Redirigir si hay error
        }
      } else {
        // Modo creación - cargar datos del espacio
        if (!idEspacio) {
          navigate("/home");
          return;
        }

        try {
          const resEspacio = await EspacioService.obtenerEspacio(
            Number(idEspacio)
          );
          const espacioData: EspacioDTOResponse = resEspacio.data;
          setSpace(espacioData);
        } catch (error) {
          console.error("Error al cargar espacio:", error);
          navigate("/home");
        }
      }
    };
    loadReservaData();
  }, [idReserva, idEspacio, navigate, idEstudiante]);

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
    // Asegúrate que idHorarioEspacio sea un número positivo
    if (!horarioSeleccionado || horarioSeleccionado.idHorarioEspacio <= 0) {
      alert("ID de horario no válido");
      return;
    }

    const hoy = new Date();
    const fechaElegida = new Date(fechaSeleccionada);
    if (fechaElegida <= hoy) {
      alert("La fecha debe ser futura.");
      return;
    }
    const reserva: ReservaEstDtoRequest = {
      idHorarioEspacio: horarioSeleccionado.idHorarioEspacio,
      fecha: fechaSeleccionada,
      motivo,
    };

    console.log("Datos a enviar:", reserva); // Para depuración
    try {
      if (isEditing) {
        await ReservaEstudianteService.actualizarReserva(
          idEstudiante,
          Number(idReserva),
          reserva
        );
        alert("Reserva actualizada correctamente");
      } else {
        await ReservaEstudianteService.guardarReserva(idEstudiante, reserva);
        alert("Reserva creada correctamente");
      }
      navigate("/home");
    } catch (error: any) {
      if (error.response?.data?.mensaje?.includes("Ya existe una reserva")) {
        alert("Ya existe una reserva para esa fecha y horario.");
      } else {
        console.error("Error al guardar la reserva:", error);
        alert("Hubo un error al confirmar la reserva.");
      }
    }
    console.log({ dia, horaInicio, horaFin, idEspacio, motivo });
  };

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
            <input type="text" value={nombreSedefinal} disabled />
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
            idEspacio={isEditing ? space?.id : Number(idEspacio)}
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
          <button onClick={handleConfirmar}>
            {isEditing ? "Actualizar Reserva" : "Confirmar Reserva"}
          </button>
        </div>
      </div>
    </>
  );
}

export default ReservaFormPage;
