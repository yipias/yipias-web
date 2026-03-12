// src/hooks/admin/useReservas.js
import { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, where } from 'firebase/firestore';

export const useReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [conductores, setConductores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar reservas
  useEffect(() => {
    const q = query(collection(db, 'reservas'), orderBy('fechaReserva', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const reservasData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        fechaReserva: doc.data().fechaReserva?.toDate?.() || new Date(doc.data().fechaReserva)
      }));
      setReservas(reservasData);
      setLoading(false);
    }, (err) => {
      console.error('Error cargando reservas:', err);
      setError(err);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Cargar conductores aprobados
  useEffect(() => {
    const q = query(
      collection(db, 'conductores'),
      where('estado', '==', 'aprobado')
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const conductoresData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        fechaRegistro: doc.data().fechaRegistro?.toDate?.() || new Date()
      }));
      setConductores(conductoresData);
    });

    return () => unsubscribe();
  }, []);

  // Actualizar estado de reserva
  const actualizarEstado = async (reservaId, nuevoEstado) => {
    try {
      const reservaRef = doc(db, 'reservas', reservaId);
      await updateDoc(reservaRef, { estado: nuevoEstado });
      return { success: true };
    } catch (error) {
      console.error('Error actualizando estado:', error);
      return { success: false, error };
    }
  };

  // Asignar conductor a reserva
  const asignarConductor = async (reservaId, conductorId) => {
    try {
      const conductor = conductores.find(c => c.id === conductorId);
      const reservaRef = doc(db, 'reservas', reservaId);
      
      await updateDoc(reservaRef, {
        conductorAsignado: {
          id: conductorId,
          nombre: conductor.nombreCompleto,
          telefono: conductor.telefono,
          vehiculo: {
            marca: conductor.vehiculo?.marca,
            modelo: conductor.vehiculo?.modelo,
            color: conductor.vehiculo?.color,
            placa: conductor.vehiculo?.placa,
            año: conductor.vehiculo?.año
          },
          fotos: {
            perfil: conductor.fotos?.perfil,
            vehiculoFrontal: conductor.fotos?.vehiculoFrontal
          }
        },
        estado: 'confirmada'
      });
      
      return { success: true };
    } catch (error) {
      console.error('Error asignando conductor:', error);
      return { success: false, error };
    }
  };

  // Obtener estadísticas
  const getEstadisticas = () => {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const manana = new Date(hoy);
    manana.setDate(manana.getDate() + 1);

    const reservasHoy = reservas.filter(r => {
      const fecha = new Date(r.fechaReserva);
      return fecha >= hoy && fecha < manana;
    });

    const canceladasHoy = reservasHoy.filter(r => r.estado === 'cancelada').length;

    const ingresosTotales = reservas.reduce((acc, r) => {
      const precio = parseFloat(r.precio?.toString().replace('S/ ', '').replace(',', '.') || 0);
      return acc + (isNaN(precio) ? 0 : precio);
    }, 0);

    const conductoresDisponibles = conductores.length;

    const estadosEnServicio = ['confirmada', 'en camino', 'llegó', 'en transcurso'];
    const conductoresEnServicio = reservas.filter(r =>
      estadosEnServicio.includes(r.estado)
    ).length;

    return {
      conductoresDisponibles,
      conductoresEnServicio,
      reservasHoy: reservasHoy.length,
      canceladasHoy,
      ingresosTotales,
      ingresosNetos: ingresosTotales * 0.15,
      totalReservas: reservas.length
    };
  };

  return {
    reservas,
    conductores,
    loading,
    error,
    actualizarEstado,
    asignarConductor,
    getEstadisticas
  };
};