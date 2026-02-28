// src/components/Reservas/ReservasTabs.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useLimpiarInputs } from '../../hooks/useLimpiarInputs';
import { useFormatoHora } from '../../hooks/useFormatoHora';
import { useFechaMinima } from '../../hooks/useFechaMinima';
import { useValidaciones } from '../../hooks/useValidaciones';
import { useUbicacionActual } from '../../hooks/useUbicacionActual';
import { useModales } from '../../hooks/useModales';
import { useFirebaseReservas } from '../../hooks/useFirebaseReservas';
import FormularioProgramada from './FormularioProgramada';
import FormularioPorHoras from './FormularioPorHoras';
import MapaOriginal from './MapaOriginal';
// Modales
import ExplicacionProgramada from '../Modals/ExplicacionProgramada';
import ExplicacionPorHoras from '../Modals/ExplicacionPorHoras';
import ConfirmacionProgramada from '../Modals/ConfirmacionProgramada';
import ConfirmacionPorHoras from '../Modals/ConfirmacionPorHoras';
import './Reservas.css';

// Importar funciones de cálculo
import { obtenerTarifaKm, obtenerTarifaHoras } from '../../utils/calculos';

const ReservasTabs = () => {
  useLimpiarInputs();
  useFormatoHora();
  useFechaMinima();
  const { validarFechaHoraReserva, validarPasajeros } = useValidaciones();
  const { obtenerUbicacionActual } = useUbicacionActual();
  const modales = useModales();
  const { guardarReservaProgramada, guardarReservaHoras } = useFirebaseReservas();
  
  const [activeTab, setActiveTab] = useState('');
  const [selectedInput, setSelectedInput] = useState(null);
  const [activeMode, setActiveMode] = useState(null);
  const [pickupAddress, setPickupAddress] = useState('');
  const [dropoffAddress, setDropoffAddress] = useState('');
  const [horasAddress, setHorasAddress] = useState('');
  const [pickupLocation, setPickupLocation] = useState(null);
  const [dropoffLocation, setDropoffLocation] = useState(null);
  const [horasLocation, setHorasLocation] = useState(null);
  const [markers, setMarkers] = useState({
    pickup: null,
    dropoff: null,
    horas: null
  });
  
  const mapRef = useRef(null);
  const directionsRendererRef = useRef(null);
  const autocompleteRefs = useRef({
    pickup: null,
    dropoff: null,
    horas: null
  });

  // ===== FUNCIÓN PARA LIMPIAR FORMULARIO =====
  const limpiarFormulario = () => {
    // Limpiar estados de direcciones
    setPickupAddress('');
    setDropoffAddress('');
    setHorasAddress('');
    
    // Limpiar ubicaciones
    setPickupLocation(null);
    setDropoffLocation(null);
    setHorasLocation(null);
    
    // Limpiar marcadores del mapa
    if (markers.pickup) {
      markers.pickup.setMap(null);
    }
    if (markers.dropoff) {
      markers.dropoff.setMap(null);
    }
    if (markers.horas) {
      markers.horas.setMap(null);
    }
    
    setMarkers({
      pickup: null,
      dropoff: null,
      horas: null
    });
    
    // Limpiar inputs del DOM
    const inputs = [
      'progNombres', 'progApellidos', 'progDni',
      'progNombresRep', 'progRazonSocial', 'progRuc',
      'progTelefono', 'pickup', 'dropoff', 'progPax',
      'horasNombres', 'horasApellidos', 'horasDni',
      'horasNombresRep', 'horasRazonSocial', 'horasRuc',
      'horasTelefono', 'horasRecojo', 'horasPax'
    ];
    
    inputs.forEach(id => {
      const input = document.getElementById(id);
      if (input) input.value = '';
    });
    
    // Resetear selects
    const horasSelect = document.getElementById('horasCantidad');
    if (horasSelect) horasSelect.value = '3';
    
    // Resetear fechas a hoy
    const progFecha = document.getElementById('progFecha');
    const horasFecha = document.getElementById('horasFecha');
    const hoy = new Date().toISOString().split('T')[0];
    
    if (progFecha) progFecha.value = hoy;
    if (horasFecha) horasFecha.value = hoy;
    
    // Limpiar inputs de hora
    const progHora = document.getElementById('progHoraInput');
    const horasHora = document.getElementById('horasHoraInput');
    if (progHora) progHora.value = '';
    if (horasHora) horasHora.value = '';
    
    // Limpiar hiddens de hora
    const progHoraHidden = document.getElementById('progHoraInicio');
    const horasHoraHidden = document.getElementById('horasHoraInicio');
    if (progHoraHidden) progHoraHidden.value = '';
    if (horasHoraHidden) horasHoraHidden.value = '';
    
    // Limpiar distancia y precio
    const progDistance = document.getElementById('progDistance');
    const progPrice = document.getElementById('progPrice');
    const horasPrice = document.getElementById('horasPrice');
    
    if (progDistance) progDistance.textContent = '—';
    if (progPrice) progPrice.textContent = 'S/ 0.00';
    if (horasPrice) horasPrice.textContent = 'S/ 75.00';
    
    // Limpiar ruta del mapa
    if (directionsRendererRef.current) {
      directionsRendererRef.current.setMap(null);
      directionsRendererRef.current = null;
    }
    
    console.log('🧹 Formulario limpiado');
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === 'programada') {
      modales.mostrarExplicacionProgramada();
    } else {
      modales.mostrarExplicacionPorHoras();
    }
  };

  // Función para agregar marcador
  const addMarker = (type, location, address, placeName = null) => {
    if (!mapRef.current || !window.google) return;
    
    if (markers[type]) {
      markers[type].setMap(null);
    }
    
    const title = type === 'pickup' ? 'Punto de recojo' : 
                  type === 'dropoff' ? 'Destino final' : 'Punto de recojo (horas)';
    
    const markerTitle = placeName || title;
    
    const markerConfig = {
      position: location,
      map: mapRef.current,
      title: markerTitle,
      icon: {
        url: type === 'pickup' ? 'http://maps.google.com/mapfiles/ms/icons/green-dot.png' :
             type === 'dropoff' ? 'http://maps.google.com/mapfiles/ms/icons/red-dot.png' :
             'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
        scaledSize: new window.google.maps.Size(40, 40)
      },
      label: {
        text: type === 'pickup' ? 'A' : type === 'dropoff' ? 'B' : 'H',
        color: 'white',
        fontSize: '14px',
        fontWeight: 'bold'
      }
    };
    
    const newMarker = new window.google.maps.Marker(markerConfig);
    
    setMarkers(prev => ({
      ...prev,
      [type]: newMarker
    }));
  };

  // Función para calcular distancia y precio
  const calculateDistanceAndPrice = (origin, destination) => {
    if (!mapRef.current || !window.google || !origin || !destination) return;

    const directionsService = new window.google.maps.DirectionsService();
    
    directionsService.route(
      {
        origin,
        destination,
        travelMode: window.google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === 'OK') {
          if (directionsRendererRef.current) {
            directionsRendererRef.current.setMap(null);
          }
          
          directionsRendererRef.current = new window.google.maps.DirectionsRenderer({
            map: mapRef.current,
            suppressMarkers: true,
            polylineOptions: {
              strokeColor: '#0d6efd',
              strokeWeight: 6,
              strokeOpacity: 1
            }
          });
          
          directionsRendererRef.current.setDirections(result);
          
          const distance = result.routes[0].legs[0].distance.value / 1000;
          const paxInput = document.getElementById('progPax');
          let pax = 1;
          
          if (paxInput) {
            pax = parseInt(paxInput.value) || 1;
            if (pax > 6) pax = 6;
            if (pax < 1) pax = 1;
          }
          
          const distanceSpan = document.getElementById('progDistance');
          if (distanceSpan) {
            distanceSpan.textContent = distance.toFixed(2) + ' km';
          }
          
          try {
            const tarifa = obtenerTarifaKm(distance, pax);
            const priceSpan = document.getElementById('progPrice');
            if (priceSpan && tarifa) {
              priceSpan.textContent = `S/ ${tarifa}.00`;
              console.log(`📊 Distancia: ${distance}km, Pasajeros: ${pax}, Tarifa: S/ ${tarifa}.00`);
            }
          } catch (error) {
            console.log('Error calculando tarifa:', error);
            if (error.message.includes('máximo')) {
              document.getElementById('progPax').value = 6;
            }
          }
        }
      }
    );
  };

  // ===== EFECTO PARA ACTUALIZAR PRECIO EN TIEMPO REAL (PROGRAMADA) =====
  useEffect(() => {
    if (activeTab !== 'programada') return;
    
    const paxInput = document.getElementById('progPax');
    const distanceSpan = document.getElementById('progDistance');
    const priceSpan = document.getElementById('progPrice');
    
    if (!paxInput || !distanceSpan || !priceSpan) return;
    
    const handlePaxChange = () => {
      const distanceText = distanceSpan.textContent;
      if (!distanceText || distanceText === '—') return;
      
      const kmMatch = distanceText.match(/([\d.]+)/);
      if (!kmMatch) return;
      
      const km = parseFloat(kmMatch[0]);
      let pax = parseInt(paxInput.value) || 1;
      
      if (pax > 6) pax = 6;
      if (pax < 1) pax = 1;
      
      try {
        const tarifa = obtenerTarifaKm(km, pax);
        if (tarifa) {
          priceSpan.textContent = `S/ ${tarifa}.00`;
          console.log(`🔄 Tiempo real - Km: ${km}, Pasajeros: ${pax}, Tarifa: S/ ${tarifa}.00`);
        }
      } catch (error) {
        console.log('Error actualizando precio:', error);
      }
    };
    
    paxInput.addEventListener('change', handlePaxChange);
    paxInput.addEventListener('input', handlePaxChange);
    
    return () => {
      paxInput.removeEventListener('change', handlePaxChange);
      paxInput.removeEventListener('input', handlePaxChange);
    };
  }, [activeTab]);

  // ===== EFECTO PARA ACTUALIZAR PRECIO EN TIEMPO REAL (POR HORAS) =====
  useEffect(() => {
    if (activeTab !== 'porhoras') return;
    
    const paxInput = document.getElementById('horasPax');
    const horasSelect = document.getElementById('horasCantidad');
    const priceSpan = document.getElementById('horasPrice');
    
    if (!paxInput || !horasSelect || !priceSpan) return;
    
    const handleChange = () => {
      const horas = parseInt(horasSelect.value);
      let pax = parseInt(paxInput.value) || 1;
      
      if (pax > 6) pax = 6;
      if (pax < 1) pax = 1;
      
      try {
        const tarifa = obtenerTarifaHoras(horas, pax);
        if (tarifa) {
          priceSpan.textContent = `S/ ${tarifa}.00`;
          console.log(`⏰ Tiempo real - Horas: ${horas}, Pasajeros: ${pax}, Tarifa: S/ ${tarifa}.00`);
        }
      } catch (error) {
        console.log('Error actualizando precio:', error);
      }
    };
    
    paxInput.addEventListener('change', handleChange);
    paxInput.addEventListener('input', handleChange);
    horasSelect.addEventListener('change', handleChange);
    
    handleChange();
    
    return () => {
      paxInput.removeEventListener('change', handleChange);
      paxInput.removeEventListener('input', handleChange);
      horasSelect.removeEventListener('change', handleChange);
    };
  }, [activeTab]);

  // Configurar autocompletados
  useEffect(() => {
    if (!mapRef.current || !window.google) return;

    if (autocompleteRefs.current.pickup) {
      window.google.maps.event.clearInstanceListeners(autocompleteRefs.current.pickup);
    }
    if (autocompleteRefs.current.dropoff) {
      window.google.maps.event.clearInstanceListeners(autocompleteRefs.current.dropoff);
    }
    if (autocompleteRefs.current.horas) {
      window.google.maps.event.clearInstanceListeners(autocompleteRefs.current.horas);
    }

    const pickupInput = document.getElementById('pickup');
    if (pickupInput) {
      const pickupAutocomplete = new window.google.maps.places.Autocomplete(pickupInput, {
        fields: ['place_id', 'geometry', 'formatted_address', 'name'],
        componentRestrictions: { country: 'pe' },
        types: ['geocode', 'establishment'],
        bounds: new window.google.maps.LatLngBounds(
          new window.google.maps.LatLng(-5.5, -81.5),
          new window.google.maps.LatLng(-4.5, -80.0)
        ),
        strictBounds: true
      });
      
      pickupAutocomplete.addListener('place_changed', () => {
        const place = pickupAutocomplete.getPlace();
        if (place?.geometry) {
          const location = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          };
          const displayName = place.name || place.formatted_address;
          setPickupAddress(displayName);
          setPickupLocation(location);
          addMarker('pickup', location, displayName, place.name);
          
          if (dropoffLocation) {
            calculateDistanceAndPrice(location, dropoffLocation);
          }
        }
      });
      
      autocompleteRefs.current.pickup = pickupAutocomplete;
    }

    const dropoffInput = document.getElementById('dropoff');
    if (dropoffInput) {
      const dropoffAutocomplete = new window.google.maps.places.Autocomplete(dropoffInput, {
        fields: ['place_id', 'geometry', 'formatted_address', 'name'],
        componentRestrictions: { country: 'pe' },
        types: ['geocode', 'establishment']
      });
      
      dropoffAutocomplete.addListener('place_changed', () => {
        const place = dropoffAutocomplete.getPlace();
        if (place?.geometry) {
          const location = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          };
          const displayName = place.name || place.formatted_address;
          setDropoffAddress(displayName);
          setDropoffLocation(location);
          addMarker('dropoff', location, displayName, place.name);
          
          if (pickupLocation) {
            calculateDistanceAndPrice(pickupLocation, location);
          }
        }
      });
      
      autocompleteRefs.current.dropoff = dropoffAutocomplete;
    }

    const horasInput = document.getElementById('horasRecojo');
    if (horasInput) {
      const horasAutocomplete = new window.google.maps.places.Autocomplete(horasInput, {
        fields: ['place_id', 'geometry', 'formatted_address', 'name'],
        componentRestrictions: { country: 'pe' },
        types: ['geocode', 'establishment'],
        bounds: new window.google.maps.LatLngBounds(
          new window.google.maps.LatLng(-5.5, -81.5),
          new window.google.maps.LatLng(-4.5, -80.0)
        ),
        strictBounds: true
      });
      
      horasAutocomplete.addListener('place_changed', () => {
        const place = horasAutocomplete.getPlace();
        if (place?.geometry) {
          const location = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          };
          const displayName = place.name || place.formatted_address;
          setHorasAddress(displayName);
          setHorasLocation(location);
          addMarker('horas', location, displayName, place.name);
        }
      });
      
      autocompleteRefs.current.horas = horasAutocomplete;
    }

    return () => {
      if (autocompleteRefs.current.pickup) {
        window.google.maps.event.clearInstanceListeners(autocompleteRefs.current.pickup);
      }
      if (autocompleteRefs.current.dropoff) {
        window.google.maps.event.clearInstanceListeners(autocompleteRefs.current.dropoff);
      }
      if (autocompleteRefs.current.horas) {
        window.google.maps.event.clearInstanceListeners(autocompleteRefs.current.horas);
      }
    };
  }, [mapRef.current, activeTab]);

  const handleMapReady = (map) => {
    mapRef.current = map;
  };

  const handlePlaceSelected = (inputType, address, location, placeName = null) => {
    if (inputType === 'pickup') {
      setPickupAddress(address);
      setPickupLocation(location);
      addMarker('pickup', location, address, placeName);
      
      if (dropoffLocation) {
        calculateDistanceAndPrice(location, dropoffLocation);
      }
    } else if (inputType === 'dropoff') {
      setDropoffAddress(address);
      setDropoffLocation(location);
      addMarker('dropoff', location, address, placeName);
      
      if (pickupLocation) {
        calculateDistanceAndPrice(pickupLocation, location);
      }
    } else if (inputType === 'horas') {
      setHorasAddress(address);
      setHorasLocation(location);
      addMarker('horas', location, address, placeName);
    }
    setSelectedInput(null);
    setActiveMode(null);
  };

  const handleSelectInMap = (inputType) => {
    setSelectedInput(inputType);
    setActiveMode(inputType);
  };

  const handleUbicacionActualPickup = async (buttonElement) => {
    const inputElement = document.getElementById('pickup');
    try {
      const result = await obtenerUbicacionActual(
        inputElement, 
        buttonElement, 
        mapRef.current
      );
      
      if (result) {
        setPickupAddress(result.address);
        setPickupLocation(result.location);
        addMarker('pickup', result.location, result.address);
        
        if (dropoffLocation) {
          calculateDistanceAndPrice(result.location, dropoffLocation);
        }
      }
    } catch (error) {
      console.log('Error en ubicación actual:', error);
    }
  };

  const handleUbicacionActualHoras = async (buttonElement) => {
    const inputElement = document.getElementById('horasRecojo');
    try {
      const result = await obtenerUbicacionActual(
        inputElement, 
        buttonElement, 
        mapRef.current
      );
      
      if (result) {
        setHorasAddress(result.address);
        setHorasLocation(result.location);
        addMarker('horas', result.location, result.address);
      }
    } catch (error) {
      console.log('Error en ubicación actual:', error);
    }
  };

  const handleReservaProgramada = async () => {
    const fecha = document.getElementById('progFecha')?.value;
    const hora = document.getElementById('progHoraInicio')?.value;
    const pax = parseInt(document.getElementById('progPax')?.value) || 1;
    
    if (pax < 1 || pax > 6) {
      alert('El número de pasajeros debe ser entre 1 y 6');
      return;
    }
    
    const nombres = document.getElementById('progNombres')?.value;
    const apellidos = document.getElementById('progApellidos')?.value;
    const dni = document.getElementById('progDni')?.value;
    const telefono = document.getElementById('progTelefono')?.value;
    const recojo = document.getElementById('pickup')?.value;
    const destino = document.getElementById('dropoff')?.value;
    const distancia = document.getElementById('progDistance')?.textContent || '—';
    const precio = document.getElementById('progPrice')?.textContent || 'S/ 0.00';
    
    const esNatural = document.querySelector('#formProgramada .persona-btn.active')?.textContent.includes('Natural');
    
    if (!validarFechaHoraReserva(fecha, hora)) return;
    if (!validarPasajeros(pax)) return;
    if (!nombres || !apellidos || !dni || !telefono || !recojo || !destino) {
      alert('Por favor completa todos los campos');
      return;
    }
    
    let recojoLat = null, recojoLng = null, destinoLat = null, destinoLng = null;
    
    if (pickupLocation) {
      recojoLat = pickupLocation.lat;
      recojoLng = pickupLocation.lng;
    }
    
    if (dropoffLocation) {
      destinoLat = dropoffLocation.lat;
      destinoLng = dropoffLocation.lng;
    }
    
    const mapsLink = (recojoLat && recojoLng && destinoLat && destinoLng) 
      ? `https://www.google.com/maps/dir/${recojoLat},${recojoLng}/${destinoLat},${destinoLng}`
      : null;
    
    const datosReserva = {
      tipoPersona: esNatural ? 'natural' : 'juridica',
      nombres: nombres,
      apellidos: apellidos,
      documento: dni,
      telefono: telefono,
      lugarRecojo: recojo,
      destino: destino,
      fechaViaje: fecha,
      horaInicio: hora,
      pasajeros: pax,
      distancia: distancia,
      precio: precio,
      recojoLat: recojoLat,
      recojoLng: recojoLng,
      destinoLat: destinoLat,
      destinoLng: destinoLng,
      mapsLink: mapsLink
    };
    
    const resultado = await guardarReservaProgramada(datosReserva);
    
    if (resultado.success) {
      modales.mostrarConfirmacionProgramada();
      limpiarFormulario(); // ← LIMPIAR DESPUÉS DE RESERVAR
    }
  };

  const handleReservaHoras = async () => {
    const fecha = document.getElementById('horasFecha')?.value;
    const hora = document.getElementById('horasHoraInicio')?.value;
    const pax = parseInt(document.getElementById('horasPax')?.value) || 1;
    
    if (pax < 1 || pax > 6) {
      alert('El número de pasajeros debe ser entre 1 y 6');
      return;
    }
    
    const nombres = document.getElementById('horasNombres')?.value;
    const apellidos = document.getElementById('horasApellidos')?.value;
    const dni = document.getElementById('horasDni')?.value;
    const telefono = document.getElementById('horasTelefono')?.value;
    const recojo = document.getElementById('horasRecojo')?.value;
    const horas = parseInt(document.getElementById('horasCantidad')?.value) || 3;
    const precio = document.getElementById('horasPrice')?.textContent || 'S/ 75.00';
    
    const esNatural = document.querySelector('#formPorHoras .persona-btn.active')?.textContent.includes('Natural');
    
    if (!validarFechaHoraReserva(fecha, hora)) return;
    if (!validarPasajeros(pax)) return;
    if (!nombres || !apellidos || !dni || !telefono || !recojo) {
      alert('Por favor completa todos los campos');
      return;
    }
    
    let recojoLat = null, recojoLng = null;
    
    if (horasLocation) {
      recojoLat = horasLocation.lat;
      recojoLng = horasLocation.lng;
    }
    
    const mapsLink = (recojoLat && recojoLng) 
      ? `https://www.google.com/maps/search/?api=1&query=${recojoLat},${recojoLng}`
      : null;
    
    const datosReserva = {
      tipoPersona: esNatural ? 'natural' : 'juridica',
      nombres: nombres,
      apellidos: apellidos,
      documento: dni,
      telefono: telefono,
      lugarRecojo: recojo,
      fechaServicio: fecha,
      horaInicio: hora,
      horasContratadas: horas,
      pasajeros: pax,
      precio: precio,
      recojoLat: recojoLat,
      recojoLng: recojoLng,
      mapsLink: mapsLink
    };
    
    const resultado = await guardarReservaHoras(datosReserva);
    
    if (resultado.success) {
      modales.mostrarConfirmacionHoras();
      limpiarFormulario(); // ← LIMPIAR DESPUÉS DE RESERVAR
    }
  };

  return (
    <section id="reservas" className="section">
      <div className="container">
        <h2 className="section-title">Reservas</h2>
        <p className="section-subtitle reveal">
          Las reservas pueden realizarse en cualquier momento, y con un mínimo de 30 minutos de anticipación.
        </p>
        
        <div className="tab-container reveal">
          <button 
            className={`tab-btn ${activeTab === 'programada' ? 'active' : ''}`}
            onClick={() => handleTabClick('programada')}
          >
            Reserva de punto a punto
          </button>
          <button 
            className={`tab-btn ${activeTab === 'porhoras' ? 'active' : ''}`}
            onClick={() => handleTabClick('porhoras')}
          >
            Reserva por horas
          </button>
        </div>

        <div className="grid">
          <div className="col form-col">
            {activeTab === 'programada' ? (
              <FormularioProgramada 
                pickupAddress={pickupAddress}
                dropoffAddress={dropoffAddress}
                setPickupAddress={setPickupAddress}
                setDropoffAddress={setDropoffAddress}
                onSelectInMap={handleSelectInMap}
                onReservar={handleReservaProgramada}
                onUbicacionActual={handleUbicacionActualPickup}
                activeMode={activeMode}
              />
            ) : activeTab === 'porhoras' ? (
              <FormularioPorHoras 
                horasAddress={horasAddress}
                setHorasAddress={setHorasAddress}
                onSelectInMap={handleSelectInMap}
                onReservar={handleReservaHoras}
                onUbicacionActual={handleUbicacionActualHoras}
                activeMode={activeMode}
              />
            ) : (
              <div className="form" style={{ padding: '2rem', textAlign: 'center' }}>
                <p>Selecciona un tipo de reserva para comenzar</p>
              </div>
            )}
          </div>
          
          <div className="col map-col">
            <div className="map">
              <MapaOriginal 
                onMapReady={handleMapReady}
                onMapClick={handlePlaceSelected}
                selectedInput={selectedInput}
              />
            </div>
          </div>
        </div>
      </div>

      {modales.modalExplicacionProgramada && (
        <ExplicacionProgramada onClose={modales.cerrarModales} />
      )}
      {modales.modalExplicacionHoras && (
        <ExplicacionPorHoras onClose={modales.cerrarModales} />
      )}
      {modales.modalConfirmacionProgramada && (
        <ConfirmacionProgramada onClose={modales.cerrarModales} />
      )}
      {modales.modalConfirmacionHoras && (
        <ConfirmacionPorHoras onClose={modales.cerrarModales} />
      )}
    </section>
  );
};

export default ReservasTabs;