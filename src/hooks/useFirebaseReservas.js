// src/hooks/useFirebaseReservas.js
import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export const useFirebaseReservas = () => {
  
  const guardarReservaProgramada = async (datos) => {
    try {
      // Preparar datos exactamente como en main.js
      const reservaData = {
        tipoReserva: 'programada',
        fechaReserva: serverTimestamp(),
        tipoPersona: datos.tipoPersona,
        nombres: datos.nombres,
        apellidos: datos.apellidos,
        documento: datos.documento,
        telefono: datos.telefono,
        lugarRecojo: datos.lugarRecojo,
        destino: datos.destino,
        fechaViaje: datos.fechaViaje,
        horaInicio: datos.horaInicio,
        pasajeros: datos.pasajeros,
        distancia: datos.distancia,
        precio: datos.precio,
        recojoLat: datos.recojoLat || null,
        recojoLng: datos.recojoLng || null,
        destinoLat: datos.destinoLat || null,
        destinoLng: datos.destinoLng || null,
        mapsLink: datos.mapsLink || null
      };

      // Guardar en Firebase
      const docRef = await addDoc(collection(db, 'reservas'), reservaData);
      console.log('✅ Reserva programada guardada en Firebase con ID:', docRef.id);
      
      // 🚫 ELIMINADA LA REDIRECCIÓN A WHATSAPP
      // Solo retornamos éxito para que se muestre el modal
      
      return { success: true, id: docRef.id };
      
    } catch (error) {
      console.error('❌ Error al guardar en Firebase:', error);
      alert('Reserva recibida, pero hubo un problema técnico. Te contactaremos igualmente.');
      
      // 🚫 TAMBIÉN ELIMINADA AQUÍ
      
      return { success: false, error };
    }
  };

  const guardarReservaHoras = async (datos) => {
    try {
      const reservaData = {
        tipoReserva: 'horas',
        fechaReserva: serverTimestamp(),
        tipoPersona: datos.tipoPersona,
        nombres: datos.nombres,
        apellidos: datos.apellidos,
        documento: datos.documento,
        telefono: datos.telefono,
        lugarRecojo: datos.lugarRecojo,
        fechaServicio: datos.fechaServicio,
        horaInicio: datos.horaInicio,
        horasContratadas: datos.horasContratadas,
        pasajeros: datos.pasajeros,
        precio: datos.precio,
        recojoLat: datos.recojoLat || null,
        recojoLng: datos.recojoLng || null,
        mapsLink: datos.mapsLink || null
      };

      const docRef = await addDoc(collection(db, 'reservas'), reservaData);
      console.log('✅ Reserva por horas guardada en Firebase con ID:', docRef.id);
      
      // 🚫 ELIMINADA LA REDIRECCIÓN A WHATSAPP
      
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