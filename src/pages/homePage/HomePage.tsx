import { useEffect, useState } from "react";
import "./homePage.css";
import CardsList from "../../components/cardsList/CardsList";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import EspacioService from "../../services/EspacioService";

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
    EspacioService.getAllEspacios()
      .then((response) => {
        console.log("Espacios obtenidos:", response.data);
      })
      .catch((error) => {
        console.error("Error al obtener espacios:", error);
      });
  }, []);
  
  const options = [
      "Canchas",
      "Auditorios",
      "Cubículos",
      "Salones",
      "Zonas comunes",
      "Salones de Audiovisuales"
    ];
  return (
    <div className="navbar-container">
      {/* Navbar arriba */}
      <Navbar />

      {/* Contenedor principal con Sidebar y contenido */}
      <section className="main-container">
        <Sidebar onSelectCategory={setSelectedCategory} selected={selectedCategory} options={options} />
        <div className="content-container">
          <h3 className="title-content">{selectedCategory}</h3>
          <CardsList category={categoryMap[selectedCategory]} />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
