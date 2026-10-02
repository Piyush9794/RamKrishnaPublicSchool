import api from './api';
const reportApi = {
  getStudentReport: (params) => api.get('/reports/students', { params }),
  getAttendanceReport: (params) => api.get('/reports/attendance', { params }),
  getFeeReport: (params) => api.get('/reports/fees', { params }),
  getExamReport: (params) => api.get('/reports/exams', { params }),
  getTeacherReport: (params) => api.get('/reports/teachers', { params }),
  exportReport: (type, params) => api.get(`/reports/export/${type}`, { params, responseType: 'blob' }),
  getAuditLogs: (params) => api.get('/reports/audit-logs', { params }),
};
export default reportApi;
