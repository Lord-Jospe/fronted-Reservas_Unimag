import "./cardsList.css";
import Cards from "../cards/Cards";
import spaces from "../../services/spaces.ts";
import { useEffect } from "react";
import EspacioService from "../../services/EspacioService.ts";


type CardsListProps = {
  category: string; // Este será el 'type', como "Cancha", "Auditorio", etc.
};

function CardsList({ category }: CardsListProps) {
    
    const filteredSpaces = spaces.filter(space => space.type === category);


  useEffect(() => {
    EspacioService.getAllEspacios().then((response) => {console.log(response.data);})
    .catch((error) => {console.error("Error fetching spaces:", error)})
  });


    return (
    <div className="container">
      <div className="row">
        {filteredSpaces.map((space) => (
          <div className="col-md-6 mb-4" key={space.id}>
            <Cards
              id={space.id}
              title={space.title}
              location={space.location}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardsList;
