// src/components/Hero/Hero.jsx
import React from 'react';
import './Hero.css';

const Hero = () => {
  const handleReservarClick = (e) => {
    e.preventDefault();
    const reservasSection = document.getElementById('reservas');
    if (reservasSection) {
      window.scrollTo({
        top: reservasSection.offsetTop - 70,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header 
      className="hero" 
      style={{ backgroundImage: "url('/img/piura_fondo.png')" }}
    >
      <div className="container hero-content">
        <h1>La tranquilidad en tu traslado no tiene precio</h1>
        <p className="lead">YipiAs es la plataforma de ingenierìa de enlace que conecta tu necesidad de movilidad con conductores profesionales. Seguridad, puntualidad y respeto en cada kilómetro, superando el estándar de las aplicaciones convencionales</p>
        <a 
          className="btn btn-red" 
          href="#reservas"
          onClick={handleReservarClick}
        >
          Reservar ahora
        </a>
      </div>
    </header>
  );
};

export default Hero;