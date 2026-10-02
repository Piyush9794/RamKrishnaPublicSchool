// Form validators
export const required = (value) => {
  if (value === null || value === undefined || value === '') return 'This field is required';
  if (Array.isArray(value) && value.length === 0) return 'This field is required';
  return true;
};

export const email = (value) => {
  if (!value) return true; // Let required handle empty
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value) || 'Please enter a valid email address';
};

export const phone = (value) => {
  if (!value) return true;
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(String(value).replace(/\D/g, '')) || 'Please enter a valid 10-digit mobile number';
};

export const minLength = (min) => (value) => {
  if (!value) return true;
  return value.length >= min || `Minimum ${min} characters required`;
};

export const maxLength = (max) => (value) => {
  if (!value) return true;
  return value.length <= max || `Maximum ${max} characters allowed`;
};

export const minValue = (min) => (value) => {
  if (!value && value !== 0) return true;
  return Number(value) >= min || `Minimum value is ${min}`;
};

export const maxValue = (max) => (value) => {
  if (!value && value !== 0) return true;
  return Number(value) <= max || `Maximum value is ${max}`;
};

export const password = (value) => {
  if (!value) return true;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(value) || 'Password must be at least 8 characters with uppercase, lowercase, and number';
};

export const confirmPassword = (password) => (value) => {
  return value === password || 'Passwords do not match';
};

export const url = (value) => {
  if (!value) return true;
  try {
    new URL(value);
    return true;
  } catch {
    return 'Please enter a valid URL';
  }
};

export const pincode = (value) => {
  if (!value) return true;
  return /^\d{6}$/.test(String(value)) || 'Please enter a valid 6-digit pincode';
};

export const numeric = (value) => {
  if (!value) return true;
  return !isNaN(Number(value)) || 'Please enter a valid number';
};

export const positiveNumber = (value) => {
  if (!value) return true;
  return (Number(value) > 0) || 'Please enter a positive number';
};

export const aadhaar = (value) => {
  if (!value) return true;
  return /^\d{12}$/.test(String(value)) || 'Please enter a valid 12-digit Aadhaar number';
};
