import api from './api';

const academicApi = {
  // Sessions
  getSessions: () => api.get('/academics/sessions'),
  createSession: (data) => api.post('/academics/sessions', data),
  updateSession: (id, data) => api.put(`/academics/sessions/${id}`, data),
  deleteSession: (id) => api.delete(`/academics/sessions/${id}`),
  setActiveSession: (id) => api.patch(`/academics/sessions/${id}/activate`),

  // Classes
  getClasses: (params) => api.get('/academics/classes', { params }),
  createClass: (data) => api.post('/academics/classes', data),
  updateClass: (id, data) => api.put(`/academics/classes/${id}`, data),
  deleteClass: (id) => api.delete(`/academics/classes/${id}`),

  // Sections
  getSections: (params) => api.get('/academics/sections', { params }),
  createSection: (data) => api.post('/academics/sections', data),
  updateSection: (id, data) => api.put(`/academics/sections/${id}`, data),
  deleteSection: (id) => api.delete(`/academics/sections/${id}`),

  // Subjects
  getSubjects: (params) => api.get('/academics/subjects', { params }),
  createSubject: (data) => api.post('/academics/subjects', data),
  updateSubject: (id, data) => api.put(`/academics/subjects/${id}`, data),
  deleteSubject: (id) => api.delete(`/academics/subjects/${id}`),
};

export default academicApi;
