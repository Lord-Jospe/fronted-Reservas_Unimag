import "./ConfirmReservationPage.css";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";

import { Espacio } from "../../pages/SpaceDetail/SpaceDetail";
import EspacioService from "../../services/EspacioService";

//Función para obtener la fecha actual en formato YYYY-MM-DD
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
  const { dia, horaInicio, horaFin, idEspacio, nombreSede } = location.state || {};
  const [motivo, setMotivo] = useState("");


  const [space, setSpace] = useState<Espacio | null>(null);

 useEffect(() => {
    const fetchData = async () => {
      if (!idEspacio) return;

      try {
        const espacioRes = await EspacioService.getEspacioById(Number(idEspacio));
        const espacioData: Espacio = espacioRes.data;
        setSpace(espacioData);
      } catch (error) {
        console.error("Error al obtener el espacio:", error);
      }
    };
        fetchData();
  }, [idEspacio]);


  const handleConfirmar = () => {
    // Aquí puedes enviar los datos al backend o mostrar un mensaje
    console.log({ dia, horaInicio, horaFin, idEspacio, motivo });

    // Simular redirección después de guardar
    alert("Reserva confirmada");
    navigate("/");
  };

  if (!location.state) return <p>Datos no disponibles.</p>;
  if (!space) return <p>Espacio no encontrado.</p>;

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
