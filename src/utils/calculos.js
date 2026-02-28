// src/utils/calculos.js
import { TARIFAS_KM, TARIFAS_HORAS } from './tarifas';

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
  
  if (kmRedondeado > 1000) {
    return TARIFAS_KM[TARIFAS_KM.length - 1][columna];
  }
  
  const tarifa = TARIFAS_KM.find(item => item[0] === kmRedondeado);
  return tarifa ? tarifa[columna] : null;
}

export function obtenerTarifaHoras(horas, numPasajeros) {
  if (numPasajeros > 6) {
    throw new Error('El número máximo de pasajeros es 6');
  }
  
  const columna = numPasajeros <= 4 ? 1 : 2;
  const tarifa = TARIFAS_HORAS.find(item => item[0] === horas);
  return tarifa ? tarifa[columna] : null;
}