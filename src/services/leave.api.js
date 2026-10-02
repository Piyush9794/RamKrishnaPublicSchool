import api from './api';
const leaveApi = {
  getAll: (params) => api.get('/leaves', { params }),
  getById: (id) => api.get(`/leaves/${id}`),
  create: (data) => api.post('/leaves', data),
  update: (id, data) => api.put(`/leaves/${id}`, data),
  approve: (id, data) => api.patch(`/leaves/${id}/approve`, data),
  reject: (id, data) => api.patch(`/leaves/${id}/reject`, data),
  cancel: (id) => api.patch(`/leaves/${id}/cancel`),
  getMyLeaves: (params) => api.get('/leaves/me', { params }),
  applyLeave: (data) => api.post('/leaves/apply', data),
};
export default leaveApi;
