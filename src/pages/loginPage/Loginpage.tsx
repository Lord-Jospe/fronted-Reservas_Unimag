import "./loginPage.css";
import logoUnimagdalena from "../../assets/logo-unimagdalena.png";
import React, { useState } from "react";
import { useAuth } from "../../auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import UsuarioService from "../../services/UsuarioService";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await UsuarioService.loginUsuario(username, password);
      const token = response.data.token;
      const role = response.data.rol;
      const idEstudiante = response.data.idEstudiante;

      if (!idEstudiante) {
      setError("No se pudo obtener el ID del estudiante");
      return;
      }

      //Luego comentar esto
      console.log("Login exitoso:", role);
      console.log("Token:", token);
      console.log("ID del usuario:", idEstudiante);

      auth.login(token, role, idEstudiante);

      setTimeout(() => {
        if (role === "ADMINISTRADOR" && idEstudiante < 0) {
          navigate("/admin/dashboard");
        } else if (role === "ESTUDIANTE" && idEstudiante > 0) {
          navigate("/home");
        } else {
          setError("Rol no válido");
        }
      }, 50); // 50 milisegundos es suficiente
    } catch (error) {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <main className="main-login">
      <div className="login-container">
        <img src={logoUnimagdalena} alt="Logo Unimagdalena" className="logo" />
        <h2>
          Bienvenido a<br />
          <strong>Reservas Unimagdalena</strong>
        </h2>
        <p>Ingresa con tu cuenta institucional</p>

        <form onSubmit={handleLogin}>
          <h4>Correo institucional</h4>
          <input
            type="text"
            placeholder="Correo institucional"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <h4>Contraseña</h4>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="options">
            {error && <p style={{ color: "red" }}>{error}</p>}

            <a href="#">¿Olvidó su contraseña?</a>
          </div>
          <button type="submit">Ingresar</button>
        </form>
        <p>
          No tienes ninguna cuenta? <a href="/register">Registrate aquí</a>
        </p>
      </div>
    </main>
  );
}

export default LoginPage;
