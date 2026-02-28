// src/components/Reservas/FormularioPorHoras.jsx
import React, { useState } from 'react';
import './FormularioPorHoras.css';

const FormularioPorHoras = ({ 
  horasAddress, 
  setHorasAddress,
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
    <div className="form horas-form">
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
            id="horasNombres"
          />
          <span className="clear-input" data-target="horasNombres">✕</span>
        </div>
        
        <div className="input-wrapper">
          <label>Apellidos</label>
          <input 
            type="text" 
            className="input" 
            placeholder="Ingresa tus apellidos" 
            id="horasApellidos"
          />
          <span className="clear-input" data-target="horasApellidos">✕</span>
        </div>
        
        <div className="input-wrapper">
          <label>DNI</label>
          <input 
            type="text" 
            className="input" 
            placeholder="Ingresa tu DNI" 
            id="horasDni"
          />
          <span className="clear-input" data-target="horasDni">✕</span>
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
            id="horasNombresRep"
          />
          <span className="clear-input" data-target="horasNombresRep">✕</span>
        </div>
        
        <div className="input-wrapper">
          <label>Razón Social</label>
          <input 
            type="text" 
            className="input" 
            placeholder="Ingresa la razón social" 
            id="horasRazonSocial"
          />
          <span className="clear-input" data-target="horasRazonSocial">✕</span>
        </div>
        
        <div className="input-wrapper">
          <label>RUC</label>
          <input 
            type="text" 
            className="input" 
            placeholder="Ingresa el RUC" 
            id="horasRuc"
          />
          <span className="clear-input" data-target="horasRuc">✕</span>
        </div>
      </div>
      
      {/* Campos comunes */}
      <div className="input-wrapper">
        <label>Teléfono</label>
        <input 
          type="tel" 
          className="input" 
          placeholder="Ingresa tu número" 
          id="horasTelefono"
        />
        <span className="clear-input" data-target="horasTelefono">✕</span>
      </div>
      
      {/* Lugar de recojo */}
      <div className="input-wrapper">
        <label>Lugar de recojo</label>
        <input 
          type="text" 
          className="input" 
          placeholder="Escribe o selecciona en el mapa" 
          value={horasAddress}
          id="horasRecojo"
          onChange={(e) => setHorasAddress(e.target.value)}
        />
        <span className="clear-input" data-target="horasRecojo">✕</span>
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
        
        <div className="time-picker-wrapper">
          <label>Hora de inicio</label>
          <div className="time-input-group">
            <input 
              type="text" 
              className="input time-input" 
              placeholder="HH:MM" 
              maxLength="5" 
              id="horasHoraInput"
            />
            <input type="hidden" id="horasHoraInicio" />
            <span className="clear-input" data-target="horasHoraInput">✕</span>
          </div>
        </div>
      </div>
      
      <div className="input-wrapper">
        <label>Horas a contratar</label>
        <select className="input" id="horasCantidad">
          <option value="1" selected>1 hora</option>  {/* ← CAMBIADO: selected movido a 1 hora */}
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
      
      {/* Número de pasajeros con validación */}
      <div className="input-wrapper">
        <label>Número de pasajeros (máx. 6)</label>
        <input 
          type="number" 
          min="1" 
          max="6" 
          defaultValue="1" 
          className="input" 
          id="horasPax"
          onInput={handlePaxChange}
          onBlur={handlePaxChange}
        />
        <span className="clear-input" data-target="horasPax">✕</span>
      </div>

      <div className="meta">
        <div><strong>Precio estimado:</strong> <span className="price" id="horasPrice">S/ 38.00</span></div> {/* ← CAMBIADO: precio de 1 hora */}
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