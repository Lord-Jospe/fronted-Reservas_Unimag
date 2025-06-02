import { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./studentPanelPage.css";

function StudentPanelPage() {
  
   const [selectedCategory, setSelectedCategory] = useState("Mis Reservas");
  
  
    const options = [
      "Mis Reservas",
      "Reportes de problemas",
      "Notificaciones",
      "Configuración",
    ];

  return (
    <>
    <Navbar/>
    <div className="contenedor-principal">
      <Sidebar onSelectCategory={setSelectedCategory}
          selected={selectedCategory}
          options={options}/>

      <div className="contenedor-contenido">
        <h3>
          {selectedCategory}
        </h3>
      </div>
    </div>
    </>
  );
}

export default StudentPanelPage;