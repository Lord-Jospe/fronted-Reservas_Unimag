import "./ConfirmReservationPage.css";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import spaces from "../../services/EspacioService";

function obtenerFechaActual(): string {
  const hoy = new Date();
  const dia = String(hoy.getDate()).padStart(2, "0");
  const mes = String(hoy.getMonth() + 1).padStart(2, "0");
  const anio = hoy.getFullYear();

  return `${anio}-${mes}-${dia}`;
}

function ConfirmReservationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { dia, horaInicio, horaFin, fecha, idEspacio } = location.state || {};

  const [motivo, setMotivo] = useState("");
  const space = spaces.find((s) => s.id === Number(idEspacio));
  if (!space) return <p>Espacio no encontrado.</p>;

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
        <div className="title-content">
          <h1>Confirmar Reserva</h1>
        </div>
        <div className="form-content">
          <div className="form-row">
            <h4>Tipo</h4>
            <input type="text" value={space.type} disabled />
          </div>
          <div className="form-row">
            <h4>Sede</h4>
            <input type="text" value={space.location} disabled />
          </div>

          <div className="form-row">
            <h4>Nombre</h4>
            <input type="text" value={space.title} disabled />
          </div>
          <div className="form-row">
            <h4>Fecha</h4>
            <input type="date" min={obtenerFechaActual()} />
          </div>
        </div>
        <div className="horario-content">
          <h4>Horarios Disponible en esa fecha</h4>
          {/*Poner aca la logica de mostrar los horarios disponible para el idEspacio*/}
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
