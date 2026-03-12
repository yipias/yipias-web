// src/components/Admin/Reservas/ModalConductor.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { X, Car, Palette, Hash, CalendarDays } from 'lucide-react';
import './ModalConductor.css';

const ModalConductor = ({ reserva, onClose }) => {
  const conductor = reserva.conductorAsignado;
  if (!conductor) return null;

  const tieneFotoPerfil   = !!conductor.fotos?.perfil;
  const tieneFotoVehiculo = !!conductor.fotos?.vehiculoFrontal;

  return ReactDOM.createPortal(
    <div className="conductor-modal-overlay" onClick={onClose}>
      <div className="conductor-modal-content" onClick={(e) => e.stopPropagation()}>

        {/* ── Header ── */}
        <div className="conductor-modal-header">
          <div className="conductor-modal-header-icon">
            <Car size={16} />
          </div>
          <h2>Datos del Conductor</h2>
          <button className="conductor-modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="conductor-modal-body">

          {/* ── Foto perfil grande ── */}
          {tieneFotoPerfil && (
            <div className="conductor-foto-perfil-wrap">
              <img src={conductor.fotos.perfil} alt="Perfil" />

            </div>
          )}

          {/* ── Nombre + teléfono ── */}
          <div className="conductor-identidad">
            <h3>{conductor.nombre}</h3>
          </div>

          {/* ── Divider ── */}
          <div className="conductor-divider">
            <span>Vehículo</span>
          </div>

          {/* ── Foto vehículo ── */}
          {tieneFotoVehiculo && (
            <div className="conductor-foto-vehiculo-wrap">
              <img src={conductor.fotos.vehiculoFrontal} alt="Vehículo" />
              <span className="conductor-foto-label">Foto del vehículo</span>
            </div>
          )}

          {/* ── Datos vehículo ── */}
          <div className="conductor-vehiculo-grid">
            <div className="conductor-vehiculo-campo">
              <Car size={14} />
              <div>
                <label>Marca / Modelo</label>
                <span>{conductor.vehiculo?.marca} {conductor.vehiculo?.modelo}</span>
              </div>
            </div>

            <div className="conductor-vehiculo-campo">
              <Palette size={14} />
              <div>
                <label>Color</label>
                <span>{conductor.vehiculo?.color || '—'}</span>
              </div>
            </div>

            <div className="conductor-vehiculo-campo">
              <Hash size={14} />
              <div>
                <label>Placa</label>
                <span className="conductor-placa">{conductor.vehiculo?.placa || '—'}</span>
              </div>
            </div>

            <div className="conductor-vehiculo-campo">
              <CalendarDays size={14} />
              <div>
                <label>Año</label>
                <span>{conductor.vehiculo?.año || '—'}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>,
    document.body
  );
};

export default ModalConductor;