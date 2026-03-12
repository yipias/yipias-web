// src/components/Admin/Reservas/AsignarConductorDropdown.jsx
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import './AsignarConductorDropdown.css';

// Lógica de nombre según cantidad de palabras:
// 1: solo ese
// 2: ambos
// 3: primero + segundo
// 4: primero + tercero
// 5: primero + tercero
const getNombreCorto = (nombreCompleto) => {
  if (!nombreCompleto) return '—';
  const partes = nombreCompleto.trim().split(/\s+/);
  const n = partes.length;
  if (n === 1) return partes[0];
  if (n === 2) return `${partes[0]} ${partes[1]}`;
  if (n >= 3) return `${partes[0]} ${partes[2]}`;
  return partes[0];
};

const AsignarConductorDropdown = ({ reserva, conductores, onAsignar }) => {
  const [abierto, setAbierto] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setAbierto(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAsignar = (conductorId) => {
    onAsignar(reserva.id, conductorId);
    setAbierto(false);
  };

  const handleQuitarConductor = () => {
    onAsignar(reserva.id, null);
    setAbierto(false);
  };

  const renderItem = (conductor) => {
    const nombre = getNombreCorto(conductor.nombreCompleto);
    const vehiculo = conductor.vehiculo?.marca && conductor.vehiculo?.modelo
      ? `${conductor.vehiculo.marca} ${conductor.vehiculo.modelo}`
      : null;

    return (
      <button
        key={conductor.id}
        className="dropdown-item"
        onClick={() => handleAsignar(conductor.id)}
      >
        <div className="item-avatar">
          {conductor.nombreCompleto?.charAt(0).toUpperCase() || '?'}
        </div>
        <div className="item-info">
          {vehiculo && <span className="item-vehiculo">{vehiculo}</span>}
          <span className="item-nombre">{nombre}</span>
        </div>
      </button>
    );
  };

  if (reserva.conductorAsignado) {
    return (
      <div className="conductor-asignado" ref={ref}>
        <div className="conductor-asignado-info">
          {reserva.conductorAsignado.vehiculo?.marca && (
            <span className="conductor-vehiculo">
              {reserva.conductorAsignado.vehiculo.marca} {reserva.conductorAsignado.vehiculo.modelo}
            </span>
          )}
          <span className="conductor-nombre">
            {getNombreCorto(reserva.conductorAsignado.nombre)}
          </span>
        </div>
        <button className="btn-cambiar" onClick={() => setAbierto(!abierto)}>
          Cambiar {abierto ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
        {abierto && (
          <div className="dropdown-conductores with-scroll">
            <button
              className="dropdown-item sin-conductor-item"
              onClick={handleQuitarConductor}
            >
              <div className="item-avatar sin-conductor">—</div>
              <div className="item-info">
                <span className="item-nombre">Sin conductor</span>
              </div>
            </button>
            {conductores
              .filter(c => c.id !== reserva.conductorAsignado.id)
              .map(renderItem)}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="asignar-container" ref={ref}>
      <button className="btn-asignar" onClick={() => setAbierto(!abierto)}>
        Asignar {abierto ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>
      {abierto && (
        <div className="dropdown-conductores with-scroll">
          <button
            className="dropdown-item sin-conductor-item"
            onClick={handleQuitarConductor}
          >
            <div className="item-avatar sin-conductor">—</div>
            <div className="item-info">
              <span className="item-nombre">Sin conductor</span>
            </div>
          </button>
          {conductores.map(renderItem)}
        </div>
      )}
    </div>
  );
};

export default AsignarConductorDropdown;