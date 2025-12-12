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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    setError(null);
    setLoading(true);

    try {
      const data = await login(email, password);

      // Si "recordarme" no está marcado, puedes eliminar el token al cerrar sesión
      if (!remember) {
        //configurar lógica de sesión temporal
      }

      navigate("/dashboard"); // Redirige al dashboard si todo OK
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
          <input name="password" type="password" placeholder="••••••••" required className="input" />
          
          {error && (
            <div className="input-error-message">
              <span className="error-icon">⚠️</span> 
              {error}
            </div>
          )}

          <div className="rules">
            <div>Mínimo 8 caracteres</div>
            <div>Al menos una letra mayúscula</div>
            <div>Debe incluir un símbolo @, #, !, etc.</div>
          </div>

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