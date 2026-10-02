import api from './api';
const transportApi = {
  getVehicles: (params) => api.get('/transport/vehicles', { params }),
  createVehicle: (data) => api.post('/transport/vehicles', data),
  updateVehicle: (id, data) => api.put(`/transport/vehicles/${id}`, data),
  deleteVehicle: (id) => api.delete(`/transport/vehicles/${id}`),
  getRoutes: (params) => api.get('/transport/routes', { params }),
  createRoute: (data) => api.post('/transport/routes', data),
  updateRoute: (id, data) => api.put(`/transport/routes/${id}`, data),
  deleteRoute: (id) => api.delete(`/transport/routes/${id}`),
  getStops: (routeId) => api.get(`/transport/routes/${routeId}/stops`),
  getDrivers: (params) => api.get('/transport/drivers', { params }),
  allocateStudent: (data) => api.post('/transport/allocations', data),
  getAllocations: (params) => api.get('/transport/allocations', { params }),
  getStudentTransport: (studentId) => api.get(`/transport/student/${studentId}`),
};
export default transportApi;
