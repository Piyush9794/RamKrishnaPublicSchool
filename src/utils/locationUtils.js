/**
 * Real location utility for reverse geocoding live GPS coordinates to address names
 * Strictly relies on browser geolocation permission & live OpenStreetMap API
 */

export const getAddressFromCoordinates = async (latitude, longitude) => {
  if (!latitude || !longitude) return 'Coordinates Unavailable';

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
      {
        signal: controller.signal,
        headers: {
          'Accept-Language': 'en',
        },
      }
    );
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (data && data.address) {
        const addr = data.address;
        const main = addr.amenity || addr.building || addr.road || addr.suburb || addr.neighbourhood;
        const city = addr.city || addr.town || addr.village || addr.county;
        const state = addr.state;

        const parts = [main, city, state].filter(Boolean);
        if (parts.length > 0) {
          return parts.join(', ');
        }
      }
      if (data && data.display_name) {
        return data.display_name.split(',').slice(0, 3).join(', ');
      }
    }
  } catch (err) {
    console.warn('Live location geocoding lookup failed:', err);
  }

  // Real GPS coordinate string when place name lookup is unavailable
  return `${latitude.toFixed(6)}°N, ${longitude.toFixed(6)}°E`;
};
