import appConfig from '../config/appConfig';
import toast from '../utils/toast';

// Centralized API error handler
export const handleApiError = (error, showToast = true) => {
  if (!error) return 'An unknown error occurred';

  // Network error
  if (!error.response) {
    const msg = 'Network error. Please check your connection.';
    if (showToast) toast.error(msg);
    return msg;
  }

  const { status, data } = error.response;

  let message = data?.message || data?.error || 'An error occurred';

  switch (status) {
    case 400:
      message = data?.message || 'Invalid request. Please check your data.';
      break;
    case 401:
      message = 'Session expired. Please login again.';
      break;
    case 403:
      message = 'You do not have permission to perform this action.';
      break;
    case 404:
      message = data?.message || 'Resource not found.';
      break;
    case 409:
      message = data?.message || 'Conflict. This record already exists.';
      break;
    case 422:
      message = data?.message || 'Validation failed. Please check your input.';
      break;
    case 429:
      message = 'Too many requests. Please try again later.';
      break;
    case 500:
      message = 'Server error. Please try again later.';
      break;
    case 503:
      message = 'Service unavailable. Please try again later.';
      break;
    default:
      message = data?.message || `Error ${status}: Something went wrong.`;
  }

  if (showToast) toast.error(message);
  return message;
};

// Extract validation errors from API response
export const extractValidationErrors = (error) => {
  if (!error?.response?.data?.errors) return {};
  const errors = {};
  const apiErrors = error.response.data.errors;
  if (Array.isArray(apiErrors)) {
    apiErrors.forEach(({ field, message }) => {
      errors[field] = message;
    });
  }
  return errors;
};
