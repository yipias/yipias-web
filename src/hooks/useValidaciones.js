// src/hooks/useValidaciones.js
import { useCallback } from 'react';
import { validarFormatoHora, validarFechaHora } from '../utils/validaciones';

export const useValidaciones = () => {
  const validarHora = useCallback((hora) => {
    return validarFormatoHora(hora);
  }, []);

  const validarFechaHoraReserva = useCallback((fecha, hora) => {
    if (!fecha || !hora) {
      alert('Por favor selecciona fecha y hora');
      return false;
    }
    
    const resultado = validarFechaHora(fecha, hora);
    
    if (!resultado.valido) {
      alert(resultado.mensaje);
      return false;
    }
    
    return true;
  }, []);

  const validarPasajeros = useCallback((pax) => {
    if (pax > 6) {
      alert('El número máximo de pasajeros es 6');
      return false;
    }
    if (pax < 1) {
      alert('El número mínimo de pasajeros es 1');
      return false;
    }
    return true;
  }, []);

  const validarCampos = useCallback((campos) => {
    for (let [key, value] of Object.entries(campos)) {
      if (!value || value.trim() === '') {
        alert(`El campo ${key} es obligatorio`);
        return false;
      }
    }
    return true;
  }, []);

  return {
    validarHora,
    validarFechaHoraReserva,
    validarPasajeros,
    validarCampos
  };
};