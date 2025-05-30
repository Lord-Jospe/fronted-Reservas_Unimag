import "./loginPage.css";
import logoUnimagdalena from "../../assets/logo-unimagdalena.png";
import { useState } from "react";
import { useAuth } from "../../auth/AuthProvider";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const role = auth.login(username, password);
    console.log("Rol del usuario:", role);
    if (!role) {
      setError("Correo o contraseña incorrectos.");
    } else if (role === "ADMINISTRADOR") {
      navigate("/admin/dashboard");
    } else if (role === "ESTUDIANTE") {
      navigate("/home");
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
        <form onSubmit={handleSubmit}>
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
