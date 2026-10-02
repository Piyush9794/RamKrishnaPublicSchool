import api from './api';
const noticeApi = {
  getAll: (params) => api.get('/notices', { params }),
  getById: (id) => api.get(`/notices/${id}`),
  create: (data) => api.post('/notices', data),
  update: (id, data) => api.put(`/notices/${id}`, data),
  delete: (id) => api.delete(`/notices/${id}`),
  getMyNotices: (params) => api.get('/notices/my', { params }),
};
export default noticeApi;
