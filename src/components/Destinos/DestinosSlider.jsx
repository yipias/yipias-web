// src/components/Destinos/DestinosSlider.jsx
import React, { useRef, useEffect } from 'react';
import './DestinosSlider.css';

const DestinosSlider = () => {
  const scrollRef = useRef(null);
  const intervalRef = useRef(null);

  const destinos = [
    { img: 'catacaos.jpg', titulo: 'Catacaos', desc: 'Artesanías y gastronomía' },
    { img: 'mancora.jpg', titulo: 'Máncora', desc: 'Playas, gastronomía y surf' },
    { img: 'sechura.jpeg', titulo: 'Sechura', desc: 'Desierto y cultura' },
    { img: 'plaza_mayor.jpg', titulo: 'Plaza Mayor de Lima', desc: 'Centros históricos del Perú.' },
    { img: 'catedral_lima.jpg', titulo: 'Catedral de Lima', desc: 'Corazón católico del Perú.' },
    { img: 'malecon_miraflores.jpg', titulo: 'Malecones', desc: 'Malecón de Miraflores, y muchos más.' },
    { img: 'chan_chan.webp', titulo: 'Ruinas', desc: 'Ruinas de Chan Chan' },
    { img: 'huacas.jpg', titulo: 'Huacas', desc: 'Huaca del Sol, de la Luna y muchas más.' }
  ];

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const cards = container.children;
    if (cards.length === 0) return;

    let scrollAmount = 0;
    // Calcular ancho de la primera tarjeta (puede variar si no ha cargado)
    const cardWidth = cards[0]?.offsetWidth + 16 || 276; // 260 + 16 de gap
    const maxScroll = (cards.length - 3) * cardWidth;

    const autoScroll = () => {
      if (!container) return;
      scrollAmount += cardWidth;
      if (scrollAmount > maxScroll) scrollAmount = 0;
      container.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    };

    // Iniciar intervalo
    intervalRef.current = setInterval(autoScroll, 3000);

    const handleMouseEnter = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };

    const handleMouseLeave = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      intervalRef.current = setInterval(autoScroll, 3000);
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    // Limpiar al desmontar
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section id="destinos" className="section">
      <div className="container">
        <h2>Algunos destinos</h2>
        <div 
          className="destinations-scroll" 
          ref={scrollRef} 
          aria-label="Carrusel de destinos"
        >
          {destinos.map((destino, index) => (
            <div className="dest-card" key={index}>
              <img src={`/img/${destino.img}`} alt={destino.titulo} />
              <div className="dest-info">
                <strong>{destino.titulo}</strong>
                <span>{destino.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinosSlider;