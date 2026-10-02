import api from './api';
const libraryApi = {
  getBooks: (params) => api.get('/library/books', { params }),
  getBookById: (id) => api.get(`/library/books/${id}`),
  createBook: (data) => api.post('/library/books', data),
  updateBook: (id, data) => api.put(`/library/books/${id}`, data),
  deleteBook: (id) => api.delete(`/library/books/${id}`),
  issueBook: (data) => api.post('/library/issues', data),
  returnBook: (issueId, data) => api.patch(`/library/issues/${issueId}/return`, data),
  getIssuedBooks: (params) => api.get('/library/issues', { params }),
  getStudentLibrary: (studentId) => api.get(`/library/student/${studentId}`),
  getCategories: () => api.get('/library/categories'),
  getAuthors: () => api.get('/library/authors'),
};
export default libraryApi;
