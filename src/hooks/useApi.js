import { useState, useCallback } from 'react';
import { handleApiError } from '../utils/errorHandler';

/**
 * Generic API hook for data fetching
 * @param {Function} apiCall - The API function to call
 * @returns {{ data, isLoading, error, execute, reset }}
 */
const useApi = (apiCall) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (...args) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await apiCall(...args);
        setData(response.data);
        return response.data;
      } catch (err) {
        const message = handleApiError(err, false);
        setError(message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [apiCall]
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return { data, isLoading, error, execute, reset };
};

export default useApi;
