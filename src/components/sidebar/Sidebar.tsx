import './sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

type SidebarProps = {
  onSelectCategory: (category: string) => void;
  selected: string;
};

function Sidebar({ onSelectCategory, selected }: SidebarProps) {
  const options = [
    "Canchas",
    "Auditorios",
    "Cubículos",
    "Salones",
    "Zonas comunes",
    "Salones de Audiovisuales"
  ];
  
  return (
    <aside className="sidebar">
      <div className="search-box">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        <input type="text" placeholder="Buscar" />
      </div>
      <ul className="menu">
        {options.map((item) => (
          <li
            key={item}
            className={selected === item ? "active" : ""}
            onClick={() => onSelectCategory(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
