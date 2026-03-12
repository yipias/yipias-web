// src/components/Admin/Reservas/ModalCliente.jsx
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { X, ExternalLink, Users } from 'lucide-react';
import './ModalCliente.css';

const ModalCliente = ({ reserva, onClose }) => {
  const [usuarioData, setUsuarioData] = useState(null);

  useEffect(() => {
    const fetchUsuario = async () => {
      if (!reserva?.email) return;
      try {
        const { collection, query, where, getDocs } = await import('firebase/firestore');
        const { db } = await import('../../../firebase/config');
        const q = query(collection(db, 'usuarios'), where('email', '==', reserva.email));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const data = querySnapshot.docs[0].data();
          setUsuarioData({
            nombres: data.nombres,
            nombreCompleto: data.nombreCompleto
          });
        }
      } catch (error) {
        console.error('Error cargando datos del usuario:', error);
      }
    };
    fetchUsuario();
  }, [reserva?.email]);

  const calcularPagoConductor = (precio) => {
    const valor = parseFloat(precio?.replace('S/ ', '') || 0);
    return (valor * 0.85).toFixed(2);
  };

  const calcularValorKm = (precio, distancia) => {
    const conductor = parseFloat(calcularPagoConductor(precio));
    const km = parseFloat(distancia?.replace(' km', '') || 0);
    if (!km) return '—';
    return 'S/ ' + (conductor / km).toFixed(2) + '/km';
  };

  const formatFecha = (fecha) => {
    if (!fecha) return '—';
    const [year, month, day] = fecha.split('-');
    return `${day}/${month}/${year}`;
  };

  const nombreCliente = usuarioData?.nombres || usuarioData?.nombreCompleto?.split(' ')[0] || 'Cliente';
  const pasajeros = reserva.pasajeros || 1;
  const observaciones = reserva.observaciones || '';

  return ReactDOM.createPortal(
    <div className="cliente-modal-overlay" onClick={onClose}>
      <div className="cliente-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="cliente-modal-header">
          <img src="/img/YipiAs_logo.png" alt="YipiAs" className="cliente-modal-logo" />
          <h2>Solicitud de Viaje</h2>
          <button className="cliente-modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="cliente-modal-body">

          <div className="cliente-info-section compacto">
            <h3>Cliente</h3>
            <span className="cliente-nombre">{nombreCliente}</span>
          </div>

          <div className="cliente-viaje-section">
            <h3>Datos del Viaje</h3>

            <div className="cliente-campo">
              <div className="cliente-campo-contenido">
                <label>Origen</label>
                <span>{reserva.lugarRecojo || '—'}</span>
              </div>
            </div>

            <div className="cliente-campo">
              <div className="cliente-campo-contenido">
                <label>Destino</label>
                <span>{reserva.destino || '—'}</span>
              </div>
            </div>

            <div className="cliente-campo-fecha-hora-pasajeros-linea">
              <div className="cliente-campo-contenido">
                <label>Fecha</label>
                <span className="fecha">{formatFecha(reserva.fechaViaje || reserva.fechaServicio)}</span>
              </div>
              <div className="cliente-campo-separador">·</div>
              <div className="cliente-campo-contenido">
                <label>Hora</label>
                <span>{reserva.horaOriginal || reserva.horaInicio || '—'}</span>
              </div>
              <div className="cliente-campo-separador">·</div>
              <div className="cliente-campo-contenido pasajeros">
                <label><Users size={12} /> Pas.</label>
                <span>{pasajeros}</span>
              </div>
            </div>

            {observaciones && (
              <div className="cliente-observaciones">
                <label>Observaciones</label>
                <div className="cliente-observaciones-texto">{observaciones}</div>
              </div>
            )}

            {reserva.mapsLink && (
              <a href={reserva.mapsLink} target="_blank" rel="noopener noreferrer" className="cliente-maps-link">
                <ExternalLink size={16} />
                Ver ruta en Google Maps
              </a>
            )}
          </div>

          <div className="cliente-pago-section">
            <h3>Información de Pago</h3>
            <div className="cliente-pago-grid">
              <div className="cliente-campo-contenido">
                <label>Paga el cliente</label>
                <span className="cliente-total">{reserva.precio}</span>
              </div>
              <div className="cliente-campo-contenido">
                <label>Para conductor</label>
                <span className="cliente-conductor">S/ {calcularPagoConductor(reserva.precio)}</span>
              </div>
              <div className="cliente-campo-contenido">
                <label>Distancia</label>
                <span className="cliente-distancia">{reserva.distancia || '—'}</span>
              </div>
              <div className="cliente-campo-contenido">
                <label>Valor</label>
                <span className="cliente-valor">{calcularValorKm(reserva.precio, reserva.distancia)}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>,
    document.body
  );
};

export default ModalCliente;