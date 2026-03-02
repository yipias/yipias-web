import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import DestinosSlider from './components/Destinos/DestinosSlider';
import ServiciosGrid from './components/Servicios/ServiciosGrid';
import ReservasTabs from './components/Reservas/ReservasTabs';
import SobreNosotros from './components/SobreNosotros/SobreNosotros';
import Footer from './components/Footer/Footer';
import WhatsAppFloat from './components/WhatsApp/WhatsAppFloat';

import Terminos from './pages/Terminos';
import Privacidad from './pages/Privacidad';
import MisReservas from './pages/MisReservas'; // ← NUEVA IMPORTACIÓN
import ScrollToTop from './components/ScrollToTop';
import AuthModal from './components/Auth/AuthModal';
import SplashScreen from './components/SplashScreen/SplashScreen';

import './assets/global.css';

function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [splashVisible, setSplashVisible] = useState(true);

  const handleSplashFinish = () => {
    setSplashVisible(false);
  };

  return (
    <>
      {splashVisible && <SplashScreen onFinish={handleSplashFinish} />}
      
      <ScrollToTop />
      <Header onOpenAuth={() => setShowAuthModal(true)} />

      <Routes>
        <Route
          path="/"
          element={
            <div className="App">
              <Hero />
              <DestinosSlider />
              <hr />
              <ServiciosGrid />
              <ReservasTabs />
              <SobreNosotros />
              <WhatsAppFloat />
            </div>
          }
        />

        <Route path="/terminos" element={<Terminos />} />
        <Route path="/privacidad" element={<Privacidad />} />
        <Route path="/mis-reservas" element={<MisReservas />} /> {/* ← NUEVA RUTA */}
      </Routes>

      <Footer />

      {showAuthModal && (
        <AuthModal
          onClose={() => {
            setShowAuthModal(false);
            document.body.style.overflow = 'auto';
          }}
        />
      )}
    </>
  );
}

export default App;