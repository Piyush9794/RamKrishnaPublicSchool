import { useState, useEffect } from 'react';

/**
 * Debounce a value by delay milliseconds
 * @param {any} value - Value to debounce
 * @param {number} delay - Delay in ms (default 400)
 */
const useDebounce = (value, delay = 400) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
