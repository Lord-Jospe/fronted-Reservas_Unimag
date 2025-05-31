import { useEffect, useState } from "react";
import "./homePage.css";
import CardsList from "../../components/cardsList/CardsList";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import SedeService from "../../services/SedeService";

const categoryMap: Record<string, string> = {
  Canchas: "Cancha",
  Auditorios: "Auditorio",
  Cubículos: "Cubículo",
  Salones: "Salon",
  "Zonas comunes": "zona común",
  "Salones de Audiovisuales": "salon de audiovisuales",
};

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState("Canchas");

  useEffect(() => {
    // Aquí podrías cargar datos iniciales si es necesario
    // Por ejemplo, cargar las sedes o espacios disponibles
    SedeService.getAllSedes()
      .then((response) => {
        console.log("Sedes cargadas:", response.data);
      })
      .catch((error) => {
        console.error("Error al cargar las sedes:", error);
      });
  });
  const options = [
    "Canchas",
    "Auditorios",
    "Cubículos",
    "Salones",
    "Zonas comunes",
    "Salones de Audiovisuales",
  ];

  return (
    <div className="navbar-container">
      {/* Navbar arriba */}
      <Navbar />

      {/* Contenedor principal con Sidebar y contenido */}
      <section className="main-container">
        <Sidebar
          onSelectCategory={setSelectedCategory}
          selected={selectedCategory}
          options={options}
        />
        <div className="content-container">
          <h3 className="title-content">{selectedCategory}</h3>
          <CardsList category={categoryMap[selectedCategory]} />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
