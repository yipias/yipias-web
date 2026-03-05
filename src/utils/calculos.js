// src/utils/calculos.js
import { db } from '../firebase/config';
import { doc, onSnapshot } from 'firebase/firestore';
import { TARIFAS_KM as TARIFAS_KM_FALLBACK, TARIFAS_HORAS as TARIFAS_HORAS_FALLBACK } from './tarifas';

// Variables globales para caché
let tarifasKmCache = [];
let tarifasHorasCache = [];
let inicializado = false;

// Función para convertir objetos a arrays (si es necesario)
const normalizarTarifas = (data) => {
  // Si ya es un array de arrays, devolverlo directo
  if (Array.isArray(data) && data.length > 0 && Array.isArray(data[0])) {
    return data;
  }
  
  // Si es un array de objetos, convertirlo
  if (Array.isArray(data) && data.length > 0 && typeof data[0] === 'object') {
    if (data[0].hasOwnProperty('km')) {
      // Es tarifa KM
      return data.map(t => [t.km, t.tarifa1_4, t.tarifa5_6]);
    } else if (data[0].hasOwnProperty('horas')) {
      // Es tarifa HORAS
      return data.map(t => [t.horas, t.tarifa1_4, t.tarifa5_6]);
    }
  }
  
  return [];
};

// Inicializar y escuchar cambios en Firebase
const tarifasRef = doc(db, 'config', 'tarifas');

// Esta función se ejecuta UNA SOLA VEZ al importar el módulo
const initTarifasListener = () => {
  if (inicializado) return;
  inicializado = true;
  
  console.log('🎯 Iniciando listener de tarifas desde Firebase');
  
  onSnapshot(tarifasRef, (docSnap) => {
    if (docSnap.exists()) {
      const data = docSnap.data();
      
      // Normalizar ambos tipos de tarifas
      tarifasKmCache = normalizarTarifas(data.tarifasKm || []);
      tarifasHorasCache = normalizarTarifas(data.tarifasHoras || []);
      
      console.log('✅ Tarifas actualizadas desde Firebase:', {
        km: tarifasKmCache.length,
        horas: tarifasHorasCache.length,
        muestraKm: tarifasKmCache[0],
        muestraHoras: tarifasHorasCache[0]
      });
    } else {
      // Si no existe en Firebase, usar fallback
      tarifasKmCache = TARIFAS_KM_FALLBACK;
      tarifasHorasCache = TARIFAS_HORAS_FALLBACK;
      console.log('⚠️ Usando tarifas de respaldo (tarifas.js)');
    }
  }, (error) => {
    console.error('❌ Error escuchando tarifas:', error);
    tarifasKmCache = TARIFAS_KM_FALLBACK;
    tarifasHorasCache = TARIFAS_HORAS_FALLBACK;
  });
};

// Ejecutar listener al cargar el módulo
initTarifasListener();

export function redondearKilometros(km) {
  const decimal = km - Math.floor(km);
  return decimal >= 0.5 ? Math.ceil(km) : Math.floor(km);
}

export function obtenerTarifaKm(km, numPasajeros) {
  if (numPasajeros > 6) {
    throw new Error('El número máximo de pasajeros es 6');
  }
  
  // Columna 1: 1-4 pasajeros, Columna 2: 5-6 pasajeros
  const columna = numPasajeros <= 4 ? 1 : 2;
  const kmRedondeado = redondearKilometros(km);
  
  // Usar caché de Firebase
  if (tarifasKmCache.length === 0) {
    console.warn('⚠️ No hay tarifas KM en caché, usando fallback');
    tarifasKmCache = TARIFAS_KM_FALLBACK;
  }
  
  if (kmRedondeado > 1000) {
    const ultima = tarifasKmCache[tarifasKmCache.length - 1];
    return ultima ? ultima[columna] : null;
  }
  
  const tarifa = tarifasKmCache.find(item => item[0] === kmRedondeado);
  const resultado = tarifa ? tarifa[columna] : null;
  
  console.log('📍 Tarifa KM:', { km, kmRedondeado, columna, resultado });
  
  return resultado;
}

export function obtenerTarifaHoras(horas, numPasajeros) {
  if (numPasajeros > 6) {
    throw new Error('El número máximo de pasajeros es 6');
  }
  
  const columna = numPasajeros <= 4 ? 1 : 2;
  
  // Usar caché de Firebase
  if (tarifasHorasCache.length === 0) {
    console.warn('⚠️ No hay tarifas HORAS en caché, usando fallback');
    tarifasHorasCache = TARIFAS_HORAS_FALLBACK;
  }
  
  const tarifa = tarifasHorasCache.find(item => item[0] === horas);
  const resultado = tarifa ? tarifa[columna] : null;
  
  console.log('⏰ Tarifa HORAS:', { horas, columna, resultado });
  
  return resultado;
}

// Función para recargar manualmente (útil para debugging)
export function recargarTarifas() {
  tarifasKmCache = TARIFAS_KM_FALLBACK;
  tarifasHorasCache = TARIFAS_HORAS_FALLBACK;
  console.log('🔄 Tarifas recargadas desde archivo local');
}

// Exponer función para ver caché (debugging)
export function verCaché() {
  console.log('📦 Caché KM:', tarifasKmCache.slice(0, 3));
  console.log('📦 Caché HORAS:', tarifasHorasCache.slice(0, 3));
}