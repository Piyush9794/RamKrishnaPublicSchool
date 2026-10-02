import api from './api';
const homeworkApi = {
  getAll: (params) => api.get('/homework', { params }),
  getById: (id) => api.get(`/homework/${id}`),
  create: (data) => api.post('/homework', data),
  update: (id, data) => api.put(`/homework/${id}`, data),
  delete: (id) => api.delete(`/homework/${id}`),
  getMyHomework: (params) => api.get('/homework/my', { params }),
};
export default homeworkApi;
