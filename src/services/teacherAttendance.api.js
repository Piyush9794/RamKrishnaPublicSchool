import api from './api';

// Teacher self-attendance (location-based)
// Teacher ID is identified through authentication on the backend
const teacherAttendanceApi = {
  // Mark own attendance with location data
  markAttendance: (data) =>
    api.post('/teacher-attendance/mark', {
      status: data.status,           // 'Present' | 'Late'
      latitude: data.latitude,
      longitude: data.longitude,
      accuracy: data.accuracy,
      locationTimestamp: data.locationTimestamp,
      remarks: data.remarks || '',
    }),

  // Get own attendance history
  getMyAttendance: (params) => api.get('/teacher-attendance/me', { params }),

  // Get today's attendance status for self
  getTodayStatus: () => api.get('/teacher-attendance/me/today'),

  // Admin: get all teacher attendance
  getAllAttendance: (params) => api.get('/teacher-attendance', { params }),

  // Admin: get specific teacher attendance
  getTeacherAttendance: (teacherId, params) =>
    api.get(`/teacher-attendance/teacher/${teacherId}`, { params }),

  // Admin: update a teacher's attendance record
  updateAttendance: (id, data) => api.put(`/teacher-attendance/${id}`, data),

  // Admin: get attendance summary/report
  getSummary: (params) => api.get('/teacher-attendance/summary', { params }),
};

export default teacherAttendanceApi;
