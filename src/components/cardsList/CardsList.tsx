import "./cardsList.css";
import Cards from "../cards/Cards";
import spaces from "../../services/spaces.ts";
import { useEffect, useState } from "react";
import EspacioService from "../../services/EspacioService.ts";

interface Espacio {
  id: number;
  nombre: string;
  tipo: string;
  restricciones: string;
  idSede: number;
  disponible: boolean;
}

type CardsListProps = {
  category: string; // Este será el 'type', como "Cancha", "Auditorio", etc.
};

function CardsList({ category }: CardsListProps) {
  const [espacios, setEspacios] = useState<Espacio[]>([]); // ajusta el tipo si tienes una interfaz definida

  useEffect(() => {
    EspacioService.getAllEspacios()
      .then((response) => {
        setEspacios(response.data);
      })
      .catch((error) => {
        console.error("Error fetching spaces:", error);
      });
  }, []);


  const filteredSpaces = espacios.filter((space) => space.tipo === category);

  return (
    <div className="container">
      <div className="row">
        {filteredSpaces.map((space) => (
          <div className="col-md-6 mb-4" key={space.id}>
            <Cards
              id={space.id}
              title={space.nombre}
              location={space.idSede}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardsList;
