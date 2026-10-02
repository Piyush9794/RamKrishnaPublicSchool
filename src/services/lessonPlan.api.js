import api from './api';
const lessonPlanApi = {
  getAll: (params) => api.get('/lesson-plans', { params }),
  getById: (id) => api.get(`/lesson-plans/${id}`),
  create: (data) => api.post('/lesson-plans', data),
  update: (id, data) => api.put(`/lesson-plans/${id}`, data),
  delete: (id) => api.delete(`/lesson-plans/${id}`),
  getMyLessonPlans: (params) => api.get('/lesson-plans/my', { params }),
};
export default lessonPlanApi;
