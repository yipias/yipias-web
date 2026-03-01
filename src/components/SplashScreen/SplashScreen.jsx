// src/components/SplashScreen/SplashScreen.jsx
import React, { useEffect, useState } from 'react';
import './SplashScreen.css';

const SplashScreen = ({ onFinish }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Después de 4.5 segundos, empezar a desvanecer
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 4500);

    // Después de 5.5 segundos, remover completamente
    const removeTimer = setTimeout(() => {
      onFinish();
    }, 5500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [onFinish]);

  return (
    <div className={`splash-screen ${fadeOut ? 'fade-out' : ''}`}>
      <div className="splash-content">
        <img src="/img/premium.png" alt="YipiAs" className="splash-logo" />
        <div className="splash-loader"></div>
        <p className="splash-text">Cargando...</p>
      </div>
    </div>
  );
};

export default SplashScreen;