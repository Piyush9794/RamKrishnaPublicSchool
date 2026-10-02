import { useState, useCallback, useRef } from 'react';
import { getAddressFromCoordinates } from '../utils/locationUtils';

const GEOLOCATION_ERRORS = {
  1: {
    code: 'PERMISSION_DENIED',
    message: 'Location permission denied. Please enable location access in your browser settings.',
  },
  2: {
    code: 'POSITION_UNAVAILABLE',
    message: 'Location information is unavailable. Please check your GPS or location settings.',
  },
  3: {
    code: 'TIMEOUT',
    message: 'Location request timed out. Please try again.',
  },
  UNSUPPORTED: {
    code: 'UNSUPPORTED',
    message: 'Your browser does not support geolocation. Please use a modern browser.',
  },
};

/**
 * Geolocation hook for requesting and managing browser location
 */
const useGeolocation = () => {
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [permissionState, setPermissionState] = useState('prompt'); // 'prompt' | 'granted' | 'denied'

  const watchIdRef = useRef(null);

  const clearWatch = useCallback(() => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
  }, []);

  /**
   * Request current position (one-shot)
   * ANY LOCATION is allowed — no geofencing
   */
  const requestLocation = useCallback(() => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        const err = GEOLOCATION_ERRORS.UNSUPPORTED;
        setError(err);
        setPermissionState('denied');
        reject(err);
        return;
      }

      setIsLoading(true);
      setError(null);

      const options = {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      };

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const locationName = await getAddressFromCoordinates(lat, lng);

          const locationData = {
            latitude: lat,
            longitude: lng,
            accuracy: position.coords.accuracy,
            altitude: position.coords.altitude,
            locationTimestamp: new Date(position.timestamp).toISOString(),
            locationName,
          };
          setLocation(locationData);
          setPermissionState('granted');
          setIsLoading(false);
          resolve(locationData);
        },
        (geolocationError) => {
          const err = GEOLOCATION_ERRORS[geolocationError.code] || {
            code: 'UNKNOWN',
            message: geolocationError.message || 'An unknown location error occurred.',
          };
          setError(err);
          setPermissionState(geolocationError.code === 1 ? 'denied' : 'prompt');
          setIsLoading(false);
          reject(err);
        },
        options
      );
    });
  }, []);

  const reset = useCallback(() => {
    setLocation(null);
    setError(null);
    setIsLoading(false);
    clearWatch();
  }, [clearWatch]);

  return {
    location,
    isLoading,
    error,
    permissionState,
    requestLocation,
    reset,
    clearWatch,
  };
};

export default useGeolocation;
