// src/components/Modals/ConfirmacionPorHoras.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { History, MessageCircle } from 'lucide-react';
import { WHATSAPP_PHONE } from '../../utils/constants';
import './ConfirmacionModals.css';

const ConfirmacionPorHoras = ({ onClose }) => {
  const handleWhatsApp = () => {
    const mensaje = "¡Hola! Quiero hacer una consulta sobre mi reserva por horas en YipiAs.";
    window.open(`https://wa.me/${WHATSAPP_PHONE.replace(/\D/g,'')}?text=${encodeURIComponent(mensaje)}`, '_blank');
    onClose();
  };

  return (
    <div className="confirmacion-modal-overlay active" onClick={onClose}>
      <div className="confirmacion-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="confirmacion-modal-header">
          <span className="confirmacion-modal-close" onClick={onClose}>&times;</span>
          <div className="confirmacion-modal-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <h3>¡Reserva confirmada!</h3>
        </div>
        <div className="confirmacion-modal-body">
          <p>Tu reserva por horas se ha realizado correctamente.</p>
          <p className="confirmacion-mensaje">
            Nos estaremos poniendo en contacto contigo en la brevedad del tiempo para confirmar los detalles.
          </p>
          
          <p className="confirmacion-consulta">
            Puedes revisar el estado de tu reserva en cualquier momento en tu historial.
          </p>

          <div className="confirmacion-botones">
            <Link 
              to="/mis-reservas" 
              className="confirmacion-btn-historial"
              onClick={onClose}
            >
              <History size={18} />
              Ver historial de reservas
            </Link>

            <button 
              className="confirmacion-btn-whatsapp" 
              onClick={handleWhatsApp}
            >
              <MessageCircle size={18} />
              Contactar por WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmacionPorHoras;