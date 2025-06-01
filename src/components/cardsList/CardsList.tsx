import "./cardsList.css";
import Cards from "../cards/Cards";
import { useEffect, useState } from "react";
import EspacioService from "../../services/EspacioService.ts";
import SedeService from "../../services/SedeService.ts";

interface Espacio {
  id: number;
  nombre: string;
  tipo: string;
  restricciones: string;
  idSede: number;
  disponible: boolean;
}

interface Sede {
  id: number;
  nombre: string;
}

type CardsListProps = {
  category: string; // Este será el 'type', como "Cancha", "Auditorio", etc.
};

function CardsList({ category }: CardsListProps) {
  const [espacios, setEspacios] = useState<Espacio[]>([]); // ajusta el tipo si tienes una interfaz definida
  const [sedes, setSedes] = useState<Sede[]>([]);

  // Cargar espacios al montar el componente
  useEffect(() => {
    EspacioService.getAllEspacios()
      .then((response) => {
        setEspacios(response.data);
      })
      .catch((error) => {
        console.error("Error fetching spaces:", error);
      });
  }, []);

  // Cargar sedes al montar el componente
  useEffect(() => {
    SedeService.getAllSedes()
      .then((response) => {
        setSedes(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar las sedes:", error);
      });
  }, []);

  const filteredSpaces = espacios.filter((space) => space.tipo === category);

  return (
    <div className="container">
      <div className="row">
        {filteredSpaces.map((space) => (
          <div className="col-md-6 mb-4" key={space.id}>
            <Cards id={space.id} title={space.nombre} location={
              sedes.find((sede) => sede.id === space.idSede)?.nombre ||
              "Sede desconocida"
              } 
              />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardsList;
