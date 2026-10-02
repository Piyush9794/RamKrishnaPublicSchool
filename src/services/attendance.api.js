import api from './api';

const attendanceApi = {
  // Get students for attendance marking
  getStudentsForAttendance: (params) => api.get('/attendance/students', { params }),

  // Mark student attendance for a class/section/date
  markAttendance: (data) => api.post('/attendance', data),

  // Get attendance for a class/section/date
  getAttendance: (params) => api.get('/attendance', { params }),

  // Update individual attendance record
  updateAttendance: (id, data) => api.put(`/attendance/${id}`, data),

  // Get attendance summary for admin dashboard
  getSummary: (params) => api.get('/attendance/summary', { params }),

  // Get student attendance report
  getStudentReport: (studentId, params) =>
    api.get(`/attendance/student/${studentId}`, { params }),

  // Check if attendance already marked for class/section/date
  checkDuplicate: (params) => api.get('/attendance/check-duplicate', { params }),
};

export default attendanceApi;
