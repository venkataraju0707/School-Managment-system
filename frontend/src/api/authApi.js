import axiosInstance from './axiosConfig';

export const authApi = {
  login: (credentials) => 
    axiosInstance.post('/auth/login', credentials),
  
  register: (userData) => 
    axiosInstance.post('/auth/register', userData),
  
  logout: () => 
    axiosInstance.post('/auth/logout'),
  
  changePassword: (data) => 
    axiosInstance.put('/auth/change-password', data),
  
  getCurrentUser: () => 
    axiosInstance.get('/auth/me'),
};

