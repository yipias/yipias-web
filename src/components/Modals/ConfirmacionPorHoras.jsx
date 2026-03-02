// src/components/Modals/ConfirmacionPorHoras.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { History, MessageCircle } from 'lucide-react'; // ← IMPORTAR ÍCONOS
import { WHATSAPP_PHONE } from '../../utils/constants';
import './Modals.css';

const ConfirmacionPorHoras = ({ onClose }) => {
  const handleWhatsApp = () => {
    const mensaje = "¡Hola! Quiero hacer una consulta sobre mi reserva por horas en YipiAs.";
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
          <p>Tu reserva por horas se ha realizado correctamente.</p>
          <p className="modal-mensaje">
            Nos estaremos poniendo en contacto contigo en la brevedad del tiempo para confirmar los detalles.
          </p>
          
          <p className="modal-consulta">
            Puedes revisar el estado de tu reserva en cualquier momento en tu historial.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '1rem' }}>
            <Link 
              to="/mis-reservas" 
              className="btn-historial"
              onClick={onClose}
            >
              <History size={18} />
              Ver historial de reservas
            </Link>

            <button 
              className="modal-whatsapp-btn" 
              onClick={handleWhatsApp}
              style={{ marginTop: 0 }}
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