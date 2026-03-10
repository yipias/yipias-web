import { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';

export const useClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const q = query(
      collection(db, 'usuarios'),
      where('rol', '==', 'cliente'),
      orderBy('fechaRegistro', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const clientesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        fechaRegistro: doc.data().fechaRegistro?.toDate?.() || new Date(doc.data().fechaRegistro)
      }));
      setClientes(clientesData);
      setLoading(false);
    }, (err) => {
      console.error('Error cargando clientes:', err);
      setError(err);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const getEstadisticas = () => {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    
    const nuevosHoy = clientes.filter(c => new Date(c.fechaRegistro) >= hoy).length;
    const verificados = clientes.filter(c => c.emailVerified).length;
    const activos = clientes.filter(c => c.estado === 'activo').length;

    return {
      total: clientes.length,
      nuevosHoy,
      verificados,
      activos,
      pendientes: clientes.length - verificados
    };
  };

  return { clientes, loading, error, getEstadisticas };
};