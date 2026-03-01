// src/hooks/useFormatoHoraAMPM.js
import { useState } from 'react';

export const useFormatoHoraAMPM = () => {
  const [ampm, setAmpm] = useState('AM');

  const formatearHoraParaFirebase = (horaInput, ampmValue) => {
    if (!horaInput) return '';
    
    const [horas, minutos] = horaInput.split(':');
    let horas24 = parseInt(horas);
    
    if (ampmValue === 'PM' && horas24 < 12) horas24 += 12;
    if (ampmValue === 'AM' && horas24 === 12) horas24 = 0;
    
    return `${horas24.toString().padStart(2, '0')}:${minutos}`;
  };

  return { ampm, setAmpm, formatearHoraParaFirebase };
};