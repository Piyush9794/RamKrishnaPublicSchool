import api from './api';
const resultApi = {
  getAll: (params) => api.get('/results', { params }),
  getById: (id) => api.get(`/results/${id}`),
  enterMarks: (data) => api.post('/results/marks', data),
  updateMarks: (id, data) => api.put(`/results/marks/${id}`, data),
  publishResult: (examId) => api.patch(`/results/publish/${examId}`),
  getStudentResult: (studentId, params) => api.get(`/results/student/${studentId}`, { params }),
  getReportCard: (studentId, examId) => api.get(`/results/report-card/${studentId}/${examId}`, { responseType: 'blob' }),
  getPerformance: (params) => api.get('/results/performance', { params }),
};
export default resultApi;
