import "./navbar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-solid-svg-icons';


function Navbar() {
  return (
    <header className="custom-navbar d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
      <a
        href="/home"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
      >
        <svg
          className="bi me-2"
          width="40"
          height="32"
          aria-hidden="true"
        ></svg>
        <span className="fs-4">Reservas Unimagdalena</span>
      </a>
      <ul className="nav nav-pills">
        {/* Añadir el hola "nombre de estudiante"*/}
        <li className="nav-item">
          <a href="#" className="nav-link active" aria-current="page">
            <FontAwesomeIcon icon={faBell} />
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link active" aria-current="page">
            <FontAwesomeIcon icon={faUser} />
          </a>
        </li>
      </ul>
    </header>
  );
}

export default Navbar;
