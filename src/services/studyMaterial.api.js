import api from './api';
const studyMaterialApi = {
  getAll: (params) => api.get('/study-materials', { params }),
  getById: (id) => api.get(`/study-materials/${id}`),
  create: (formData) => api.post('/study-materials', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update: (id, formData) => api.put(`/study-materials/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  delete: (id) => api.delete(`/study-materials/${id}`),
  download: (id) => api.get(`/study-materials/${id}/download`, { responseType: 'blob' }),
};
export default studyMaterialApi;
