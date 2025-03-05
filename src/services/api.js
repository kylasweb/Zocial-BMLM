import axios from 'axios';
import { store } from '../store';
import { logout } from '../store/authSlice';
import { addNotification } from '../store/notificationSlice';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 30000,
});

// Request interceptor
api.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(logout());
      store.dispatch(
        addNotification({
          type: 'error',
          message: 'Session expired. Please login again.',
        })
      );
    }
    return Promise.reject(error);
  }
);

export const apiService = {
  // Auth
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  resetPassword: (email) => api.post('/auth/reset-password', { email }),
  verifyResetToken: (token) => api.get(`/auth/reset-password/${token}`),
  updatePassword: (token, password) => 
    api.post(`/auth/reset-password/${token}`, { password }),

  // User
  getUserProfile: () => api.get('/user/profile'),
  updateUserProfile: (data) => api.put('/user/profile', data),
  
  // Wallet
  getWalletBalance: () => api.get('/wallet/balance'),
  getTransactions: () => api.get('/wallet/transactions'),
  withdraw: (amount) => api.post('/wallet/withdraw', { amount }),
  
  // Team
  getTeamMembers: () => api.get('/team/members'),
  getTeamStats: () => api.get('/team/stats'),
  assignTask: (userId, task) => api.post('/team/tasks', { userId, task }),
  
  // Admin
  getSystemStats: () => api.get('/admin/stats'),
  manageUser: (userId, action) => api.post(`/admin/users/${userId}`, { action }),
  updateRank: (userId, rank) => api.put(`/admin/ranks/${userId}`, { rank }),
  
  // Support
  createTicket: (ticket) => api.post('/support/tickets', ticket),
  getTickets: () => api.get('/support/tickets'),
  updateTicket: (ticketId, update) => 
    api.put(`/support/tickets/${ticketId}`, update),
};

export default apiService;