// src/hooks/useTarifas.js
import { useState, useEffect, useCallback } from 'react';
import { db } from '../firebase/config';
import { doc, onSnapshot, setDoc, arrayUnion } from 'firebase/firestore';

// Tarifas originales (inmutables)
import { TARIFAS_KM as TARIFAS_KM_ORIGINAL, TARIFAS_HORAS as TARIFAS_HORAS_ORIGINAL } from '../utils/tarifas';

const TARIFAS_REF = doc(db, 'config', 'tarifas');

export const useTarifas = () => {
  const [tarifasKm, setTarifasKm] = useState([]);
  const [tarifasHoras, setTarifasHoras] = useState([]);
  const [historial, setHistorial] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  // Cargar tarifas desde Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(TARIFAS_REF, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        
        // Convertir de objetos a arrays para mantener compatibilidad
        const tarifasKmArray = data.tarifasKm?.map(t => [t.km, t.tarifa1_4, t.tarifa5_6]) || [];
        const tarifasHorasArray = data.tarifasHoras?.map(t => [t.horas, t.tarifa1_4, t.tarifa5_6]) || [];
        
        setTarifasKm(tarifasKmArray);
        setTarifasHoras(tarifasHorasArray);
        setHistorial(data.historial || []);
        setLastUpdate(data.updatedAt?.toDate() || new Date());
      } else {
        // Si no existe en Firestore, usar originales
        setTarifasKm(TARIFAS_KM_ORIGINAL);
        setTarifasHoras(TARIFAS_HORAS_ORIGINAL);
        
        // Crear documento en Firestore con las originales
        setDoc(TARIFAS_REF, {
          tarifasKm: TARIFAS_KM_ORIGINAL.map(t => ({
            km: t[0],
            tarifa1_4: t[1],
            tarifa5_6: t[2]
          })),
          tarifasHoras: TARIFAS_HORAS_ORIGINAL.map(t => ({
            horas: t[0],
            tarifa1_4: t[1],
            tarifa5_6: t[2]
          })),
          historial: [],
          updatedAt: new Date(),
          updatedBy: 'system'
        });
      }
      setLoading(false);
    }, (err) => {
      console.error('Error cargando tarifas:', err);
      setError(err);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Guardar tarifas actualizadas
  const guardarTarifas = async (nuevasTarifasKm, nuevasTarifasHoras, cambioInfo = null) => {
    try {
      // Convertir arrays a objetos para Firestore
      const tarifasKmObj = nuevasTarifasKm.map(t => ({
        km: t[0],
        tarifa1_4: t[1],
        tarifa5_6: t[2]
      }));
      
      const tarifasHorasObj = nuevasTarifasHoras.map(t => ({
        horas: t[0],
        tarifa1_4: t[1],
        tarifa5_6: t[2]
      }));

      // Preparar entrada de historial
      const entradaHistorial = cambioInfo ? {
        fecha: new Date(),
        accion: cambioInfo.accion,
        descripcion: cambioInfo.descripcion,
        usuario: 'admin'
      } : null;

      const updateData = {
        tarifasKm: tarifasKmObj,
        tarifasHoras: tarifasHorasObj,
        updatedAt: new Date(),
        updatedBy: 'admin'
      };

      // Si hay cambio, agregar al historial
      if (entradaHistorial) {
        updateData.historial = arrayUnion(entradaHistorial);
      }

      await setDoc(TARIFAS_REF, updateData, { merge: true });
      return { success: true };
    } catch (err) {
      console.error('Error guardando tarifas:', err);
      return { success: false, error: err };
    }
  };

  // ACTUALIZAR UNA TARIFA ESPECÍFICA
  const actualizarTarifaKm = async (index, nuevosValores) => {
    const nuevas = [...tarifasKm];
    nuevas[index] = nuevosValores;
    return guardarTarifas(nuevas, tarifasHoras, {
      accion: 'edicion',
      descripcion: `Tarifa km ${nuevosValores[0]} actualizada manualmente`
    });
  };

  const actualizarTarifaHora = async (index, nuevosValores) => {
    const nuevas = [...tarifasHoras];
    nuevas[index] = nuevosValores;
    return guardarTarifas(tarifasKm, nuevas, {
      accion: 'edicion',
      descripcion: `Tarifa ${nuevosValores[0]} horas actualizada manualmente`
    });
  };

  // APLICAR INCREMENTO PORCENTUAL SOBRE TARIFAS ORIGINALES
  const aplicarIncrementoKm = async (porcentaje, tipo = 'aumentar') => {
    const factor = tipo === 'aumentar' ? 1 + porcentaje/100 : 1 - porcentaje/100;
    
    // Calcular nuevas tarifas basadas en ORIGINALES
    const nuevasTarifas = TARIFAS_KM_ORIGINAL.map(t => [
      t[0], // km
      Math.max(1, Math.round(t[1] * factor)), // 1-4 pasajeros
      Math.max(1, Math.round(t[2] * factor))  // 5-6 pasajeros
    ]);
    
    return guardarTarifas(nuevasTarifas, tarifasHoras, {
      accion: tipo === 'aumentar' ? 'incremento' : 'decremento',
      descripcion: `${tipo === 'aumentar' ? 'Aumento' : 'Disminución'} del ${porcentaje}% en tarifas KM`
    });
  };

  const aplicarIncrementoHoras = async (porcentaje, tipo = 'aumentar') => {
    const factor = tipo === 'aumentar' ? 1 + porcentaje/100 : 1 - porcentaje/100;
    
    // Calcular nuevas tarifas basadas en ORIGINALES
    const nuevasTarifas = TARIFAS_HORAS_ORIGINAL.map(t => [
      t[0], // horas
      Math.max(1, Math.round(t[1] * factor)), // 1-4 pasajeros
      Math.max(1, Math.round(t[2] * factor))  // 5-6 pasajeros
    ]);
    
    return guardarTarifas(tarifasKm, nuevasTarifas, {
      accion: tipo === 'aumentar' ? 'incremento' : 'decremento',
      descripcion: `${tipo === 'aumentar' ? 'Aumento' : 'Disminución'} del ${porcentaje}% en tarifas HORAS`
    });
  };

  // Restablecer a valores originales
  const restablecerOriginales = async () => {
    const nuevasTarifasKm = TARIFAS_KM_ORIGINAL;
    const nuevasTarifasHoras = TARIFAS_HORAS_ORIGINAL;
    
    setTarifasKm(nuevasTarifasKm);
    setTarifasHoras(nuevasTarifasHoras);
    
    return guardarTarifas(nuevasTarifasKm, nuevasTarifasHoras, {
      accion: 'restablecer',
      descripcion: 'Restablecido a valores originales'
    });
  };

  return {
    tarifasKm,
    tarifasHoras,
    historial,
    loading,
    error,
    lastUpdate,
    guardarTarifas,
    actualizarTarifaKm,
    actualizarTarifaHora,
    aplicarIncrementoKm,
    aplicarIncrementoHoras,
    restablecerOriginales
  };
};