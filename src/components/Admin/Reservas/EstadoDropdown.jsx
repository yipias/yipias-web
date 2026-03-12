// src/components/Admin/Reservas/EstadoDropdown.jsx
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import './EstadoDropdown.css';

const ESTADOS = [
  'pendiente',
  'confirmada',
  'en camino',
  'llegó',
  'en transcurso',
  'finalizada',
  'cancelada'
];

const EstadoDropdown = ({ reserva, onCambiarEstado }) => {
  const [abierto, setAbierto] = useState(false);

  const getColorClass = (estado) => {
    const colors = {
      'pendiente': 'estado-pendiente',
      'confirmada': 'estado-confirmada',
      'en camino': 'estado-en-camino',
      'llegó': 'estado-llego',
      'en transcurso': 'estado-transcurso',
      'finalizada': 'estado-finalizada',
      'cancelada': 'estado-cancelada'
    };
    return colors[estado] || '';
  };

  const handleCambiar = (nuevoEstado) => {
    onCambiarEstado(reserva.id, nuevoEstado);
    setAbierto(false);
  };

  return (
    <div className="estado-container">
      <button 
        className={`estado-actual ${getColorClass(reserva.estado)}`}
        onClick={() => setAbierto(!abierto)}
      >
        {reserva.estado || 'pendiente'} {abierto ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>
      {abierto && (
        <div className="dropdown-estados">
          {ESTADOS.map(estado => (
            <button
              key={estado}
              className={`dropdown-estado ${getColorClass(estado)}`}
              onClick={() => handleCambiar(estado)}
            >
              {estado}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default EstadoDropdown;