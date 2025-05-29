import "./ConfirmReservationPage.css";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";

function ConfirmReservationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { dia, horaInicio, horaFin, fecha, idEspacio } = location.state || {};

  const [motivo, setMotivo] = useState("");

  const handleConfirmar = () => {
    // Aquí puedes enviar los datos al backend o mostrar un mensaje
    console.log({ dia, horaInicio, horaFin, fecha, idEspacio, motivo });

    // Simular redirección después de guardar
    alert("Reserva confirmada");
    navigate("/");
  };

  if (!location.state) return <p>Datos no disponibles.</p>;

  return (
    <>
      <Navbar />

      <div className="confirm-reservation-container">
        <h2>Crear reserva</h2>
        <p>
          <strong>Día:</strong> {dia}
        </p>
        <p>
          <strong>Hora:</strong> {horaInicio} - {horaFin}
        </p>
        <p>
          <strong>Fecha:</strong> {fecha}
        </p>
        <p>
          <strong>ID Espacio:</strong> {idEspacio}
        </p>

        <label>Motivo de la reserva:</label>
        <textarea
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
          style={{ width: "100%", height: "100px", marginBottom: "1rem" }}
        />

        <button
          onClick={handleConfirmar}
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "0.75rem 2rem",
            border: "none",
            borderRadius: "10px",
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
          Confirmar Reserva
        </button>
      </div>
    </>
  );
}

export default ConfirmReservationPage;
