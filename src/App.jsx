// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import ScrollToTop from './components/ScrollToTop'; // ← IMPORTAR
import './assets/global.css';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop /> {/* ← AGREGAR AQUÍ */}
      <Routes>
        <Route path="/" element={
          <div className="App">
            <Header />
            <Hero />
            <DestinosSlider />
            <hr />
            <ServiciosGrid />
            <ReservasTabs />
            <SobreNosotros />
            <Footer />
            <WhatsAppFloat />
          </div>
        } />
        <Route path="/terminos" element={<Terminos />} />
        <Route path="/privacidad" element={<Privacidad />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;