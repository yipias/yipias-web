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
    { img: 'punta-sal.jpg', titulo: 'Punta Sal', desc: 'Royal Decameron y más' },
    { img: 'vichayito.jpg', titulo: 'Vichayito', desc: 'Playas, hoteles y gastronomía' },
    { img: 'zorritos.jpg', titulo: 'Zorritos', desc: 'Hotelería Playera y más' },
    { img: 'nuro.png', titulo: 'Órganos', desc: 'El Ñuro y más playas' },
    { img: 'morropon.jpg', titulo: 'Huancabamba', desc: 'Canchaque, Morropón y más' }
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