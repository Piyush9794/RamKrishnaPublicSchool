import api from './api';
const feeApi = {
  getDashboard: () => api.get('/fees/dashboard'),
  getStructures: (params) => api.get('/fees/structures', { params }),
  createStructure: (data) => api.post('/fees/structures', data),
  updateStructure: (id, data) => api.put(`/fees/structures/${id}`, data),
  deleteStructure: (id) => api.delete(`/fees/structures/${id}`),
  getStudentFees: (params) => api.get('/fees/student-fees', { params }),
  getStudentFeeById: (id) => api.get(`/fees/student-fees/${id}`),
  createPayment: (data) => api.post('/fees/payments', data),
  getPayments: (params) => api.get('/fees/payments', { params }),
  getPaymentById: (id) => api.get(`/fees/payments/${id}`),
  getReceipt: (id) => api.get(`/fees/payments/${id}/receipt`, { responseType: 'blob' }),
  getPendingFees: (params) => api.get('/fees/pending', { params }),
  getOverdueFees: (params) => api.get('/fees/overdue', { params }),
};
export default feeApi;
