// src/hooks/useRegistroConductor.js
import { useState } from 'react';
import { db, storage } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const useRegistroConductor = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const registrarConductor = async (datos, fotoFile) => {
    setLoading(true);
    setError('');
    
    try {
      // 1. Subir foto a Storage si existe
      let fotoURL = '';
      if (fotoFile) {
        const storageRef = ref(storage, `conductores/${Date.now()}_${fotoFile.name}`);
        await uploadBytes(storageRef, fotoFile);
        fotoURL = await getDownloadURL(storageRef);
      }

      // 2. Guardar datos en Firestore
      const conductorData = {
        ...datos,
        fotoURL,
        fechaRegistro: serverTimestamp(),
        estado: 'pendiente', // pendiente, aprobado, rechazado
        disponible: false
      };

      const docRef = await addDoc(collection(db, 'conductores'), conductorData);
      
      setSuccess(true);
      setLoading(false);
      return { success: true, id: docRef.id };
      
    } catch (error) {
      console.error('Error al registrar conductor:', error);
      setError('Error al enviar la solicitud. Intenta nuevamente.');
      setLoading(false);
      return { success: false, error };
    }
  };

  return { registrarConductor, loading, error, success };
};