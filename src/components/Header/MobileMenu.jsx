// src/components/Header/MobileMenu.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const MobileMenu = ({ isOpen, onClose }) => {

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 70,
        behavior: 'smooth'
      });
    }
    onClose();
  };

  return (
    <div className={`mobile-menu ${isOpen ? 'open' : ''}`} id="mobileMenu">
      <ul className="mobile-nav-links">

        {/* RUTAS REALES (HashRouter las maneja automáticamente) */}
        <li>
          <Link to="/terminos" onClick={onClose}>
            Términos y Condiciones
          </Link>
        </li>

        <li>
          <Link to="/privacidad" onClick={onClose}>
            Políticas de Privacidad
          </Link>
        </li>

        {/* SCROLL INTERNO EN MISMA PÁGINA */}
        <li>
          <button onClick={() => handleScroll('destinos')}>
            Algunos destinos
          </button>
        </li>

        <li>
          <button onClick={() => handleScroll('servicios')}>
            Nuestros servicios
          </button>
        </li>

        <li>
          <button onClick={() => handleScroll('reservas')}>
            Reservas
          </button>
        </li>

        <li>
          <button onClick={() => handleScroll('sobre-nosotros')}>
            Sobre nosotros
          </button>
        </li>

        <li>
          <button onClick={() => handleScroll('contacto')}>
            Contacto
          </button>
        </li>

      </ul>
    </div>
  );
};

export default MobileMenu;