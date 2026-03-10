// src/hooks/admin/useClientes.js
import { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, query, where, orderBy, onSnapshot, doc, deleteDoc } from 'firebase/firestore';

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

  // ✅ NUEVA FUNCIÓN PARA ELIMINAR CLIENTES
  const eliminarCliente = async (clienteId) => {
    try {
      const clienteRef = doc(db, 'usuarios', clienteId);
      await deleteDoc(clienteRef);
      return { success: true };
    } catch (error) {
      console.error('Error eliminando cliente:', error);
      return { success: false, error };
    }
  };

  const getEstadisticas = () => {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    
    const nuevosHoy = clientes.filter(c => new Date(c.fechaRegistro) >= hoy).length;

    return {
      total: clientes.length,
      nuevosHoy
    };
  };

  return { 
    clientes, 
    loading, 
    error, 
    getEstadisticas,
    eliminarCliente  // ← EXPORTADA
  };
};