// src/hooks/useAdminConductores.js
import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, query, where, orderBy, onSnapshot, doc, updateDoc } from 'firebase/firestore';

export const useAdminConductores = () => {
  const [conductores, setConductores] = useState({
    pendientes: [],
    aprobados: [],
    rechazados: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const conductoresRef = collection(db, 'conductores');
    const q = query(conductoresRef, orderBy('fechaRegistro', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const pendientes = [];
      const aprobados = [];
      const rechazados = [];

      snapshot.docs.forEach(doc => {
        const data = {
          id: doc.id,
          ...doc.data(),
          fechaRegistro: doc.data().fechaRegistro?.toDate() || new Date()
        };

        switch(data.estado) {
          case 'pendiente':
            pendientes.push(data);
            break;
          case 'aprobado':
            aprobados.push(data);
            break;
          case 'rechazado':
            rechazados.push(data);
            break;
          default:
            pendientes.push(data);
        }
      });

      setConductores({ pendientes, aprobados, rechazados });
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const aprobarConductor = async (conductorId) => {
    try {
      const conductorRef = doc(db, 'conductores', conductorId);
      await updateDoc(conductorRef, {
        estado: 'aprobado',
        fechaActualizacion: new Date()
      });
      return { success: true };
    } catch (error) {
      console.error('Error al aprobar conductor:', error);
      return { success: false, error };
    }
  };

  const rechazarConductor = async (conductorId) => {
    try {
      const conductorRef = doc(db, 'conductores', conductorId);
      await updateDoc(conductorRef, {
        estado: 'rechazado',
        fechaActualizacion: new Date()
      });
      return { success: true };
    } catch (error) {
      console.error('Error al rechazar conductor:', error);
      return { success: false, error };
    }
  };

  const revocarConductor = async (conductorId) => {
    try {
      const conductorRef = doc(db, 'conductores', conductorId);
      await updateDoc(conductorRef, {
        estado: 'pendiente',
        fechaActualizacion: new Date()
      });
      return { success: true };
    } catch (error) {
      console.error('Error al revocar conductor:', error);
      return { success: false, error };
    }
  };

  // NUEVA FUNCIÓN PARA ACTUALIZAR DATOS
  const actualizarConductor = async (conductorId, nuevosDatos) => {
    try {
      const conductorRef = doc(db, 'conductores', conductorId);
      // Eliminar campos que no queremos actualizar
      const { id, fechaRegistro, ...datosParaActualizar } = nuevosDatos;
      
      await updateDoc(conductorRef, {
        ...datosParaActualizar,
        fechaActualizacion: new Date()
      });
      return { success: true };
    } catch (error) {
      console.error('Error al actualizar conductor:', error);
      return { success: false, error };
    }
  };

  return { 
    conductores, 
    loading,
    aprobarConductor,
    rechazarConductor,
    revocarConductor,
    actualizarConductor // ← NUEVA
  };
};