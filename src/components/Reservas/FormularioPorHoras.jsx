// src/components/Reservas/FormularioPorHoras.jsx
import React from 'react';
import SelectorHoraAMPM from './SelectorHoraAMPM';
import './FormularioPorHoras.css';

const FormularioPorHoras = ({ 
  horasAddress, 
  setHorasAddress,
  onSelectInMap, 
  onReservar,
  onUbicacionActual,
  activeMode,
  horaValue,
  onHoraChange,
  ampm,
  onAmpmChange,
  markers,
  setMarkers
}) => {

  const handleHorasChange = (e) => {
    const newValue = e.target.value;
    setHorasAddress(newValue);
    
    // Si el input está vacío, eliminar el marcador
    if (newValue === '' && markers?.horas) {
      markers.horas.setMap(null);
      setMarkers(prev => ({ ...prev, horas: null }));
    }
  };

  const handleHorasClear = () => {
    setHorasAddress('');
    if (markers?.horas) {
      markers.horas.setMap(null);
      setMarkers(prev => ({ ...prev, horas: null }));
    }
  };

  return (
    <div className="form horas-form">
      {/* Lugar de recojo */}
      <div className="input-wrapper">
        <label>Lugar de recojo</label>
        <input 
          type="text" 
          className="input" 
          placeholder="Escribe o selecciona en el mapa" 
          value={horasAddress}
          id="horasRecojo"
          onChange={handleHorasChange}
        />
        <span className="clear-input" onClick={handleHorasClear}>✕</span>
      </div>
      
      {/* Botón de selección en mapa */}
      <button 
        type="button"
        className={`select-map-btn ${activeMode === 'horas' ? 'active-mode' : ''}`}
        onClick={() => onSelectInMap('horas')}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
          <path d="M12 2v2M12 18v2M4 10h2M18 10h2"></path>
        </svg>
        <span>Seleccionar en mapa</span>
      </button>
      
      {/* Botón de ubicación actual */}
      <button 
        type="button"
        className="current-location-btn"
        onClick={(e) => onUbicacionActual(e.currentTarget)}
      >
        <svg className="location-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
        <span>Usar mi ubicación actual</span>
      </button>
      
      <div className="row-grid">
        <div className="input-wrapper">
          <label>Fecha del servicio</label>
          <input 
            type="date" 
            className="input" 
            id="horasFecha"
          />
        </div>
        
        {/* SELECTOR DE HORA CON AM/PM */}
        <SelectorHoraAMPM 
          value={horaValue}
          onChange={onHoraChange}
          ampm={ampm}
          onAmpmChange={onAmpmChange}
          id="horasHoraInput"
        />
        <input type="hidden" id="horasHoraInicio" />
      </div>
      
      <div className="input-wrapper">
        <label>Horas a contratar</label>
        <select className="input" id="horasCantidad">
          <option value="1" selected>1 hora</option>
          <option value="2">2 horas</option>
          <option value="3">3 horas</option>
          <option value="4">4 horas</option>
          <option value="5">5 horas</option>
          <option value="6">6 horas</option>
          <option value="7">7 horas</option>
          <option value="8">8 horas</option>
          <option value="9">9 horas</option>
          <option value="10">10 horas</option>
          <option value="11">11 horas</option>
          <option value="12">12 horas</option>
        </select>
      </div>
      
      <div className="input-wrapper">
        <label>Número de pasajeros (máx. 6)</label>
        <input 
          type="number" 
          min="1" 
          max="6" 
          defaultValue="1" 
          className="input" 
          id="horasPax"
        />
        <span className="clear-input" data-target="horasPax">✕</span>
      </div>

      <div className="meta">
        <div><strong>Precio estimado:</strong> <span className="price" id="horasPrice">S/ 38.00</span></div>
      </div>

      <div className="actions">
        <button 
          type="button" 
          className="btn success btn-block" 
          id="horasReserveBtn"
          onClick={onReservar}
        >
          Reservar
        </button>
      </div>
    </div>
  );
};

export default FormularioPorHoras;