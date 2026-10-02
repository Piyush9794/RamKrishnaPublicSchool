import appConfig from '../config/appConfig';

// Currency formatter
export const formatCurrency = (amount, symbol = appConfig.currencySymbol) => {
  if (amount === null || amount === undefined) return `${symbol}0`;
  return `${symbol}${Number(amount).toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

// Number formatter
export const formatNumber = (num) => {
  if (num === null || num === undefined) return '0';
  return Number(num).toLocaleString('en-IN');
};

// Percentage formatter
export const formatPercentage = (value, total) => {
  if (!total) return '0%';
  return `${Math.round((value / total) * 100)}%`;
};

// Name formatter
export const formatName = (firstName, lastName, middleName = '') => {
  return [firstName, middleName, lastName].filter(Boolean).join(' ').trim();
};

// Phone formatter
export const formatPhone = (phone) => {
  if (!phone) return '-';
  const cleaned = String(phone).replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  return phone;
};

// File size formatter
export const formatFileSize = (bytes) => {
  if (!bytes) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  let size = bytes;
  let unitIndex = 0;
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }
  return `${size.toFixed(1)} ${units[unitIndex]}`;
};

// Roll number formatter
export const formatRollNumber = (classId, sectionId, rollNo) => {
  return `${classId}${sectionId}${String(rollNo).padStart(3, '0')}`;
};

// Truncate text
export const truncate = (text, maxLength = 50) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};

// Capitalize first letter
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Title case
export const toTitleCase = (str) => {
  if (!str) return '';
  return str.replace(/\w\S*/g, (txt) =>
    txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase()
  );
};

// Get initials from name
export const getInitials = (name = '') => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

// Grade formatter
export const getGrade = (percentage) => {
  if (percentage >= 90) return { grade: 'A+', color: 'success' };
  if (percentage >= 80) return { grade: 'A', color: 'success' };
  if (percentage >= 70) return { grade: 'B+', color: 'info' };
  if (percentage >= 60) return { grade: 'B', color: 'info' };
  if (percentage >= 50) return { grade: 'C', color: 'warning' };
  if (percentage >= 40) return { grade: 'D', color: 'warning' };
  return { grade: 'F', color: 'danger' };
};
