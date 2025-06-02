// SpaceDetail.tsx
import "./spaceDetail.css";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar.tsx";
import image from "../../assets/canchasMax.png";
import TimeSelector from "../../components/timeSelector/TimeSelector.tsx";
import CardReservation from "../../components/cardReservation/CardReservation.tsx";
import { useEffect, useState } from "react";
import HorarioEspacioService from "../../services/HorarioEspacioService.ts";
import EspacioService, { EspacioDTOResponse } from "../../services/EspacioService.ts";
import SedeService, { SedeDTOResponse } from "../../services/SedeService.ts";

interface HorarioEspacio {
  idHorarioEspacio: number;
  dia: string;
  horaInicio: string;
  horaFin: string;
  idEspacio: number;
}

// Inverso del anterior (español → inglés)
const diasInverso: { [key: string]: string } = {
  LUNES: "MONDAY",
  MARTES: "TUESDAY",
  MIÉRCOLES: "WEDNESDAY",
  JUEVES: "THURSDAY",
  VIERNES: "FRIDAY",
  SÁBADO: "SATURDAY",
  DOMINGO: "SUNDAY",
};

function SpaceDetail() {
  const { idEspacio } = useParams<{ idEspacio: string }>();
  const [space, setSpace] = useState<EspacioDTOResponse | null>(null);
  const [schedules, setSchedules] = useState<HorarioEspacio[]>([]);
  const [sede, setSede] = useState<SedeDTOResponse | null>(null);
  const [diaFiltrado, setDiaFiltrado] = useState<string>("LUNES");
  const [loading, setLoading] = useState(true);
const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!idEspacio) return;

      try {
        const espacioRes = await EspacioService.obtenerEspacio(Number(idEspacio));
        const espacioData: EspacioDTOResponse = espacioRes.data;
        setSpace(espacioData);

        const [horariosRes, sedeRes] = await Promise.all([
          HorarioEspacioService.getHorariosPorEspacio(Number(idEspacio)),
          SedeService.getSedeById(espacioData.idSede),
        ]);

        setSchedules(horariosRes.data);
        setSede(sedeRes.data);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [idEspacio]);

  if (loading) return <h2>Cargando...</h2>;
  if (!space) return <h2>Espacio no encontrado</h2>;

  const nombreSede = sede ? sede.name : "Cargando sede...";

  console.log("Horarios sin filtrar:", schedules);
  const diaEnIngles = diasInverso[diaFiltrado.toUpperCase()];
  const horariosFiltrados = schedules.filter(
    (s) => s.dia.toUpperCase() === diaEnIngles
  );
  console.log("HoraioEspacio:", horariosFiltrados);

  return (
    <div>
      <Navbar />
      <main className="space-detail-container">
        <div className="image-container">
          <img src={image} alt="foto_espacio" className="image" />
          <div className="image-overlay">
            <h1 className="image-title">{space.nombre}</h1>
            <button className="button-reporter" onClick={() => navigate("/report-problem", { state: { space, nombreSede } })}>Reportar problema</button>
          </div>
        </div>

        <section className="section-container">
          <div className="space-card">
            <h4>{space.nombre}</h4>
            <div className="info-tags">
              <div>📍 {nombreSede}</div>
              <div>👥 Tipo: {space.tipo}</div>
              <div>ℹ️ Restricciones: {space.restricciones}</div>
              <div>✅ Disponible: {space.disponible ? "Sí" : "No"}</div>
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
                  key={schedule.idHorarioEspacio || idx}
                  horaInicio={schedule.horaInicio}
                  horaFin={schedule.horaFin}
                  diaSemana={schedule.dia}
                  idEspacio={space.id}
                  nombreSede={nombreSede}
                />
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default SpaceDetail;
