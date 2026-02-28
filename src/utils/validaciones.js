// src/utils/validaciones.js

/**
 * Valida que una hora tenga formato HH:MM (24h)
 * @param {string} hora - Hora a validar (ej: "14:30")
 * @returns {boolean} True si el formato es válido
 */
export function validarFormatoHora(hora) {
  const regex = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/;
  return regex.test(hora);
}

/**
 * Valida que la fecha y hora sean al menos 30 minutos mayor a la actual
 * @param {string} fecha - Fecha en formato YYYY-MM-DD
 * @param {string} hora - Hora en formato HH:MM
 * @returns {Object} Resultado de la validación { valido: boolean, mensaje: string }
 */
export function validarFechaHora(fecha, hora) {
  // Verificar que existan fecha y hora
  if (!fecha || !hora) {
    return { 
      valido: false, 
      mensaje: 'Por favor selecciona fecha y hora' 
    };
  }
  
  // Verificar formato de hora
  if (!validarFormatoHora(hora)) {
    return { 
      valido: false, 
      mensaje: 'Formato de hora inválido. Use HH:MM (formato 24h)' 
    };
  }
  
  // Convertir fecha y hora a objeto Date
  const [año, mes, dia] = fecha.split('-').map(Number);
  const [horas, minutos] = hora.split(':').map(Number);
  
  const fechaSeleccionada = new Date(año, mes - 1, dia, horas, minutos, 0);
  const ahora = new Date();
  
  // Calcular diferencia en minutos
  const diffMinutos = Math.floor((fechaSeleccionada - ahora) / 60000);
  
  console.log('Fecha seleccionada:', fechaSeleccionada);
  console.log('Ahora:', ahora);
  console.log('Diferencia minutos:', diffMinutos);
  
  if (diffMinutos < 30) {
    const minutosFaltantes = 30 - diffMinutos;
    return { 
      valido: false, 
      mensaje: `❌ La hora debe ser al menos 30 minutos mayor a la hora actual.\nFaltan ${minutosFaltantes} minutos.` 
    };
  }
  
  return { valido: true, mensaje: '' };
}

/**
 * Formatea una hora mientras el usuario escribe (para inputs tipo texto)
 * Ejemplo: "1430" → "14:30"
 * @param {string} valor - Valor actual del input
 * @returns {string} Valor formateado
 */
export function formatearHoraInput(valor) {
  // Eliminar todo lo que no sea número
  let soloNumeros = valor.replace(/[^0-9]/g, '');
  
  // Limitar a 4 caracteres (HHMM)
  if (soloNumeros.length > 4) {
    soloNumeros = soloNumeros.slice(0, 4);
  }
  
  // Insertar los dos puntos después de los primeros 2 dígitos
  if (soloNumeros.length >= 3) {
    return soloNumeros.slice(0, 2) + ':' + soloNumeros.slice(2, 4);
  }
  
  return soloNumeros;
}

/**
 * Valida que un número de pasajeros esté en el rango permitido (1-6)
 * @param {number} pax - Número de pasajeros
 * @returns {boolean} True si es válido
 */
export function validarPasajeros(pax) {
  return pax >= 1 && pax <= 6;
}