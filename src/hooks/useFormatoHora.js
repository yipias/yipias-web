// src/hooks/useFormatoHora.js
import { useEffect } from 'react';

export const useFormatoHora = () => {
  useEffect(() => {
    console.log('Hook useFormatoHora iniciado');

    const handleHoraInput = (e) => {
      const input = e.target;
      let value = input.value.replace(/[^0-9]/g, '');
      
      // Limitar a 4 caracteres
      if (value.length > 4) {
        value = value.slice(0, 4);
      }
      
      // Formatear como HH:MM
      if (value.length >= 3) {
        input.value = value.slice(0, 2) + ':' + value.slice(2, 4);
      } else {
        input.value = value;
      }
      
      // Validar hora (0-23)
      const partes = input.value.split(':');
      if (partes[0]) {
        let hora = parseInt(partes[0]);
        if (hora > 23) {
          input.value = '23' + (partes[1] ? ':' + partes[1] : '');
        }
      }
      
      // Validar minutos (0-59)
      if (partes[1]) {
        let minutos = parseInt(partes[1]);
        if (minutos > 59) {
          input.value = partes[0] + ':59';
        }
      }
      
      // Actualizar hidden y clases de validación
      actualizarEstado(input);
    };

    const handleBlur = (e) => {
      const input = e.target;
      const regex = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/;
      
      if (!regex.test(input.value)) {
        input.value = '';
        actualizarEstado(input);
      }
    };

    const actualizarEstado = (input) => {
      const hiddenId = input.id.replace('Input', 'Inicio');
      const hidden = document.getElementById(hiddenId);
      if (!hidden) return;
      
      const regex = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/;
      
      if (regex.test(input.value)) {
        hidden.value = input.value;
        input.classList.remove('error');
        input.classList.add('valid');
      } else {
        hidden.value = '';
        input.classList.remove('valid');
        input.classList.add('error');
      }
    };

    // Forzar la aplicación a todos los inputs .time-input existentes y futuros
    const aplicarAInputs = () => {
      const horaInputs = document.querySelectorAll('.time-input');
      console.log('Inputs de hora encontrados:', horaInputs.length);
      
      horaInputs.forEach(input => {
        // Remover listeners anteriores para evitar duplicados
        input.removeEventListener('input', handleHoraInput);
        input.removeEventListener('blur', handleBlur);
        
        // Agregar nuevos listeners
        input.addEventListener('input', handleHoraInput);
        input.addEventListener('blur', handleBlur);
        
        // Inicializar estado
        actualizarEstado(input);
      });
    };

    // Aplicar inmediatamente
    aplicarAInputs();

    // Observar nuevos inputs que se agreguen (por si cambian pestañas)
    const observer = new MutationObserver(() => {
      aplicarAInputs();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      observer.disconnect();
      const horaInputs = document.querySelectorAll('.time-input');
      horaInputs.forEach(input => {
        input.removeEventListener('input', handleHoraInput);
        input.removeEventListener('blur', handleBlur);
      });
    };
  }, []);
};