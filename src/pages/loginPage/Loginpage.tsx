import "./loginPage.css";
import logoUnimagdalena from '../../assets/logo-unimagdalena.png';
import { useState } from "react";
import { useAuth } from "../../auth/AuthProvider";
import { Navigate } from "react-router-dom";


function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const auth = useAuth();

  if(auth.isAuthenticated) {
    // Si el usuario ya está autenticado, redirigir a la página de inicio
    return <Navigate to="/home" />;
  }
  return (
    <main className="main-login">
      <div className="login-container">
        <img src={logoUnimagdalena} alt="Logo Unimagdalena" className="logo"/>
        <h2>
          Bienvenido a<br />
          <strong>Reservas Unimagdalena</strong>
        </h2>
        <p>Ingresa con tu cuenta institucional</p>
        <form>
          <h4>Correo institucional</h4>
          <input type="text" placeholder="Correo institucional" value={username} onChange={(e) => setUsername(e.target.value)} required />
          <h4>Contraseña</h4>
          <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)}required />
          <div className="options">
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
