// Application Configuration
const appConfig = {
  appName: 'School Management System',
  appShortName: 'SMS',
  appVersion: '1.0.0',
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  tokenKey: 'sms_access_token',
  refreshTokenKey: 'sms_refresh_token',
  userKey: 'sms_user',
  defaultPageSize: 10,
  pageSizeOptions: [10, 25, 50, 100],
  dateFormat: 'DD/MM/YYYY',
  timeFormat: 'HH:mm',
  dateTimeFormat: 'DD/MM/YYYY HH:mm',
  currency: 'INR',
  currencySymbol: '₹',
  timezone: 'Asia/Kolkata',
  schoolYear: new Date().getFullYear(),
  maxFileSize: 5 * 1024 * 1024, // 5MB
  allowedFileTypes: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  allowedImageTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
};

export default appConfig;
