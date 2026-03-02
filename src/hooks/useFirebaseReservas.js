// src/hooks/useFirebaseReservas.js
import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export const useFirebaseReservas = () => {
  
  const guardarReservaProgramada = async (datos) => {
    try {
      // Preparar datos - AGREGADOS email, nombreCompleto y estado
      const reservaData = {
        tipoReserva: 'programada',
        fechaReserva: serverTimestamp(),
        email: datos.email || '',                    // ← NUEVO
        nombreCompleto: datos.nombreCompleto || '',  // ← NUEVO
        lugarRecojo: datos.lugarRecojo || '',
        destino: datos.destino || '',
        fechaViaje: datos.fechaViaje || '',
        horaInicio: datos.horaInicio || '',
        horaOriginal: datos.horaOriginal || '',
        pasajeros: datos.pasajeros || 1,
        distancia: datos.distancia || '—',
        precio: datos.precio || 'S/ 0.00',
        recojoLat: datos.recojoLat || null,
        recojoLng: datos.recojoLng || null,
        destinoLat: datos.destinoLat || null,
        destinoLng: datos.destinoLng || null,
        mapsLink: datos.mapsLink || null,
        estado: 'pendiente'                           // ← NUEVO
      };

      const docRef = await addDoc(collection(db, 'reservas'), reservaData);
      console.log('✅ Reserva programada guardada en Firebase con ID:', docRef.id);
      
      return { success: true, id: docRef.id };
      
    } catch (error) {
      console.error('❌ Error al guardar en Firebase:', error);
      alert('Reserva recibida, pero hubo un problema técnico. Te contactaremos igualmente.');
      return { success: false, error };
    }
  };

  const guardarReservaHoras = async (datos) => {
    try {
      const reservaData = {
        tipoReserva: 'horas',
        fechaReserva: serverTimestamp(),
        email: datos.email || '',                    // ← NUEVO
        nombreCompleto: datos.nombreCompleto || '',  // ← NUEVO
        lugarRecojo: datos.lugarRecojo || '',
        fechaServicio: datos.fechaServicio || '',
        horaInicio: datos.horaInicio || '',
        horaOriginal: datos.horaOriginal || '',
        horasContratadas: datos.horasContratadas || 1,
        pasajeros: datos.pasajeros || 1,
        precio: datos.precio || 'S/ 38.00',
        recojoLat: datos.recojoLat || null,
        recojoLng: datos.recojoLng || null,
        mapsLink: datos.mapsLink || null,
        estado: 'pendiente'                           // ← NUEVO
      };

      const docRef = await addDoc(collection(db, 'reservas'), reservaData);
      console.log('✅ Reserva por horas guardada en Firebase con ID:', docRef.id);
      
      return { success: true, id: docRef.id };
      
    } catch (error) {
      console.error('❌ Error al guardar en Firebase:', error);
      alert('Reserva recibida, pero hubo un problema técnico. Te contactaremos igualmente.');
      return { success: false, error };
    }
  };

  return {
    guardarReservaProgramada,
    guardarReservaHoras
  };
};