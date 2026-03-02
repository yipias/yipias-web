// src/components/Reservas/ModalConductor.jsx
import React from 'react';
import { X, Car, User, Phone, Mail } from 'lucide-react';
import './ModalConductor.css';

const ModalConductor = ({ conductor, onClose }) => {
  return (
    <div className="modal-conductor-overlay" onClick={onClose}>
      <div className="modal-conductor-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-conductor-close" onClick={onClose}>
          <X size={20} />
        </button>

        <h2>Tu conductor asignado</h2>

        <div className="conductor-foto">
          <img 
            src={conductor.foto || '/img/default-driver.jpg'} 
            alt={conductor.nombre}
          />
        </div>

        <div className="conductor-info">
          <div className="info-item">
            <User size={18} />
            <span><strong>Nombre:</strong> {conductor.nombre}</span>
          </div>

          <div className="info-item">
            <Car size={18} />
            <span><strong>Vehículo:</strong> {conductor.modelo}</span>
          </div>

          <div className="info-item placa">
            <span><strong>Placa:</strong> {conductor.placa}</span>
          </div>

          <div className="info-item color">
            <span><strong>Color:</strong> {conductor.color}</span>
          </div>

          <div className="info-item">
            <Phone size={18} />
            <span><strong>Teléfono:</strong> {conductor.telefono}</span>
          </div>
        </div>

        <button className="btn-cerrar" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ModalConductor;