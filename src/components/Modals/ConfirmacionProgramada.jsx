// src/components/Modals/ConfirmacionProgramada.jsx
import React from 'react';
import { WHATSAPP_PHONE } from '../../utils/constants';
import './Modals.css';

const ConfirmacionProgramada = ({ onClose }) => {
  const handleWhatsApp = () => {
    const mensaje = "Envía este mensaje para confirmar tu reserva.";
    window.open(`https://wa.me/${WHATSAPP_PHONE.replace(/\D/g,'')}?text=${encodeURIComponent(mensaje)}`, '_blank');
    onClose();
  };

  return (
    <div className="modal" style={{ display: 'block' }} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-close" onClick={onClose}>&times;</span>
          <div className="modal-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <h3>¡Reserva confirmada!</h3>
        </div>
        <div className="modal-body">
          <p>Tu reserva se ha realizado correctamente.</p>
          <p className="modal-mensaje">Nos estaremos poniendo en contacto contigo en la brevedad del tiempo para confirmar los detalles.</p>
          <p className="modal-consulta">¿Tienes alguna consulta? Escríbenos por WhatsApp:</p>
          <p className="modal-consulta">La tarifa no incluye peajes, estacionamiento ni paradas adicionales.</p>
          <p className="modal-consulta">El tiempo de cortesía es de 5 minutos, pasado el tiempo se genera un cargo adicional.</p>
          <p className="modal-consulta">Cada pasajero, incluidos niños, ocupan un asiento y deben ser declarados al momento de la reserva.</p>
          <button className="modal-whatsapp-btn" onClick={handleWhatsApp}>
            <img src="/img/whatsapp-icon.png" alt="WhatsApp" className="modal-whatsapp-icon" />
            Contactar por WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmacionProgramada;