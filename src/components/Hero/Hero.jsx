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
        <h1>Explora Piura sin miedo</h1>
        <p className="lead">Traslados turísticos y en la ciudad. Reserva en segundos.</p>
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