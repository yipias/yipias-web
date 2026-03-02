// src/pages/MisReservas.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useReservasUsuario } from '../hooks/useReservasUsuario';
import TarjetaReserva from '../components/Reservas/TarjetaReserva';
import './MisReservas.css';

const MisReservas = () => {
  const { currentUser } = useAuth();
  const { reservas, loading } = useReservasUsuario();

  const handleGuardarCambios = (reservaId, nuevosDatos) => {
    console.log('Guardando cambios:', reservaId, nuevosDatos);
  };

  if (!currentUser) {
    return (
      <div className="mis-reservas-container">
        <div className="acceso-denegado">
          <h2>Acceso denegado</h2>
          <p>Debes iniciar sesión para ver tus reservas.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mis-reservas-container">
      <h1>Mis Reservas</h1>
      
      {loading ? (
        <div className="cargando">Cargando tus reservas...</div>
      ) : reservas.length === 0 ? (
        <div className="sin-reservas">
          <p>No tienes reservas aún.</p>
          <a href="/#/" className="btn-reservar">  {/* ← CAMBIADO */}
            Reservar ahora
          </a>
        </div>
      ) : (
        <div className="reservas-lista">
          {reservas.map(reserva => (
            <TarjetaReserva
              key={reserva.id}
              reserva={reserva}
              onGuardar={handleGuardarCambios}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MisReservas;