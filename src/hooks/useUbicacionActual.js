// src/hooks/useUbicacionActual.js
import { useCallback } from 'react';

export const useUbicacionActual = () => {
  const obtenerUbicacionActual = useCallback((inputElement, buttonElement, mapInstance) => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        alert('Tu navegador no soporta geolocalización');
        reject(new Error('Geolocalización no soportada'));
        return;
      }

      // Mostrar loading
      if (buttonElement) {
        buttonElement.classList.add('loading');
        buttonElement.style.pointerEvents = 'none';
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          try {
            // Usar Geocoder para obtener dirección
            const geocoder = new window.google.maps.Geocoder();
            
            geocoder.geocode({ location: userLocation }, (results, status) => {
              // Quitar loading
              if (buttonElement) {
                buttonElement.classList.remove('loading');
                buttonElement.style.pointerEvents = 'auto';
              }

              if (status === 'OK' && results[0]) {
                const address = results[0].formatted_address;
                
                // Actualizar input
                if (inputElement) {
                  inputElement.value = address;
                }

                // Centrar mapa
                if (mapInstance) {
                  mapInstance.setCenter(userLocation);
                  mapInstance.setZoom(15);
                }

                resolve({
                  address,
                  location: userLocation
                });
              } else {
                alert('No se pudo obtener la dirección de tu ubicación');
                reject(new Error('No se pudo obtener la dirección'));
              }
            });
          } catch (error) {
            if (buttonElement) {
              buttonElement.classList.remove('loading');
              buttonElement.style.pointerEvents = 'auto';
            }
            alert('Error al procesar tu ubicación');
            reject(error);
          }
        },
        (error) => {
          // Quitar loading
          if (buttonElement) {
            buttonElement.classList.remove('loading');
            buttonElement.style.pointerEvents = 'auto';
          }

          let mensaje = 'Error al obtener tu ubicación: ';
          switch(error.code) {
            case error.PERMISSION_DENIED:
              mensaje += 'Permiso denegado. Por favor activa la ubicación.';
              break;
            case error.POSITION_UNAVAILABLE:
              mensaje += 'Información de ubicación no disponible.';
              break;
            case error.TIMEOUT:
              mensaje += 'Tiempo de espera agotado.';
              break;
            default:
              mensaje += 'Error desconocido.';
          }
          alert(mensaje);
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    });
  }, []);

  return { obtenerUbicacionActual };
};