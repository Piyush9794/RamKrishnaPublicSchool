import api from './api';

const studentApi = {
  getAll: (params) => api.get('/students', { params }),
  getById: (id) => api.get(`/students/${id}`),
  create: (data) => api.post('/students', data),
  update: (id, data) => api.put(`/students/${id}`, data),
  deactivate: (id) => api.patch(`/students/${id}/deactivate`),
  activate: (id) => api.patch(`/students/${id}/activate`),
  delete: (id) => api.delete(`/students/${id}`),
  getAttendance: (id, params) => api.get(`/students/${id}/attendance`, { params }),
  getFees: (id) => api.get(`/students/${id}/fees`),
  getResults: (id, params) => api.get(`/students/${id}/results`, { params }),
  getHomework: (id, params) => api.get(`/students/${id}/homework`, { params }),
  getAssignments: (id, params) => api.get(`/students/${id}/assignments`, { params }),
  getDocuments: (id) => api.get(`/students/${id}/documents`),
  uploadDocument: (id, formData) => api.post(`/students/${id}/documents`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  deleteDocument: (id, docId) => api.delete(`/students/${id}/documents/${docId}`),
  getTransport: (id) => api.get(`/students/${id}/transport`),
  getLibrary: (id) => api.get(`/students/${id}/library`),
};

export default studentApi;
