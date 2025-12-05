import axiosInstance from './axiosConfig';

export const adminApi = {
  // Students
  getStudents: () => axiosInstance.get('/admin/students'),
  createStudent: (data) => axiosInstance.post('/admin/students', data),
  updateStudent: (id, data) => axiosInstance.put(`/admin/students/${id}`, data),
  deleteStudent: (id) => axiosInstance.delete(`/admin/students/${id}`),
  
  // Teachers
  getTeachers: () => axiosInstance.get('/admin/teachers'),
  createTeacher: (data) => axiosInstance.post('/admin/teachers', data),
  updateTeacher: (id, data) => axiosInstance.put(`/admin/teachers/${id}`, data),
  deleteTeacher: (id) => axiosInstance.delete(`/admin/teachers/${id}`),
  
  // Parents
  getParents: () => axiosInstance.get('/admin/parents'),
  createParent: (data) => axiosInstance.post('/admin/parents', data),
  updateParent: (id, data) => axiosInstance.put(`/admin/parents/${id}`, data),
  deleteParent: (id) => axiosInstance.delete(`/admin/parents/${id}`),
  
  // Classes
  getClasses: () => axiosInstance.get('/admin/classes'),
  createClass: (data) => axiosInstance.post('/admin/classes', data),
  updateClass: (id, data) => axiosInstance.put(`/admin/classes/${id}`, data),
  deleteClass: (id) => axiosInstance.delete(`/admin/classes/${id}`),
  
  // Subjects
  getSubjects: () => axiosInstance.get('/admin/subjects'),
  createSubject: (data) => axiosInstance.post('/admin/subjects', data),
  updateSubject: (id, data) => axiosInstance.put(`/admin/subjects/${id}`, data),
  deleteSubject: (id) => axiosInstance.delete(`/admin/subjects/${id}`),
  
  // Analytics
  getAnalytics: () => axiosInstance.get('/admin/analytics'),
  
  // Roles
  getRoles: () => axiosInstance.get('/admin/roles'),
  assignRole: (data) => axiosInstance.post('/admin/assign-role', data),
};
