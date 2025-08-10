// TimeSelector.tsx
import React, { useState, useEffect } from "react";
import "./TimeSelector.css";

interface TimeSelectorProps {
  onChangeDiaActivo: (dia: string) => void;
}

const TimeSelector: React.FC<TimeSelectorProps> = ({ onChangeDiaActivo }) => {
  const diasDeLaSemana = [
    "LUNES",
    "MARTES",
    "MIÉRCOLES",
    "JUEVES",
    "VIERNES",
    "SÁBADO",
    "DOMINGO",
  ];
  const franjas = ["Mañana", "Tarde", "Noche"];

  const [diaActivo, setDiaActivo] = useState<string>(diasDeLaSemana[0]);
  const [franjaActiva, setFranjaActiva] = useState<string>("MAÑANA");
  //const [slotSeleccionado, setSlotSeleccionado] = useState<string | null>(null);

  useEffect(() => {
    onChangeDiaActivo(diaActivo); // Notifica al padre
  }, [diaActivo]);

  return (
    <div className="time-selector">
      {/* Días */}
      <div className="segmentos">
        {diasDeLaSemana.map((dia) => (
          <span
            key={dia}
            className={`segmento ${diaActivo === dia ? "activo" : ""}`}
            onClick={() => {
              setDiaActivo(dia);
              //setSlotSeleccionado(null);
            }}
          >
            {dia}
          </span>
        ))}
      </div>

      <div className="linea-progreso">
        <div
          className="barra-activa"
          style={{
            left: `${diasDeLaSemana.indexOf(diaActivo) * (100 / diasDeLaSemana.length)}%`,
          }}
        />
      </div>

      {/* Franja */}
      <div className="time-slots">
        {franjas.map((franja) => (
          <div
            key={franja}
            className={`time-slot ${franjaActiva === franja ? "selected" : ""}`}
            onClick={() => setFranjaActiva(franja)}
          >
            {franja}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeSelector;
