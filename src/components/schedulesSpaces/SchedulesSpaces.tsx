import { useEffect, useState } from "react";
import "./schedulesSpaces.css";  
import HorarioEspacioService, {
  HorarioEspacioDtoResponse,
} from "../../services/HorarioEspacioService";

type SchedulesSpaceProps = {
  idEspacio: number;
  fecha: string;
   onSelectHorario: (horario: HorarioEspacioDtoResponse) => void
};

function getDiaSemana(fecha: string): string {
  const dias = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];  const date = new Date(fecha);
  return dias[date.getDay()];
}

function SchedulesSpace({ idEspacio, fecha, onSelectHorario }: SchedulesSpaceProps) {
  const [horarios, setHorarios] = useState<HorarioEspacioDtoResponse[]>([]);
  const diaSemana = getDiaSemana(fecha);

  useEffect(() => {
    const fetchHorarios = async () => {
      try {
        const response = await HorarioEspacioService.getHorariosPorEspacioYDia(diaSemana, idEspacio);
        setHorarios(response.data);
      } catch (error) {
        console.error("Error al obtener horarios:", error);
      }
    };

    if (idEspacio && fecha) {
      fetchHorarios();
    }
  }, [idEspacio, fecha]);


    if (horarios.length === 0) return <p>No hay horarios disponibles para este día.</p>;

  return (
    <>
      {horarios.map((horario) => (
        <div className="reserva-card" key={horario.idHorarioEspacio} onClick={
            () => onSelectHorario(horario)} style={{ cursor: "pointer" }
        }>
          <div className="reserva-info">
            <div className="reserva-hora">
              🕒 <strong>{diaSemana}</strong>, {horario.horaInicio} - {horario.horaFin}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default SchedulesSpace;
