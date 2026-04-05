// src/components/SobreNosotros/SobreNosotros.jsx
import React, { useEffect } from 'react';
import './SobreNosotros.css';

const SobreNosotros = () => {
  // EFECTO REVEAL - DIRECTO EN EL COMPONENTE
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { 
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section id="sobre-nosotros" className="section about-section">
      <div className="container">
        
        {/* Logo */}
        <div className="about-logo reveal">
          <img src="/img/premium.png" alt="YipiAs" className="about-logo-img" />
        </div>
        
        {/* Título */}
        <h2 className="about-title reveal">SOBRE NOSOTROS</h2>
        
        {/* Divisor */}
        <div className="about-divider reveal"></div>
        
{/* Contenido de texto */}
<div className="about-content reveal">
  <p className="about-text">
    <span className="about-highlight">Yipias Premium: Ingeniería en Movilidad.</span> No operamos una flota; diseñamos soluciones. Somos la plataforma digital que conecta estratégicamente la necesidad de clientes exigentes con conductores profesionales de alto estándar.
  </p>

  <p className="about-text">
    <span className="about-highlight">Cobertura Nacional:</span> Nuestra red une los puntos más estratégicos del Perú: <span className="about-highlight">Norte:</span> Piura, balnearios y Trujillo. <span className="about-highlight">Centro:</span> Lima empresarial. <span className="about-highlight">Sur:</span> Tacna. <span className="about-highlight">Oriente:</span> Chachapoyas.
  </p>

  <p className="about-text">
    <span className="about-highlight">Nuestro Valor:</span> Nuestra filosofía es clara: "La diferencia no está en el precio, está en el servicio". Como plataforma, actuamos como el filtro de calidad más estricto para garantizar seguridad, modernidad y confort.
  </p>

  <p className="about-text">
    <span className="about-highlight">Formalidad Garantizada:</span> Respaldo legal de Plataformas y Soluciones S.A.C. (RUC N.° 20610695257). Emitimos facturas y boletas electrónicas, brindando total seguridad jurídica a usuarios particulares y corporativos.
  </p>
</div>
        
        {/* Datos legales */}
        <div className="about-legal reveal">
          <div className="legal-item">
            <span className="legal-label">RUC:</span>
            <span className="legal-value">20610695257</span>
          </div>
          <div className="legal-item">
            <span className="legal-label">Razón Social:</span>
            <span className="legal-value">Plataformas y Soluciones S.A.C</span>
          </div>
          <div className="legal-item">
            <span className="legal-label">Marca:</span>
            <span className="legal-value">YipiAs Perú</span>
          </div>
        </div>
        
        {/* Contacto */}
        <div className="about-contact reveal">
          <div className="contact-item">
            <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8 10a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            <span>+51 935 893 062</span>
          </div>
          <div className="contact-item">
            <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            <span>soporte@yipias.com</span>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="about-copyright reveal">
          © {new Date().getFullYear()} YipiAs · Reservas de Movilidad
        </div>
        
      </div>
    </section>
  );
};

export default SobreNosotros;