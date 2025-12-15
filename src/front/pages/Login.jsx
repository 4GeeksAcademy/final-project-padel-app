import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.jsx";
import { useState } from "react";
import "../styles/login.css"; 

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Ingresa un email válido");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      if (!remember) {}
      navigate("/dashboard");
    } catch (err) {
      setError("Usuario o contraseña incorrecta");
    } finally {
      setLoading(false);
    }
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
          <input name="email" type="text" placeholder="Ingresa tu email" required className="input" />
          <label className="label">
            Contraseña <span className="required">*</span>
          </label>
          <div className="password-wrapper">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              required
              className="input password-input"
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
              style={{ cursor: "pointer" }}
            >
              {showPassword ? "👁️" : "🙈"}
            </span>
          </div>
          {error && (
            <div className="input-error-message">
              <span className="error-icon">⚠️</span> 
              {error}
            </div>
          )}
          <div className="remember">
            <input 
              type="checkbox" 
              className="checkbox" 
              checked={remember}
              onChange={() => setRemember(!remember)}
            />
            <label className="label">Recordarme</label>
          </div>
          <div className="forgot">
            <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
          </div>
          <button className="btnl" type="submit" disabled={loading}>
            {loading ? "Cargando..." : "Entrar"}
          </button>
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
