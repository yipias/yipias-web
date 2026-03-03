// src/pages/Admin/conductores/ConductoresAprobados.jsx
import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react'; // ← IMPORTAR ÍCONO
import ConductorCardAprobado from './ConductorCardAprobado';
import ConductorDetalleModal from './ConductorDetalleModal';
import './ConductoresAprobados.css';

const ConductoresAprobados = ({ conductores }) => {
  const [selectedConductor, setSelectedConductor] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleVerDetalle = (conductor) => {
    setSelectedConductor(conductor);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedConductor(null);
  };

  if (conductores.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">
          <CheckCircle size={48} /> {/* ← ÍCONO DE LUCIDE */}
        </div>
        <h3>No hay conductores aprobados</h3>
        <p>Los conductores que apruebes aparecerán aquí.</p>
      </div>
    );
  }

  return (
    <>
      <div className="conductores-grid">
        {conductores.map(conductor => (
          <ConductorCardAprobado 
            key={conductor.id} 
            conductor={conductor} 
            onVerDetalle={handleVerDetalle}
          />
        ))}
      </div>

      {showModal && selectedConductor && (
        <ConductorDetalleModal 
          conductor={selectedConductor} 
          onClose={handleCloseModal}
          tipo="aprobado"
        />
      )}
    </>
  );
};

export default ConductoresAprobados;