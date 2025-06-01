import "./cards.css";
import { MapPin } from "lucide-react";
import image from "../../assets/canchas.png";
import { useNavigate } from "react-router-dom";

//Propos de espacios para el componente Cards
type SpaceCardProps = {
  id: number;
  title: string;
  location: string;
};

function Cards({ id, title, location }: SpaceCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/space/${id}`);
  };

  return (
    <div
      className="card-container"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <img src={image} alt={title} className="image-content" />
      <div className="card-content">
        <h3 className="title-content">{title} </h3>
        <div className="location-icon">
          <MapPin className="w-5 h-5 mr-2" />
          {location}
        </div>
      </div>
    </div>
  );
}

export default Cards;
