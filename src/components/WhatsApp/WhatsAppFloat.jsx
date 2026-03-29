// src/components/WhatsApp/WhatsAppFloat.jsx
import React from 'react';
import { WHATSAPP_PHONE } from '../../utils/constants';
import './WhatsAppFloat.css';

const WhatsAppFloat = () => {
  const mensaje = "¡Hola, YipiAs! Vengo de la web y tengo una consulta.";
  
  return (
    <a 
      href={`https://wa.me/${WHATSAPP_PHONE.replace(/\D/g,'')}?text=${encodeURIComponent(mensaje)}`}
      className="whatsapp-float"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src="/img/whatsapp-icon.png" alt="WhatsApp" className="whatsapp-icon" />
    </a>
  );
};

export default WhatsAppFloat;