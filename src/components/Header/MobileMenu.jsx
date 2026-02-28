// src/components/Header/MobileMenu.jsx
import React from 'react';

const MobileMenu = ({ isOpen, onClose }) => {
  const handleLinkClick = (e) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href');
    
    if (targetId === '#') return;
    
    // Si es un enlace interno (ej: #destinos)
    if (targetId.startsWith('#')) {
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({ 
          top: targetElement.offsetTop - 70, 
          behavior: 'smooth' 
        });
      }
    } else {
      // Para GitHub Pages con HashRouter, los enlaces deben incluir #
      window.location.href = targetId;
    }
    
    onClose();
  };

  return (
    <div className={`mobile-menu ${isOpen ? 'open' : ''}`} id="mobileMenu">
      <ul className="mobile-nav-links">
        {/* CAMBIADO: /terminos → #/terminos */}
        <li><a href="#/terminos" onClick={handleLinkClick}>Términos y Condiciones</a></li>
        {/* CAMBIADO: /privacidad → #/privacidad */}
        <li><a href="#/privacidad" onClick={handleLinkClick}>Políticas de Privacidad</a></li>
        <li><a href="#destinos" onClick={handleLinkClick}>Algunos destinos</a></li>
        <li><a href="#servicios" onClick={handleLinkClick}>Nuestros servicios</a></li>
        <li><a href="#reservas" onClick={handleLinkClick}>Reservas</a></li>
        <li><a href="#sobre-nosotros" onClick={handleLinkClick}>Sobre nosotros</a></li>
        <li><a href="#contacto" onClick={handleLinkClick}>Contacto</a></li>
      </ul>
    </div>
  );
};

export default MobileMenu;