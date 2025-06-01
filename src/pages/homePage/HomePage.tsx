import { useState } from "react";
import "./homePage.css";
import CardsList from "../../components/cardsList/CardsList";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";


const categoryMap: Record<string, string> = {
  Canchas: "CANCHAS",
  Auditorios: "AUDITORIOS",
  Cubículos: "CUBÍCULOS",
  Salones: "SALONES",
  "Zonas comunes": "ZONAS_COMUNES",
  "Salones de Audiovisuales": "SALONES_AUDIVISUALES",
};

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState("Canchas");


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
