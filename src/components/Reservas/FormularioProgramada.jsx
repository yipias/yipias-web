// src/components/Reservas/FormularioProgramada.jsx
import React from 'react';
import SelectorHoraAMPM from './SelectorHoraAMPM';
import './FormularioProgramada.css';

const FormularioProgramada = ({ 
  pickupAddress, 
  dropoffAddress, 
  setPickupAddress,
  setDropoffAddress,
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

  const handlePickupChange = (e) => {
    const newValue = e.target.value;
    setPickupAddress(newValue);
    
    // Si el input está vacío, eliminar el marcador
    if (newValue === '' && markers?.pickup) {
      markers.pickup.setMap(null);
      setMarkers(prev => ({ ...prev, pickup: null }));
    }
  };

  const handleDropoffChange = (e) => {
    const newValue = e.target.value;
    setDropoffAddress(newValue);
    
    // Si el input está vacío, eliminar el marcador
    if (newValue === '' && markers?.dropoff) {
      markers.dropoff.setMap(null);
      setMarkers(prev => ({ ...prev, dropoff: null }));
    }
  };

  const handlePickupClear = () => {
    setPickupAddress('');
    if (markers?.pickup) {
      markers.pickup.setMap(null);
      setMarkers(prev => ({ ...prev, pickup: null }));
    }
  };

  const handleDropoffClear = () => {
    setDropoffAddress('');
    if (markers?.dropoff) {
      markers.dropoff.setMap(null);
      setMarkers(prev => ({ ...prev, dropoff: null }));
    }
  };

  return (
    <div className="form programada-form">
      {/* Lugar de recojo */}
      <div className="input-wrapper">
        <label>Lugar de recojo</label>
        <input 
          type="text" 
          className="input" 
          placeholder="Escribe o selecciona en el mapa" 
          value={pickupAddress}
          id="pickup"
          onChange={handlePickupChange}
        />
        <span className="clear-input" onClick={handlePickupClear}>✕</span>
      </div>
      
      {/* Botón de selección en mapa para recojo */}
      <button 
        type="button"
        className={`select-map-btn ${activeMode === 'pickup' ? 'active-mode' : ''}`}
        onClick={() => onSelectInMap('pickup')}
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
      
      {/* Destino final */}
      <div className="input-wrapper">
        <label>Destino final</label>
        <input 
          type="text" 
          className="input" 
          placeholder="Escribe o selecciona en el mapa" 
          value={dropoffAddress}
          id="dropoff"
          onChange={handleDropoffChange}
        />
        <span className="clear-input" onClick={handleDropoffClear}>✕</span>
      </div>
      
      {/* Botón de selección en mapa para destino */}
      <button 
        type="button"
        className={`select-map-btn ${activeMode === 'dropoff' ? 'active-mode' : ''}`}
        onClick={() => onSelectInMap('dropoff')}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
          <path d="M12 2v2M12 18v2M4 10h2M18 10h2"></path>
        </svg>
        <span>Seleccionar en mapa</span>
      </button>
      
      <div className="row-grid">
        <div className="input-wrapper">
          <label>Fecha del viaje</label>
          <input 
            type="date" 
            className="input" 
            id="progFecha"
          />
        </div>
        
        {/* SELECTOR DE HORA CON AM/PM */}
        <SelectorHoraAMPM 
          value={horaValue}
          onChange={onHoraChange}
          ampm={ampm}
          onAmpmChange={onAmpmChange}
          id="progHoraInput"
        />
        <input type="hidden" id="progHoraInicio" />
      </div>
      
      <div className="input-wrapper">
        <label>Número de pasajeros (máx. 6)</label>
        <input 
          type="number" 
          min="1" 
          max="6" 
          defaultValue="1" 
          className="input" 
          id="progPax"
        />
        <span className="clear-input" data-target="progPax">✕</span>
      </div>

      <div className="meta">
        <div><strong>Distancia estimada:</strong> <span id="progDistance">—</span></div>
        <div><strong>Precio estimado:</strong> <span className="price" id="progPrice">S/ 0.00</span></div>
      </div>

      <div className="actions">
        <button 
          type="button" 
          className="btn success btn-block" 
          id="progReserveBtn"
          onClick={onReservar}
        >
          Reservar
        </button>
      </div>
    </div>
  );
};

export default FormularioProgramada;