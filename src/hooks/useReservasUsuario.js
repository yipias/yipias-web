// src/hooks/useReservasUsuario.js
import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

export const useReservasUsuario = () => {
  const { currentUser } = useAuth();
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      setReservas([]);
      setLoading(false);
      return;
    }

    console.log('🔍 Buscando reservas para:', currentUser.email);
    
    const reservasRef = collection(db, 'reservas');
    const q = query(
      reservasRef, 
      where('email', '==', currentUser.email),
      orderBy('fechaReserva', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const reservasData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        // Asegurar que las fechas sean manejables
        fechaReserva: doc.data().fechaReserva?.toDate ? doc.data().fechaReserva.toDate() : doc.data().fechaReserva
      }));
      console.log('✅ Reservas cargadas:', reservasData.length);
      setReservas(reservasData);
      setLoading(false);
    }, (error) => {
      console.error('❌ Error al cargar reservas:', error);
      if (error.code === 'failed-precondition') {
        console.log('⚠️ Se necesita crear el índice en Firebase');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser]);

  return { reservas, loading };
};