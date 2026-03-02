// src/components/Reservas/TarjetaReserva.jsx
import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, Calendar, Clock, Users, DollarSign, Car
} from 'lucide-react';
import './TarjetaReserva.css';

const TarjetaReserva = ({ reserva }) => {
  const mapRef = useRef(null);
  const [mapaListo, setMapaListo] = useState(false);
  const estado = reserva.estado || 'pendiente';

  // ===== INICIALIZAR MAPA =====
  useEffect(() => {
    if (!reserva.recojoLat || !reserva.recojoLng) return;

    const initMap = () => {
      if (!window.google?.maps || !mapRef.current) {
        setTimeout(initMap, 500);
        return;
      }

      try {
        const map = new window.google.maps.Map(mapRef.current, {
          center: { lat: reserva.recojoLat, lng: reserva.recojoLng },
          zoom: 13,
          disableDefaultUI: true,
          zoomControl: true,
          mapTypeControl: false,
          streetViewControl: false,
          styles: [
            { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
            { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
            { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{ color: '#38414e' }]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{ color: '#17263c' }]
            }
          ]
        });

        // Marcador de recojo (A)
        new window.google.maps.Marker({
          position: { lat: reserva.recojoLat, lng: reserva.recojoLng },
          map: map,
          icon: {
            url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
            scaledSize: new window.google.maps.Size(40, 40)
          },
          label: { text: 'A', color: 'white', fontSize: '14px', fontWeight: 'bold' }
        });

        // Marcador de destino (B) y ruta (si existe)
        if (reserva.destinoLat && reserva.destinoLng) {
          new window.google.maps.Marker({
            position: { lat: reserva.destinoLat, lng: reserva.destinoLng },
            map: map,
            icon: {
              url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
              scaledSize: new window.google.maps.Size(40, 40)
            },
            label: { text: 'B', color: 'white', fontSize: '14px', fontWeight: 'bold' }
          });

          // Dibujar ruta
          const directionsService = new window.google.maps.DirectionsService();
          const directionsRenderer = new window.google.maps.DirectionsRenderer({
            map: map,
            suppressMarkers: true,
            polylineOptions: { strokeColor: '#0d6efd', strokeWeight: 5 }
          });

          directionsService.route({
            origin: { lat: reserva.recojoLat, lng: reserva.recojoLng },
            destination: { lat: reserva.destinoLat, lng: reserva.destinoLng },
            travelMode: window.google.maps.TravelMode.DRIVING
          }, (result, status) => {
            if (status === 'OK') {
              directionsRenderer.setDirections(result);
            }
          });
        }

        setMapaListo(true);
      } catch (error) {
        console.error('Error al crear mapa:', error);
        setTimeout(initMap, 1000);
      }
    };

    initMap();
  }, [reserva.recojoLat, reserva.recojoLng, reserva.destinoLat, reserva.destinoLng]);

  // ===== FORMATEAR FECHAS - VERSIÓN CORREGIDA =====
  const formatFecha = (fecha) => {
    if (!fecha) return 'Fecha no disponible';
    
    try {
      // Caso 1: Ya viene formateada como "DD/MM/YYYY"
      if (typeof fecha === 'string' && fecha.includes('/')) {
        return fecha; // Devolver exactamente como está
      }
      
      // Caso 2: Viene de Firebase (timestamp)
      if (fecha?.seconds) {
        const date = new Date(fecha.seconds * 1000);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      }
      
      // Caso 3: Viene como string ISO "2026-03-01"
      if (typeof fecha === 'string' && fecha.includes('-')) {
        const [year, month, day] = fecha.split('-');
        return `${day}/${month}/${year}`;
      }
      
      // Caso 4: Cualquier otro caso
      const date = new Date(fecha);
      if (!isNaN(date.getTime())) {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      }
      
      return 'Fecha no disponible';
    } catch (error) {
      console.error('Error formateando fecha:', error);
      return 'Fecha no disponible';
    }
  };

  // ===== ESTADO DE LA RESERVA =====
  const getEstadoInfo = () => {
    switch(estado) {
      case 'confirmado':
        return {
          texto: 'Confirmado',
          desc: 'Reserva confirmada',
          color: '#4caf50',
          bg: 'rgba(76, 175, 80, 0.15)'
        };
      default:
        return {
          texto: 'Pendiente',
          desc: 'En espera de confirmación',
          color: '#ffc107',
          bg: 'rgba(255, 193, 7, 0.15)'
        };
    }
  };

  const estadoInfo = getEstadoInfo();

  return (
    <div className={`tarjeta-reserva ${estado}`}>
      {/* HEADER */}
      <div className="tarjeta-header">
        <div className="estado-badge" style={{ 
          backgroundColor: estadoInfo.bg,
          color: estadoInfo.color,
          borderColor: estadoInfo.color
        }}>
          <span className="estado-texto">{estadoInfo.texto}</span>
          <span className="estado-desc">{estadoInfo.desc}</span>
        </div>
        <span className="fecha-reserva">{formatFecha(reserva.fechaReserva)}</span>
      </div>

      {/* CONTENIDO: MAPA + DATOS */}
      <div className="tarjeta-contenido">
        {/* MAPA */}
        {reserva.recojoLat && reserva.recojoLng && (
          <div className="mapa-contenedor">
            <div 
              ref={mapRef} 
              className="mapa"
              style={{ width: '100%', height: '250px', borderRadius: '12px' }}
            />
            {!mapaListo && (
              <div className="mapa-loading">
                <div className="spinner"></div>
                <p>Cargando mapa...</p>
              </div>
            )}
          </div>
        )}

        {/* DATOS */}
        <div className="datos-contenedor">
          <div className="info-item">
            <MapPin size={18} className="icon" />
            <div>
              <span className="label">De:</span>
              <span className="value">{reserva.lugarRecojo}</span>
            </div>
          </div>
          
          {reserva.tipoReserva === 'programada' && reserva.destino && (
            <div className="info-item">
              <MapPin size={18} className="icon" style={{ color: '#dc3545' }} />
              <div>
                <span className="label">Para:</span>
                <span className="value">{reserva.destino}</span>
              </div>
            </div>
          )}

          <div className="info-item">
            <Calendar size={18} className="icon" />
            <div>
              <span className="label">Fecha del viaje:</span>
              <span className="value">{formatFecha(reserva.fechaViaje || reserva.fechaServicio)}</span>
            </div>
          </div>

          <div className="info-item">
            <Clock size={18} className="icon" />
            <div>
              <span className="label">Hora de inicio:</span>
              <span className="value">{reserva.horaOriginal || reserva.horaInicio}</span>
            </div>
          </div>

          <div className="info-item">
            <Users size={18} className="icon" />
            <div>
              <span className="label">Pasajeros:</span>
              <span className="value">{reserva.pasajeros}</span>
            </div>
          </div>

          {reserva.tipoReserva === 'horas' && (
            <div className="info-item">
              <Clock size={18} className="icon" />
              <div>
                <span className="label">Horas contratadas:</span>
                <span className="value">{reserva.horasContratadas}</span>
              </div>
            </div>
          )}

          <div className="info-item precio">
            <DollarSign size={18} className="icon" />
            <div>
              <span className="label">Total:</span>
              <span className="value">{reserva.precio}</span>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="tarjeta-footer">
        {estado === 'confirmado' && (
          <button className="btn-conductor">
            <Car size={16} /> Ver conductor
          </button>
        )}
        {reserva.mapsLink && (
          <a 
            href={reserva.mapsLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-maps"
          >
            Ver en Google Maps
          </a>
        )}
      </div>
    </div>
  );
};

export default TarjetaReserva;