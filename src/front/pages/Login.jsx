import { useNavigate, Link } from "react-router-dom";
import "../styles/login.css"

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to verify credentials would go here
    // For now, redirect to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="login-bg">
      <div className="login-card">
        <h1 className="login-title">INICIAR SESIÓN</h1>

        <p className="login-subtitle">¡Bienvenido de nuevo!</p>

        <form onSubmit={handleSubmit}>
          <label className="label">
            Email <span className="required">*</span>
          </label>
          <input type="text" placeholder="Ingresa tu email" required className="input" />

          <label className="label">
            Contraseña <span className="required">*</span>
          </label>
          <input type="password" placeholder="••••••••" required className="input" />

          <div className="rules">
            <div>Mínimo 8 caracteres</div>
            <div>Al menos una letra mayúscula</div>
            <div>Debe incluir un símbolo @, #, !, etc.</div>
          </div>

          <div className="remember">
            <input type="checkbox" className="checkbox" />
            <label className="label">Recordarme</label>
          </div>

          <div className="forgot">
            <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
          </div>

          <button className="btnl" type="submit">Entrar</button>
        </form>

        <p className="register">
          ¿No tienes cuenta?{" "}
          <Link to="/register" className="register-link">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
}
