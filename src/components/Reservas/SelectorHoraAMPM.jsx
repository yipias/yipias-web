// src/components/Reservas/SelectorHoraAMPM.jsx
import React from 'react';
import './SelectorHoraAMPM.css';

const SelectorHoraAMPM = ({ value, onChange, ampm, onAmpmChange, id }) => {
  return (
    <div className="time-picker-ampm">
      <div className="time-input-group">
        <input
          type="text"
          className="input time-input"
          placeholder="HH:MM"
          maxLength="5"
          value={value}
          onChange={(e) => onChange(e.target.value)}
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