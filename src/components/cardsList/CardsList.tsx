import "./cardsList.css";
import Cards from "../cards/Cards";
import { useEffect, useState } from "react";
import EspacioService, { EspacioDTOResponse } from "../../services/EspacioService.ts";
import SedeService, { SedeDTOResponse } from "../../services/SedeService.ts";

type CardsListProps = {
  category: string; // Este será el 'type', como "Cancha", "Auditorio", etc.
};

function CardsList({ category }: CardsListProps) {
  const [espacios, setEspacios] = useState<EspacioDTOResponse[]>([]); // ajusta el tipo si tienes una interfaz definida
  const [sedes, setSedes] = useState<SedeDTOResponse[]>([]);

  // Cargar espacios al montar el componente
  useEffect(() => {
    EspacioService.listarEspacios()
      .then((response) => {
        setEspacios(response.data);
      })
      .catch((error) => {
        console.error("Error fetching spaces:", error);
      });
  }, []);

  // Cargar sedes al montar el componente
  useEffect(() => {
    SedeService.listarSedes()
      .then((response) => {
        setSedes(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar las sedes:", error);
      });
  }, []);

  const filteredSpaces = espacios.filter((space) => space.tipo === category);
  console.log("Filtered Spaces:", filteredSpaces);
  return (
    <div className="container">
      <div className="row">
        {filteredSpaces.map((space) => (
          <div className="col-md-6 mb-4" key={space.id}>
            <Cards idEspacio={space.id} title={space.nombre} location={
              sedes.find((sede) => sede.id === space.idSede)?.name ||
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
