import api from './api';

const teacherApi = {
  getAll: (params) => api.get('/teachers', { params }),
  getById: (id) => api.get(`/teachers/${id}`),
  create: (data) => api.post('/teachers', data),
  update: (id, data) => api.put(`/teachers/${id}`, data),
  activate: (id) => api.patch(`/teachers/${id}/activate`),
  deactivate: (id) => api.patch(`/teachers/${id}/deactivate`),
  delete: (id) => api.delete(`/teachers/${id}`),
  getClasses: (id) => api.get(`/teachers/${id}/classes`),
  getSubjects: (id) => api.get(`/teachers/${id}/subjects`),
  getTimetable: (id) => api.get(`/teachers/${id}/timetable`),
  getAttendance: (id, params) => api.get(`/teachers/${id}/attendance`, { params }),
  getLeaves: (id) => api.get(`/teachers/${id}/leaves`),
  getDocuments: (id) => api.get(`/teachers/${id}/documents`),
  uploadDocument: (id, formData) => api.post(`/teachers/${id}/documents`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  deleteDocument: (id, docId) => api.delete(`/teachers/${id}/documents/${docId}`),
  getMyProfile: () => api.get('/teachers/me'),
  getMyClasses: () => api.get('/teachers/me/classes'),
  getMySubjects: () => api.get('/teachers/me/subjects'),
  getMyTimetable: () => api.get('/teachers/me/timetable'),
};

export default teacherApi;
