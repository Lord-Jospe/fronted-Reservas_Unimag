import "./loginPage.css";
import logoUnimagdalena from '../../assets/logo-unimagdalena.png';


function LoginPage() {
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
          <input type="text" placeholder="Correo institucional" required />
          <h4>Contraseña</h4>
          <input type="password" placeholder="Contraseña" required />
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
