// src/hooks/useModales.js
import { useState, useEffect } from 'react';

export const useModales = () => {
  const [modalExplicacionProgramada, setModalExplicacionProgramada] = useState(false);
  const [modalExplicacionHoras, setModalExplicacionHoras] = useState(false);
  const [modalConfirmacionProgramada, setModalConfirmacionProgramada] = useState(false);
  const [modalConfirmacionHoras, setModalConfirmacionHoras] = useState(false);

  // Verificar si ya se mostraron los modales de explicación en esta sesión
  useEffect(() => {
    const mostroProgramada = sessionStorage.getItem('mostroExplicacionProgramada');
    const mostroHoras = sessionStorage.getItem('mostroExplicacionHoras');
    
    if (mostroProgramada) {
      console.log('Modal programada ya mostrado en esta sesión');
    }
    if (mostroHoras) {
      console.log('Modal horas ya mostrado en esta sesión');
    }
  }, []);

  const mostrarExplicacionProgramada = () => {
    const mostro = sessionStorage.getItem('mostroExplicacionProgramada');
    if (!mostro) {
      setModalExplicacionProgramada(true);
      sessionStorage.setItem('mostroExplicacionProgramada', 'true');
    }
  };

  const mostrarExplicacionPorHoras = () => {
    const mostro = sessionStorage.getItem('mostroExplicacionHoras');
    if (!mostro) {
      setModalExplicacionHoras(true);
      sessionStorage.setItem('mostroExplicacionHoras', 'true');
    }
  };

  const mostrarConfirmacionProgramada = () => {
    setModalConfirmacionProgramada(true);
  };

  const mostrarConfirmacionHoras = () => {
    setModalConfirmacionHoras(true);
  };

  const cerrarModales = () => {
    setModalExplicacionProgramada(false);
    setModalExplicacionHoras(false);
    setModalConfirmacionProgramada(false);
    setModalConfirmacionHoras(false);
  };

  return {
    modalExplicacionProgramada,
    modalExplicacionHoras,
    modalConfirmacionProgramada,
    modalConfirmacionHoras,
    mostrarExplicacionProgramada,
    mostrarExplicacionPorHoras,
    mostrarConfirmacionProgramada,
    mostrarConfirmacionHoras,
    cerrarModales
  };
};