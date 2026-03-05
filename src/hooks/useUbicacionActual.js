// src/hooks/useUbicacionActual.js
import { useCallback } from 'react';

export const useUbicacionActual = () => {
  const obtenerUbicacionActual = useCallback(async (inputElement, buttonElement, mapInstance) => {

    if (!navigator.geolocation) {
      throw new Error('GEOLOCATION_NOT_SUPPORTED');
    }

    // 🔥 Verificar estado del permiso antes
    if (navigator.permissions) {
      const permission = await navigator.permissions.query({ name: 'geolocation' });

      if (permission.state === 'denied') {
        throw new Error('PERMISSION_DENIED_BLOCKED');
      }
    }

    if (buttonElement) {
      buttonElement.classList.add('loading');
      buttonElement.style.pointerEvents = 'none';
    }

    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          resolve,
          reject,
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
          }
        );
      });

      const userLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      if (!window.google?.maps) {
        throw new Error('GOOGLE_NOT_READY');
      }

      const geocoder = new window.google.maps.Geocoder();

      const results = await new Promise((resolve, reject) => {
        geocoder.geocode({ location: userLocation }, (results, status) => {
          if (status === 'OK' && results[0]) {
            resolve(results);
          } else {
            reject(new Error('GEOCODER_FAILED'));
          }
        });
      });

      const address = results[0].formatted_address;

      if (inputElement) inputElement.value = address;

      if (mapInstance) {
        mapInstance.setCenter(userLocation);
        mapInstance.setZoom(15);
      }

      return {
        address,
        location: userLocation
      };

    } catch (error) {

      // Traducimos errores técnicos a códigos manejables
      if (error.code === 1) {
        throw new Error('PERMISSION_DENIED');
      }
      if (error.code === 2) {
        throw new Error('POSITION_UNAVAILABLE');
      }
      if (error.code === 3) {
        throw new Error('TIMEOUT');
      }

      throw error;

    } finally {
      if (buttonElement) {
        buttonElement.classList.remove('loading');
        buttonElement.style.pointerEvents = 'auto';
      }
    }

  }, []);

  return { obtenerUbicacionActual };
};