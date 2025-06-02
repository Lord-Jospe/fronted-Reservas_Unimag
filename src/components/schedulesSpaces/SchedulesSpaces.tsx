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
  const dias = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
  
  const [anio, mes, dia] = fecha.split("-").map(Number);
  const date = new Date(anio, mes - 1, dia); // Mes en JS empieza desde 0
  return dias[date.getDay()];
}

function SchedulesSpace({ idEspacio, fecha, onSelectHorario }: SchedulesSpaceProps) {
  const [horarios, setHorarios] = useState<HorarioEspacioDtoResponse[]>([]);

  useEffect(() => {
    const fetchHorarios = async () => {
      try {
        const diaSemana = getDiaSemana(fecha);
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
              🕒 <strong>{horario.dia}</strong>, {horario.horaInicio} - {horario.horaFin}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default SchedulesSpace;
