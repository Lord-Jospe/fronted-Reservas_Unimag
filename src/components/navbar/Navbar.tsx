import "./navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../auth/AuthProvider";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { role } = useAuth(); // Accede al rol del usuario
  const navigate = useNavigate();

  const handleTitleClick = () => {
    if (role === "ADMINISTRADOR") {
      navigate("/admin/dashboard");
    } else {
      navigate("/home");
    }
  };
  return (
    <header className="custom-navbar d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
      <a
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
        style={{ cursor: "pointer" }}
        onClick={handleTitleClick}
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
        {/* Solo se muestra si el usuario es ESTUDIANTE */}
        {role === "ESTUDIANTE" && (
          <li className="nav-item">
            <a
              href="/student-panel"
              className="nav-link active"
              aria-current="page"
            >
              <FontAwesomeIcon icon={faBell} />
            </a>
          </li>
        )}
        <li className="nav-item">
          <a href="/profile" className="nav-link active" aria-current="page">
            <FontAwesomeIcon icon={faUser} />
          </a>
        </li>
      </ul>
    </header>
  );
}

export default Navbar;
