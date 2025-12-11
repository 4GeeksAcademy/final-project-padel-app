import { useNavigate } from "react-router-dom";
import "../styles/landing.css";

export const LandingPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/register");
  };

  const handleUnete = () => {
    navigate("/register");
  };

  const handleEmpieza = () => {
    navigate("/register");
  };

  const scrollToHow = () => {
    const element = document.getElementById("how");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* NAVBAR FIXED */}
      <nav className="navbar">
        <div className="navbar-content">
          <div className="logo">MVPadel</div>
          <div className="nav-links">
            <a href="#inicio" className="nav-link">
              Inicio
            </a>
            <a href="#features" className="nav-link">
              Características
            </a>
            <a href="#how" className="nav-link">
              Cómo Funciona
            </a>
            <button className="btn-nav btn-signup" onClick={handleSignup}>
              Registrarse
            </button>
            <button className="btn-nav btn-login" onClick={handleLogin}>
              Iniciar Sesión
            </button>
          </div>
        </div>
      </nav>

      {/* CONTAINER PRINCIPAL CON GRADIENTE FIJO */}
      <div className="landing-container"></div>

      {/* CONTENIDO SCROLLABLE */}
      <div className="scrollable-content">
        {/* HERO SECTION */}
        <section className="hero" id="inicio">
          <div className="hero-content">
            <h1>Juega, Compite, Disfruta</h1>
            <p>
              Conecta con jugadores de padel, participa en torneos y sé parte
              de la comunidad más grande de España
            </p>
            <div className="cta-buttons">
              <button
                className="btn-cta btn-primary"
                onClick={handleUnete}
              >
                Únete Gratis
              </button>
              <button
                className="btn-cta btn-secondary"
                onClick={scrollToHow}
              >
                Descubre Cómo Funciona
              </button>
            </div>
          </div>
        </section>

        {/* CARACTERÍSTICAS */}
        <section className="features-section" id="features">
          <h2 className="section-title">¿Por qué MVPadel?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎾</div>
              <h3>Encuentra Rivales</h3>
              <p>Conecta con jugadores de tu nivel en tu zona y juega cuando quieras</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏆</div>
              <h3>Torneos Exclusivos</h3>
              <p>Participa en torneos semanales y gana premios increíbles</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👥</div>
              <h3>Comunidad Activa</h3>
              <p>Únete a miles de jugadores apasionados por el padel</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Estadísticas</h3>
              <p>Mejora tu juego con análisis detallados de tu desempeño</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Entrenamiento</h3>
              <p>Accede a entrenamientos personalizados de profesionales</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Reservas Fáciles</h3>
              <p>Reserva canchas con descuentos exclusivos para miembros</p>
            </div>
          </div>
        </section>

        {/* CÓMO FUNCIONA */}
        <section className="how-it-works" id="how">
          <h2 className="section-title">Cómo Funciona</h2>
          <div className="steps-container">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Regístrate</h3>
              <p>Crea tu cuenta en menos de 1 minuto</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Completa tu Perfil</h3>
              <p>Comparte tu nivel y preferencias de juego</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Encuentra Amigos</h3>
              <p>Conecta con jugadores compatibles en tu zona</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h3>¡A Jugar!</h3>
              <p>Reserva una cancha y disfruta del mejor padel</p>
            </div>
          </div>
        </section>

        {/* BANNER PROMOCIONAL */}
        <section className="promo-banner">
          <h2>🎁 Promoción Especial</h2>
          <p>
            Primeros 100 usuarios registrados: 1 mes gratis + acceso a todos
            los torneos
          </p>
          <button className="btn-cta btn-primary" onClick={handleUnete}>
            Reclamar Oferta
          </button>
        </section>

        {/* FOOTER */}
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-section">
              <h4>MVPadel</h4>
              <p>La plataforma #1 para jugadores de padel en España</p>
            </div>
            <div className="footer-section">
              <h4>Producto</h4>
              <a href="#features">Características</a>
              <br />
              <a href="#how">Precios</a>
              <br />
              <a href="#inicio">Descargar App</a>
            </div>
            <div className="footer-section">
              <h4>Compañía</h4>
              <a href="#inicio">Sobre Nosotros</a>
              <br />
              <a href="#inicio">Blog</a>
              <br />
              <a href="#inicio">Contacto</a>
            </div>
            <div className="footer-section">
              <h4>Legal</h4>
              <a href="#inicio">Términos</a>
              <br />
              <a href="#inicio">Privacidad</a>
              <br />
              <a href="#inicio">Cookies</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 MVPadel. Todos los derechos reservados. ❤️</p>
          </div>
        </footer>
      </div>
    </>
  );
};