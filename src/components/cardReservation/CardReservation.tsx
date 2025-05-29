import { useNavigate } from "react-router-dom";
import "./cardReservation.css"

type CardReservationProps = {
  horaInicio: string;
  horaFin: string;
  fecha: string;
  diaSemana: string;
  idEspacio: number;
};

function CardReservation({
  horaInicio,
  horaFin,
  fecha,
  diaSemana,
  idEspacio
}: CardReservationProps) {
  
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/confirm-reservation", {
      state: { diaSemana, horaInicio, horaFin, fecha, idEspacio }
    });
  };

  return (
    <div className="reserva-card">
      <div className="reserva-info">
        <div className="reserva-hora">
          🕒 <strong>{diaSemana}</strong>, {horaInicio} - {horaFin}
        </div>
        <div className="reserva-fecha">{fecha}</div>
      </div>
      <button className="reserva-button" onClick={handleClick}>
        Apartar
      </button>
    </div>
  );
}

export default CardReservation;
