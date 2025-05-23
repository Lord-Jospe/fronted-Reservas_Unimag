import './sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="search-box">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        <input type="text" placeholder="Buscar" />
      </div>
      <ul className="menu">
        <li className="active">Canchas</li>
        <li>Auditorios</li>
        <li>Cubículos</li>
        <li>Salones</li>
        <li>Zonas comunes</li>
        <li>Salones de Audiovisuales</li>
      </ul>
    </aside>
  );
}

export default Sidebar;
