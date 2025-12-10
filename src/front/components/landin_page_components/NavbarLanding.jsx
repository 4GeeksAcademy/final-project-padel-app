import { useState } from 'react';
import './NavbarLanding.css';

export default function NavbarLanding() {
  const [activeLink, setActiveLink] = useState('inicio');
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { id: 'inicio', label: 'Inicio', href: '#inicio' },
    { id: 'canchas', label: 'Canchas', href: '#canchas' },
    { id: 'torneos', label: 'Torneos', href: '#torneos' },
    { id: 'about', label: 'About', href: '#about' },
    { id: 'comunidad', label: 'Comunidad', href: '#comunidad' },
  ];

  const handleNavClick = (id, e) => {
    e.preventDefault();
    setActiveLink(id);
    setIsOpen(false); // Cierra el menú en mobile
  };

  const handleLogin = (e) => {
    e.preventDefault();
    alert('🎯 Botón Login clickeado. Conecta tu formulario de login aquí.');
  };

  const handleSignup = (e) => {
    e.preventDefault();
    alert('📝 Botón Sign Up clickeado. Conecta tu formulario de registro aquí.');
  };

  return (
    <nav 
      className="navbar navbar-expand-lg navbar-custom"
      aria-label="Navegación principal"
    >
      <div className="container-fluid px-4">
        {/* Logo */}
        <a 
          className="navbar-brand" 
          href="#home"
          aria-label="MVPadel - Inicio"
        >
          <div className="logo-icon">🎾</div>
          <span>MVPadel</span>
        </a>

        {/* Hamburger Button */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={isOpen}
          aria-label="Abrir menú de navegación"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu Items */}
        <div 
          className="collapse navbar-collapse" 
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto">
            {navLinks.map((link) => (
              <li className="nav-item" key={link.id}>
                <a 
                  className={`nav-link ${activeLink === link.id ? 'active' : ''}`}
                  href={link.href}
                  onClick={(e) => handleNavClick(link.id, e)}
                  aria-current={activeLink === link.id ? 'page' : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Auth Buttons */}
          <div className="d-flex gap-2 align-items-center ms-3">
            <a 
              href="#signup" 
              className="btn btn-signup"
              onClick={handleSignup}
              aria-label="Registrarse en MVPadel"
            >
              Sign Up
            </a>
            <a 
              href="#login" 
              className="btn btn-login"
              onClick={handleLogin}
              aria-label="Iniciar sesión en MVPadel"
            >
              <i className="fas fa-sign-in-alt" aria-hidden="true"></i> 
              <span>Login</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
