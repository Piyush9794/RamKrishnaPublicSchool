import api from './api';
const examApi = {
  getAll: (params) => api.get('/exams', { params }),
  getById: (id) => api.get(`/exams/${id}`),
  create: (data) => api.post('/exams', data),
  update: (id, data) => api.put(`/exams/${id}`, data),
  delete: (id) => api.delete(`/exams/${id}`),
  getSchedule: (params) => api.get('/exams/schedule', { params }),
  getMyExams: (params) => api.get('/exams/my', { params }),
};
export default examApi;
