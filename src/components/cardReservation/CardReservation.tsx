import { useNavigate } from "react-router-dom";
import "./cardReservation.css"



type CardReservationProps = {
  horaInicio: string;
  horaFin: string;
  diaSemana: string;
  idEspacio: number;
  nombreSede: string;
};

function CardReservation({
  horaInicio,
  horaFin,
  diaSemana,
  idEspacio,
  nombreSede
}: CardReservationProps) {
  
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/reservation-formPage", {
      state: { diaSemana, horaInicio, horaFin, idEspacio, nombreSede} 
    });
  };

  return (
    <div className="reserva-card">
      <div className="reserva-info">
        <div className="reserva-hora">
          🕒 <strong>{diaSemana}</strong>, {horaInicio} - {horaFin}
        </div>
      </div>
      <button className="reserva-button" onClick={handleClick}>
        Apartar
      </button>
    </div>
  );
}

export default CardReservation;
