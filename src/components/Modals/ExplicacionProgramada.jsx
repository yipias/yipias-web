// src/components/Modals/ExplicacionProgramada.jsx
import React from 'react';
import './Modals.css';

const ExplicacionProgramada = ({ onClose }) => {
  return (
    <div className="modal" style={{ display: 'block' }} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-close" onClick={onClose}>&times;</span>
          <div className="modal-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
          <h3>Reserva de un punto a punto</h3>
        </div>
        <div className="modal-body">
          <p>Este tipo de reserva te permite programar un viaje con:</p>
          <p className="modal-mensaje">• Destino específico (puede ser fuera de Piura)</p>
          <p className="modal-mensaje">• Fecha y hora exacta</p>
          <p className="modal-mensaje">• Tarifa según kilometraje</p>
          <p className="modal-consulta">El precio se calcula en base a la distancia y número de pasajeros.</p>
          <p className="modal-consulta">Mínimo 30 minutos de anticipación.</p>
          <button className="btn modal-close-btn" onClick={onClose}>Entendido</button>
        </div>
      </div>
    </div>
  );
};

export default ExplicacionProgramada;