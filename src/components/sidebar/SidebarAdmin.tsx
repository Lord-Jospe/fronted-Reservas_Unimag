import './sidebarAdmin.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import image from "../../assets/admin.jpg";


type SidebarAdminProps = {
  correo: string;
  nombre: string;
};

function SidebarAdmin({ correo, nombre}: SidebarAdminProps) {

   return (
    <aside className="sidebar">
      <ul className="menu">
        <li className='active'>{nombre}</li>
      </ul>
      <p>{correo}</p>
      <div className='container-image'>
        <img className="image-content-admin" src={image} alt="admin" />
      </div>

    </aside>
  );
}

export default SidebarAdmin;
