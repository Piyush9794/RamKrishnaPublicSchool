import api from './api';

const parentApi = {
  getAll: (params) => api.get('/parents', { params }),
  getById: (id) => api.get(`/parents/${id}`),
  create: (data) => api.post('/parents', data),
  update: (id, data) => api.put(`/parents/${id}`, data),
  activate: (id) => api.patch(`/parents/${id}/activate`),
  deactivate: (id) => api.patch(`/parents/${id}/deactivate`),
  delete: (id) => api.delete(`/parents/${id}`),
  getChildren: (id) => api.get(`/parents/${id}/children`),
  linkChild: (id, studentId) => api.post(`/parents/${id}/children`, { studentId }),
  unlinkChild: (id, studentId) => api.delete(`/parents/${id}/children/${studentId}`),
  getMyProfile: () => api.get('/parents/me'),
  getMyChildren: () => api.get('/parents/me/children'),
};

export default parentApi;
