import { useNavigate } from "react-router-dom";

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      
      <div className="button-group">
        <button onClick={() => navigate("/login")} className="btn btn-primary">
          Iniciar Sesión
        </button>
        <button onClick={() => navigate("/register")} className="btn btn-secondary">
          Registrarse
        </button>
      </div>
    </div>
  );
};