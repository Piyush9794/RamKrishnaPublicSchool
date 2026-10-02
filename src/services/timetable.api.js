import api from './api';
const timetableApi = {
  getAll: (params) => api.get('/timetable', { params }),
  create: (data) => api.post('/timetable', data),
  update: (id, data) => api.put(`/timetable/${id}`, data),
  delete: (id) => api.delete(`/timetable/${id}`),
  getMyTimetable: () => api.get('/timetable/me'),
  getClassTimetable: (classId, sectionId) => api.get(`/timetable/class/${classId}/${sectionId}`),
};
export default timetableApi;
