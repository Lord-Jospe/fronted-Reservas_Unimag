// SpaceDetail.tsx
import "./spaceDetail.css";
import { useParams } from "react-router-dom";
import spaces from "../../services/spaces.ts";
import Navbar from "../../components/navbar/Navbar.tsx";
import image from "../../assets/canchasMax.png";
import TimeSelector from "../../components/timeSelector/TimeSelector.tsx";
import space_schedule from "../../services/space_schedule.ts";
import CardReservation from "../../components/cardReservation/CardReservation.tsx";
import { useState } from "react";

function SpaceDetail() {
  const { id } = useParams();
  const space = spaces.find((s) => s.id === Number(id));
  const schedules = space_schedule.filter((s) => s.idEspacio === Number(id));

  const [diaFiltrado, setDiaFiltrado] = useState<string>("LUNES");

  if (!space) return <h2>Espacio no encontrado</h2>;

  const horariosFiltrados = schedules.filter((s) => s.dia.toUpperCase() === diaFiltrado);
  console.log(space);
  return (
    <div>
      <Navbar />
      <main className="space-detail-container">
        <div className="image-container">
          <img src={image} alt="foto_espacio" className="image" />
          <div className="image-overlay">
            <h1 className="image-title">{space.title}</h1>
            <button className="button-reporter">Reportar problema</button>
            <button className="button-restriction">Restricciones del lugar</button>
          </div>
        </div>

        <section className="section-container">
          <div className="space-card">
            <h4>{space.title}</h4>
            <div className="info-tags">
              <div>📍 {space.location}</div>
              <div>👥 Para 2 equipos de 5 jugadores</div>
              <div>📏 24x10 metros</div>
              <div>🏀 Suelo de cemento pulido</div>
            </div>
          </div>

          <TimeSelector onChangeDiaActivo={setDiaFiltrado} />

          <div className="space-card">
            <h4>Horarios disponibles para {diaFiltrado.toLowerCase()}</h4>
            {horariosFiltrados.length === 0 ? (
              <p>No hay horarios disponibles.</p>
            ) : (
              horariosFiltrados.map((schedule, idx) => (
                <CardReservation
                  key={idx}
                  horaInicio={schedule.horarioInicio}
                  horaFin={schedule.horarioFin}
                  diaSemana={schedule.dia}
                  idEspacio={space.id} />
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default SpaceDetail;
