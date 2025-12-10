// Home.jsx
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>Bienvenido a Padel App</h1>
      <p>Aquí va tu descripción del app...</p>
      
      <div className="button-group">
        <button onClick={() => navigate("/login")} className="btn btn-primary">
          Iniciar Sesión
        </button>
        <button onClick={() => navigate("/registro")} className="btn btn-secondary">
          Registrarse
        </button>
      </div>

      {/* Mostrar Dashboard si estás logueado */}
      <button onClick={() => navigate("/dashboard")} className="btn btn-outline">
        Dashboard
      </button>
    </div>
  );
};
