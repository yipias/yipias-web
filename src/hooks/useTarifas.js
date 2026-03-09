// src/hooks/useTarifas.js
import { useState, useEffect, useCallback } from 'react';
import { db } from '../firebase/config';
import { doc, onSnapshot, setDoc, arrayUnion } from 'firebase/firestore';

// Tarifas del archivo (SOLO SE USAN UNA VEZ, AL INICIAR)
import { TARIFAS_KM as TARIFAS_KM_SEED, TARIFAS_HORAS as TARIFAS_HORAS_SEED } from '../utils/tarifas';

const TARIFAS_REF = doc(db, 'config', 'tarifas');

export const useTarifas = () => {
  const [tarifasKm, setTarifasKm] = useState([]);
  const [tarifasHoras, setTarifasHoras] = useState([]);
  const [baseOriginal, setBaseOriginal] = useState(null);
  const [historial, setHistorial] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  // Cargar tarifas desde Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(TARIFAS_REF, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        
        // Convertir de objetos a arrays
        const tarifasKmArray = data.tarifasKm?.map(t => [t.km, t.tarifa1_4, t.tarifa5_6]) || [];
        const tarifasHorasArray = data.tarifasHoras?.map(t => [t.horas, t.tarifa1_4, t.tarifa5_6]) || [];
        
        setTarifasKm(tarifasKmArray);
        setTarifasHoras(tarifasHorasArray);
        
        // Cargar la base original (si existe)
        if (data.baseOriginal) {
          const kmBase = data.baseOriginal.km?.map(obj => [obj.km, obj.tarifa1_4, obj.tarifa5_6]) || [];
          const horasBase = data.baseOriginal.horas?.map(obj => [obj.horas, obj.tarifa1_4, obj.tarifa5_6]) || [];
          setBaseOriginal({ km: kmBase, horas: horasBase });
        } else {
          // Si no hay base original, usar las tarifas actuales como base
          setBaseOriginal({ km: tarifasKmArray, horas: tarifasHorasArray });
        }
        
        setHistorial(data.historial || []);
        setLastUpdate(data.updatedAt?.toDate() || new Date());
      } else {
        // Primera vez: usar seed
        setTarifasKm(TARIFAS_KM_SEED);
        setTarifasHoras(TARIFAS_HORAS_SEED);
        setBaseOriginal({ km: TARIFAS_KM_SEED, horas: TARIFAS_HORAS_SEED });
        
        // Crear documento en Firestore
        setDoc(TARIFAS_REF, {
          tarifasKm: TARIFAS_KM_SEED.map(t => ({
            km: t[0],
            tarifa1_4: t[1],
            tarifa5_6: t[2]
          })),
          tarifasHoras: TARIFAS_HORAS_SEED.map(t => ({
            horas: t[0],
            tarifa1_4: t[1],
            tarifa5_6: t[2]
          })),
          baseOriginal: {
            km: TARIFAS_KM_SEED.map(t => ({ km: t[0], tarifa1_4: t[1], tarifa5_6: t[2] })),
            horas: TARIFAS_HORAS_SEED.map(t => ({ horas: t[0], tarifa1_4: t[1], tarifa5_6: t[2] }))
          },
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

  // Guardar tarifas actualizadas (SOLO las activas)
  const guardarTarifas = async (nuevasTarifasKm, nuevasTarifasHoras, cambioInfo = null) => {
    try {
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

  // ===== APLICAR CAMBIOS (guarda en tarifas activas) =====
  const aplicarCambios = async () => {
    return guardarTarifas(tarifasKm, tarifasHoras, {
      accion: 'aplicar',
      descripcion: 'Cambios aplicados manualmente'
    });
  };

  // ACTUALIZAR UNA TARIFA ESPECÍFICA (en tarifas activas)
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

  // APLICAR INCREMENTO PORCENTUAL SOBRE LA BASE ORIGINAL
  const aplicarIncrementoKm = async (porcentaje, tipo = 'aumentar') => {
    const factor = tipo === 'aumentar' ? 1 + porcentaje/100 : 1 - porcentaje/100;
    
    // Usar la base original como referencia
    const base = baseOriginal?.km || TARIFAS_KM_SEED;
    
    const nuevasTarifas = base.map(t => [
      t[0],
      Math.max(1, Math.round(t[1] * factor)),
      Math.max(1, Math.round(t[2] * factor))
    ]);
    
    return guardarTarifas(nuevasTarifas, tarifasHoras, {
      accion: tipo === 'aumentar' ? 'incremento' : 'decremento',
      descripcion: `${tipo === 'aumentar' ? 'Aumento' : 'Disminución'} del ${porcentaje}% en tarifas KM`
    });
  };

  const aplicarIncrementoHoras = async (porcentaje, tipo = 'aumentar') => {
    const factor = tipo === 'aumentar' ? 1 + porcentaje/100 : 1 - porcentaje/100;
    
    // Usar la base original como referencia
    const base = baseOriginal?.horas || TARIFAS_HORAS_SEED;
    
    const nuevasTarifas = base.map(t => [
      t[0],
      Math.max(1, Math.round(t[1] * factor)),
      Math.max(1, Math.round(t[2] * factor))
    ]);
    
    return guardarTarifas(tarifasKm, nuevasTarifas, {
      accion: tipo === 'aumentar' ? 'incremento' : 'decremento',
      descripcion: `${tipo === 'aumentar' ? 'Aumento' : 'Disminución'} del ${porcentaje}% en tarifas HORAS`
    });
  };

  // SOBREESCRIBIR BASE ORIGINAL (copia las tarifas activas a la base)
  const sobrescribirBase = async () => {
    try {
      console.log('📝 Guardando como nueva base original');
      
      const nuevaBaseKm = tarifasKm.map(t => ({
        km: t[0],
        tarifa1_4: t[1],
        tarifa5_6: t[2]
      }));
      
      const nuevaBaseHoras = tarifasHoras.map(t => ({
        horas: t[0],
        tarifa1_4: t[1],
        tarifa5_6: t[2]
      }));
      
      // Guardar SOLO la base original (sin modificar tarifas activas)
      await setDoc(TARIFAS_REF, {
        baseOriginal: {
          km: nuevaBaseKm,
          horas: nuevaBaseHoras
        }
      }, { merge: true });

      // Actualizar estado local
      setBaseOriginal({
        km: tarifasKm,
        horas: tarifasHoras
      });

      console.log('✅ Nueva base original guardada');

      // Agregar al historial
      const entradaHistorial = {
        fecha: new Date(),
        accion: 'sobrescribir',
        descripcion: 'Base original actualizada con las tarifas activas',
        usuario: 'admin'
      };

      await setDoc(TARIFAS_REF, {
        historial: arrayUnion(entradaHistorial)
      }, { merge: true });

      return { success: true };
    } catch (err) {
      console.error('❌ Error:', err);
      return { success: false };
    }
  };

  // RESTABLECER (vuelve a la base original)
  const restablecerBase = async () => {
    console.log('🔄 Restableciendo a base original:', baseOriginal);
    
    if (!baseOriginal) {
      console.log('⚠️ No hay base original, usando seed');
      return guardarTarifas(TARIFAS_KM_SEED, TARIFAS_HORAS_SEED, {
        accion: 'restablecer',
        descripcion: 'Restablecido a valores iniciales (seed)'
      });
    }
    
    // USAR LA BASE ORIGINAL
    return guardarTarifas(baseOriginal.km, baseOriginal.horas, {
      accion: 'restablecer',
      descripcion: 'Restablecido a la base original guardada'
    });
  };

  return {
    tarifasKm,
    tarifasHoras,
    baseOriginal,
    historial,
    loading,
    error,
    lastUpdate,
    guardarTarifas,
    actualizarTarifaKm,
    actualizarTarifaHora,
    aplicarIncrementoKm,
    aplicarIncrementoHoras,
    restablecerBase,
    sobrescribirBase,
    aplicarCambios,
    tieneBaseOriginal: !!baseOriginal
  };
};