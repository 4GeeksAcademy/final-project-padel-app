import "./login.css";

export default function Login() {
  return (
    <div className="login-bg">
      <div className="login-card">
        <h1 className="login-title">INICIAR SESIÓN</h1>

        <p className="login-subtitle">¡Bienvenido de nuevo!</p>

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
          <a href="/forgot-password">¿Olvidaste tu contraseña?</a>
        </div>

        <button className="btn">Entrar</button>

        <p className="register">
          ¿No tienes cuenta?{" "}
          <a href="/register" className="register-link">
            Regístrate
          </a>
        </p>
      </div>
    </div>
  );
}
