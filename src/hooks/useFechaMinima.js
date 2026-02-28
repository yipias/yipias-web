// src/hooks/useFechaMinima.js
import { useEffect } from 'react';

export const useFechaMinima = () => {
  useEffect(() => {
    // Función para obtener la fecha de hoy en formato YYYY-MM-DD
    const obtenerHoyStr = () => {
      const hoy = new Date();
      const año = hoy.getFullYear();
      const mes = String(hoy.getMonth() + 1).padStart(2, '0');
      const dia = String(hoy.getDate()).padStart(2, '0');
      return `${año}-${mes}-${dia}`;
    };

    // Configurar cada input de fecha
    const configurarDatePicker = (input) => {
      if (!input) return;
      
      const hoyStr = obtenerHoyStr();
      
      // Establecer mínimo y valor por defecto
      input.min = hoyStr;
      if (!input.value) {
        input.value = hoyStr;
      }
      
      // Bloquear escritura manual (opcional, pero mejora UX)
      input.addEventListener('keydown', (e) => {
        e.preventDefault();
        return false;
      });
      
      // Abrir el datepicker al hacer clic
      input.addEventListener('click', () => {
        input.showPicker();
      });
    };

    // Aplicar a todos los inputs de tipo date
    const dateInputs = document.querySelectorAll('input[type="date"]');
    dateInputs.forEach(configurarDatePicker);

    // Observar nuevos inputs que se agreguen dinámicamente (por si cambian pestañas)
    const observer = new MutationObserver(() => {
      const nuevosInputs = document.querySelectorAll('input[type="date"]:not([data-fecha-configurado])');
      nuevosInputs.forEach(input => {
        input.setAttribute('data-fecha-configurado', 'true');
        configurarDatePicker(input);
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      observer.disconnect();
    };
  }, []);
};