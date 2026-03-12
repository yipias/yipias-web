// src/components/Admin/Reservas/AsignarConductorDropdown.jsx
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import './AsignarConductorDropdown.css';

const AsignarConductorDropdown = ({ reserva, conductores, onAsignar }) => {
  const [abierto, setAbierto] = useState(false);

  const handleAsignar = (conductorId) => {
    onAsignar(reserva.id, conductorId);
    setAbierto(false);
  };

  if (reserva.conductorAsignado) {
    return (
      <div className="conductor-asignado">
        <span className="conductor-nombre">{reserva.conductorAsignado.nombre}</span>
        <button 
          className="btn-cambiar"
          onClick={() => setAbierto(!abierto)}
        >
          Cambiar
        </button>
        {abierto && (
          <div className="dropdown-conductores">
            {conductores
              .filter(c => c.id !== reserva.conductorAsignado.id)
              .map(conductor => (
                <button
                  key={conductor.id}
                  className="dropdown-item"
                  onClick={() => handleAsignar(conductor.id)}
                >
                  {conductor.nombreCompleto}
                </button>
              ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="asignar-container">
      <button 
        className="btn-asignar"
        onClick={() => setAbierto(!abierto)}
      >
        Asignar {abierto ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>
      {abierto && (
        <div className="dropdown-conductores">
          {conductores.map(conductor => (
            <button
              key={conductor.id}
              className="dropdown-item"
              onClick={() => handleAsignar(conductor.id)}
            >
              {conductor.nombreCompleto}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AsignarConductorDropdown;