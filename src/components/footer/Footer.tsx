import "./footer.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';


function Footer() {
  return (
    <footer className="custom-footer py-3 my-4">
      <ul className="nav justify-content-center border-bottom pb-3 mb-3">
        <li className="nav-item">
          <a href="/home" className="nav-link px-2 text-body-secondary">
            Home
          </a>
        </li>
        <li className="nav-item">
          <FontAwesomeIcon icon={faGithub} />
          <a href="#" className="nav-link px-2 text-body-secondary">
            Acerca de nosotros
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link px-2 text-body-secondary">
            Pricing
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link px-2 text-body-secondary">
            FAQs
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link px-2 text-body-secondary">
            About
          </a>
        </li>
      </ul>
      <p className="text-center text-body-secondary">© 2025 Joseph Ferrer </p>
    </footer>
  );
}

export default Footer;
