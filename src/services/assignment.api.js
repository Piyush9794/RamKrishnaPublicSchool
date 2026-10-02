import api from './api';
const assignmentApi = {
  getAll: (params) => api.get('/assignments', { params }),
  getById: (id) => api.get(`/assignments/${id}`),
  create: (formData) => api.post('/assignments', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update: (id, formData) => api.put(`/assignments/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  delete: (id) => api.delete(`/assignments/${id}`),
  getMyAssignments: (params) => api.get('/assignments/my', { params }),
  downloadFile: (id) => api.get(`/assignments/${id}/download`, { responseType: 'blob' }),
};
export default assignmentApi;
