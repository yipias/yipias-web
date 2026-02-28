// src/components/Reservas/FormularioProgramada.jsx
import React, { useState } from 'react';
import './FormularioProgramada.css';

const FormularioProgramada = ({ 
  pickupAddress, 
  dropoffAddress, 
  setPickupAddress,
  setDropoffAddress,
  onSelectInMap, 
  onReservar,
  onUbicacionActual,
  activeMode
}) => {
  const [tipoPersona, setTipoPersona] = useState('natural');

  const handlePaxChange = (e) => {
    let value = parseInt(e.target.value);
    if (value > 6) e.target.value = 6;
    if (value < 1) e.target.value = 1;
  };

  return (
    <div className="form programada-form">
      {/* Selector de tipo de persona */}
      <div className="persona-selector">
        <button 
          type="button" 
          className={`persona-btn ${tipoPersona === 'natural' ? 'active' : ''}`}
          onClick={() => setTipoPersona('natural')}
        >
          Persona Natural
        </button>
        <button 
          type="button" 
          className={`persona-btn ${tipoPersona === 'juridica' ? 'active' : ''}`}
          onClick={() => setTipoPersona('juridica')}
        >
          Persona Jurídica
        </button>
      </div>
      
      {/* Campos para Persona Natural */}
      <div className={`persona-campos ${tipoPersona === 'natural' ? 'active-campos' : 'hidden-campos'}`}>
        <div className="input-wrapper">
          <label>Nombres</label>
          <input 
            type="text" 
            className="input" 
            placeholder="Ingresa tus nombres" 
            id="progNombres"
          />
          <span className="clear-input" data-target="progNombres">✕</span>
        </div>
        
        <div className="input-wrapper">
          <label>Apellidos</label>
          <input 
            type="text" 
            className="input" 
            placeholder="Ingresa tus apellidos" 
            id="progApellidos"
          />
          <span className="clear-input" data-target="progApellidos">✕</span>
        </div>
        
        <div className="input-wrapper">
          <label>DNI</label>
          <input 
            type="text" 
            className="input" 
            placeholder="Ingresa tu DNI" 
            id="progDni"
          />
          <span className="clear-input" data-target="progDni">✕</span>
        </div>
      </div>
      
      {/* Campos para Persona Jurídica */}
      <div className={`persona-campos ${tipoPersona === 'juridica' ? 'active-campos' : 'hidden-campos'}`}>
        <div className="input-wrapper">
          <label>Nombres (Representante)</label>
          <input 
            type="text" 
            className="input" 
            placeholder="Nombres del representante" 
            id="progNombresRep"
          />
          <span className="clear-input" data-target="progNombresRep">✕</span>
        </div>
        
        <div className="input-wrapper">
          <label>Razón Social</label>
          <input 
            type="text" 
            className="input" 
            placeholder="Ingresa la razón social" 
            id="progRazonSocial"
          />
          <span className="clear-input" data-target="progRazonSocial">✕</span>
        </div>
        
        <div className="input-wrapper">
          <label>RUC</label>
          <input 
            type="text" 
            className="input" 
            placeholder="Ingresa el RUC" 
            id="progRuc"
          />
          <span className="clear-input" data-target="progRuc">✕</span>
        </div>
      </div>
      
      {/* Campos comunes */}
      <div className="input-wrapper">
        <label>Teléfono</label>
        <input 
          type="tel" 
          className="input" 
          placeholder="Ingresa tu número" 
          id="progTelefono"
        />
        <span className="clear-input" data-target="progTelefono">✕</span>
      </div>
      
      {/* Lugar de recojo */}
      <div className="input-wrapper">
        <label>Lugar de recojo</label>
        <input 
          type="text" 
          className="input" 
          placeholder="Escribe o selecciona en el mapa" 
          value={pickupAddress}
          id="pickup"
          onChange={(e) => setPickupAddress(e.target.value)}
        />
        <span className="clear-input" data-target="pickup">✕</span>
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
          onChange={(e) => setDropoffAddress(e.target.value)}
        />
        <span className="clear-input" data-target="dropoff">✕</span>
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
        
        <div className="time-picker-wrapper">
          <label>Hora de inicio</label>
          <div className="time-input-group">
            <input 
              type="text" 
              className="input time-input" 
              placeholder="HH:MM" 
              maxLength="5" 
              id="progHoraInput"
            />
            <input type="hidden" id="progHoraInicio" />
            <span className="clear-input" data-target="progHoraInput">✕</span>
          </div>
        </div>
      </div>
      
      {/* Número de pasajeros con validación */}
      <div className="input-wrapper">
        <label>Número de pasajeros (máx. 6)</label>
        <input 
          type="number" 
          min="1" 
          max="6" 
          defaultValue="1" 
          className="input" 
          id="progPax"
          onInput={handlePaxChange}
          onBlur={handlePaxChange}
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