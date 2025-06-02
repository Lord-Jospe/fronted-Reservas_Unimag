import "./ProblemPage.css";
import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import image from "../../assets/reporter-problem.png";
import { useLocation, useNavigate } from "react-router-dom";
import { EspacioDTOResponse } from "../../services/EspacioService";
import ProblemaEstudianteService from "../../services/ProblemaEstudianteService";

function ProblemPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const space: EspacioDTOResponse = location.state?.space;
  const nombreSede: string = location.state?.nombreSede || "Sede no disponible";

  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const idEstudiante = localStorage.getItem("idEstudiante");
    if (!idEstudiante) {
      alert("No se encontró el ID del estudiante.");
      return;
    }

    try {
      await ProblemaEstudianteService.crearProblema(Number(idEstudiante), {
        idEspacio: space.id,
        estado: "PENDIENTE",
        descripcion,
        fecha,
        idEsdtudiante: Number(idEstudiante),
      });

      alert("Problema reportado exitosamente.");
      navigate("/home"); // O redirige donde quieras
    } catch (error) {
      console.error("Error al crear el problema:", error);
      alert("Ocurrió un error al enviar el reporte.");
    }
  };

  if (!space) return <p>Datos del espacio no disponibles.</p>;

  console.log("Espacio recibido:", space);
  return (
    <>
      <Navbar />
      <main className="space-detail-container">
        <div className="image-container">
          <img src={image} alt="foto_espacio" className="image" />
          <div className="image-overlay">
            <h3>Reportar un problema</h3>
          </div>
        </div>
        <div className="section-container">
          <div className="space-card">
            <form onSubmit={handleSubmit}>
              <h4>Formulario de reporte</h4>
              <div className="form-row">
                <label>Nombre</label>
                <input type="text" value={space.nombre} disabled />
              </div>
              <div className="form-row">
                <label>Sede</label>
                <input type="text" value={nombreSede} disabled />
              </div>

              <div className="form-group">
                <label htmlFor="descripcion">Descripción del problema:</label>
                <textarea
                  name="descripcion"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="fecha">Fecha del problema:</label>
                <input
                  type="date"
                  id="fecha"
                  name="fecha"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="button-reporter">
                Enviar reporte
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

export default ProblemPage;
