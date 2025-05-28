import "./cards.css";
import { MapPin } from "lucide-react";
import image from "../../assets/canchas.png";
type SpaceCardProps = {
  title: string;

  location: string;
};

function Cards({ title, location }: SpaceCardProps) {
    return (
    <div className="card-container ">
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