import { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthProvider";
import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import EstudianteService, {
  EstudianteDTOResponse,
} from "../../services/EstudianteService";
import { jwtDecode } from "jwt-decode";

function UserProfile() {
  const { logout } = useAuth(); // Asegúrate de que `user` esté disponible en tu contexto
  const navigate = useNavigate();
  const [estudiante, setEstudiante] = useState<EstudianteDTOResponse | null>(
    null
  );
  const idEstudiante = Number(localStorage.getItem("idEstudiante"));
  const [correoUsuario, setCorreoUsuario] = useState<string>("");


    //Obtener el usuario autenticado
    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decoded: any = jwtDecode(token);
          setCorreoUsuario(decoded.correo || decoded.sub);
        } catch (error) {
          console.error("Error al decodificar token:", error);
        }
      }
    }, []);

  useEffect(() => {
    if (idEstudiante) {
      EstudianteService.findEstudianteById(Number(idEstudiante))
        .then((res) => {
          setEstudiante(res.data);
          console.log(estudiante);
        })
        .catch((err) => {
          console.error("Error al obtener estudiante:", err);
        });
    }
  }, [idEstudiante, estudiante]);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="card shadow-lg mx-auto" style={{ maxWidth: "600px" }}>
          <div className="card-body text-center">
            <h1 className="card-title text-center mb-4 text-primary">
              Perfil de Usuario
            </h1>

            {/* Foto de perfil */}
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Foto de perfil"
              className="rounded-circle mb-3"
              style={{ width: "120px", height: "120px", objectFit: "cover" }}
            />

            <ul className="list-group list-group-flush mb-4">
              <li className="list-group-item">
                <strong>Correo:</strong> {correoUsuario || "No disponible"}
              </li>
              <li className="list-group-item"></li>
              <li className="list-group-item"></li>
            </ul>

            <div className="text-center">
              <button className="btn btn-danger" onClick={handleLogout}>
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
