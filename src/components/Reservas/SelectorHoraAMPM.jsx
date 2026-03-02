// src/components/Reservas/SelectorHoraAMPM.jsx
import React, { useRef } from 'react';
import './SelectorHoraAMPM.css';

const SelectorHoraAMPM = ({ value, onChange, ampm, onAmpmChange, id }) => {
  const inputRef = useRef(null);

  // Función para formatear hora al perder el foco
  const handleBlur = () => {
    if (!value) return;

    let horaFormateada = value.trim();
    
    // ===== CASO 1: Solo números =====
    // Ej: "4", "14", "430", "945"
    if (/^\d+$/.test(horaFormateada)) {
      if (horaFormateada.length === 1) {
        // "4" → "04:00"
        horaFormateada = `0${horaFormateada}:00`;
      } 
      else if (horaFormateada.length === 2) {
        // "14" → "14:00"
        horaFormateada = `${horaFormateada}:00`;
      }
      else if (horaFormateada.length === 3) {
        // "430" → "04:30"
        const horas = horaFormateada.substring(0, 1);
        const minutos = horaFormateada.substring(1, 3);
        if (minutos <= 59) {
          horaFormateada = `0${horas}:${minutos}`;
        }
      }
      else if (horaFormateada.length === 4) {
        // "1430" → "14:30"
        const horas = horaFormateada.substring(0, 2);
        const minutos = horaFormateada.substring(2, 4);
        if (minutos <= 59) {
          horaFormateada = `${horas}:${minutos}`;
        }
      }
    }
    
    // ===== CASO 2: Con espacios (ej: "4 30") =====
    else if (horaFormateada.includes(' ')) {
      const partes = horaFormateada.split(' ').filter(p => p.trim() !== '');
      if (partes.length === 2) {
        let horas = partes[0];
        let minutos = partes[1];
        
        // Limpiar minutos (quitar puntos, comas, etc.)
        minutos = minutos.replace(/[^\d]/g, '');
        
        if (horas.length === 1) horas = `0${horas}`;
        if (minutos.length === 1) minutos = `${minutos}0`;
        
        if (horas <= 23 && minutos <= 59 && minutos.length === 2) {
          horaFormateada = `${horas}:${minutos}`;
        }
      }
    }
    
    // ===== CASO 3: Con puntos o comas (ej: "4.30", "14,30") =====
    else if (/[.,]/.test(horaFormateada)) {
      const separador = horaFormateada.includes('.') ? '.' : ',';
      const partes = horaFormateada.split(separador);
      
      if (partes.length === 2) {
        let horas = partes[0].trim();
        let minutos = partes[1].trim();
        
        if (horas.length === 1) horas = `0${horas}`;
        if (minutos.length === 1) minutos = `${minutos}0`;
        
        if (horas <= 23 && minutos <= 59 && minutos.length === 2) {
          horaFormateada = `${horas}:${minutos}`;
        }
      }
    }
    
    // ===== CASO 4: Formato H:MM (ej: "5:30") =====
    else if (/^\d:\d{2}$/.test(horaFormateada)) {
      const [horas, minutos] = horaFormateada.split(':');
      if (horas >= 0 && horas <= 23 && minutos <= 59) {
        horaFormateada = `${horas.padStart(2, '0')}:${minutos}`;
      }
    }
    
    // ===== CASO 5: Formato HH:M (ej: "14:5") =====
    else if (/^\d{2}:\d$/.test(horaFormateada)) {
      const [horas, minutos] = horaFormateada.split(':');
      const minutosNum = parseInt(minutos);
      if (horas <= 23 && minutosNum <= 5) {
        horaFormateada = `${horas}:${minutos}0`;
      } else if (horas <= 23 && minutosNum > 5) {
        horaFormateada = `${horas}:${minutos}`; // No válido, dejar igual
      }
    }

    onChange(horaFormateada);
  };

  // Función para manejar tecla Enter
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleBlur();
      if (inputRef.current) {
        inputRef.current.blur();
      }
    }
  };

  return (
    <div className="time-picker-ampm">
      <div className="time-input-group">
        <input
          ref={inputRef}
          type="text"
          className="input time-input"
          placeholder="HH:MM"
          maxLength="5"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          id={id}
        />
        <div className="ampm-buttons">
          <button
            type="button"
            className={`ampm-btn ${ampm === 'AM' ? 'active' : ''}`}
            onClick={() => onAmpmChange('AM')}
          >
            AM
          </button>
          <button
            type="button"
            className={`ampm-btn ${ampm === 'PM' ? 'active' : ''}`}
            onClick={() => onAmpmChange('PM')}
          >
            PM
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectorHoraAMPM;