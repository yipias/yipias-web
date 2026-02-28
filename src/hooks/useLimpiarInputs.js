// src/hooks/useLimpiarInputs.js
import { useEffect } from 'react';

export const useLimpiarInputs = () => {
  useEffect(() => {
    const handleClearClick = (e) => {
      const clearBtn = e.target.closest('.clear-input');
      if (!clearBtn) return;
      
      const targetId = clearBtn.getAttribute('data-target');
      if (!targetId) return;
      
      const targetInput = document.getElementById(targetId);
      if (targetInput) {
        targetInput.value = '';
        
        // Si es un input de hora, también limpiar el hidden asociado
        if (targetId.includes('HoraInput')) {
          const hiddenId = targetId.replace('Input', 'Inicio');
          const hidden = document.getElementById(hiddenId);
          if (hidden) hidden.value = '';
        }
        
        // Disparar evento change para actualizar cualquier lógica
        targetInput.dispatchEvent(new Event('change', { bubbles: true }));
        targetInput.dispatchEvent(new Event('input', { bubbles: true }));
      }
    };

    document.addEventListener('click', handleClearClick);
    
    return () => {
      document.removeEventListener('click', handleClearClick);
    };
  }, []);
};