// src/components/Modals/ExplicacionPorHoras.jsx
import React from 'react';
import './Modals.css';

const ExplicacionPorHoras = ({ onClose }) => {
  return (
    <div className="modal" style={{ display: 'block' }} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-close" onClick={onClose}>&times;</span>
          <div className="modal-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
          </div>
          <h3>Reserva por horas</h3>
        </div>
        <div className="modal-body">
          <p>Ideal para recorridos dentro de la ciudad:</p>
          <p className="modal-mensaje">• Contratas el vehículo por horas</p>
          <p className="modal-mensaje">• Válido solo en zonas urbanas</p>
          <p className="modal-mensaje">• Máximo 20 km por hora</p>
          <p className="modal-consulta">Pasados los 30 minutos se considera hora completa.</p>
          <p className="modal-consulta">Kilómetro adicional: S/3.00</p>
          <button className="btn modal-close-btn" onClick={onClose}>Entendido</button>
        </div>
      </div>
    </div>
  );
};

export default ExplicacionPorHoras;