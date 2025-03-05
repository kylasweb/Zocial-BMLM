import axios from 'axios';
import { store } from '../store';
import { logout } from '../store/authSlice';
import { addNotification } from '../store/notificationSlice';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 30000,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
    
    switch (error.response?.status) {
      case 401:
        store.dispatch(logout());
        store.dispatch(addNotification({
          type: 'error',
          message: 'Session expired. Please login again.',
        }));
        break;
      case 403:
        store.dispatch(addNotification({
          type: 'error',
          message: 'You do not have permission to perform this action.',
        }));
        break;
      case 429:
        store.dispatch(addNotification({
          type: 'warning',
          message: 'Too many requests. Please try again later.',
        }));
        break;
      default:
        store.dispatch(addNotification({
          type: 'error',
          message: errorMessage,
        }));
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

  // Faucet Operations
  getFaucetConfig: (tokenId) => api.get(`/tokens/${tokenId}/faucet/config`),
  updateFaucetConfig: (tokenId, config) => api.put(`/tokens/${tokenId}/faucet/config`, config),
  getFaucetHistory: (tokenId) => api.get(`/tokens/${tokenId}/faucet/history`),
  getFaucetStats: (tokenId) => api.get(`/tokens/${tokenId}/faucet/stats`),
  processFaucetClaim: (tokenId, userId) => api.post(`/tokens/${tokenId}/faucet/claim`, { userId }),

  // Airdrop Management
  getActiveAirdrops: (tokenId) => api.get(`/tokens/${tokenId}/airdrops/active`),
  getAirdropHistory: (tokenId) => api.get(`/tokens/${tokenId}/airdrops/history`),
  getAirdropStats: (tokenId) => api.get(`/tokens/${tokenId}/airdrops/stats`),
  createAirdrop: (tokenId, airdropData) => api.post(`/tokens/${tokenId}/airdrops`, airdropData),
  executeAirdrop: (tokenId, airdropId) => api.post(`/tokens/${tokenId}/airdrops/${airdropId}/execute`),

  // Reward System
  getRewardConfig: (tokenId) => api.get(`/tokens/${tokenId}/rewards/config`),
  updateRewardConfig: (tokenId, path, value) => api.put(`/tokens/${tokenId}/rewards/config`, { path, value }),
  getRewardHistory: (tokenId) => api.get(`/tokens/${tokenId}/rewards/history`),
  getRewardStats: (tokenId) => api.get(`/tokens/${tokenId}/rewards/stats`),
  calculateRewardDistribution: (tokenId, rewardType, recipients) => 
    api.post(`/tokens/${tokenId}/rewards/calculate`, { rewardType, recipients }),

  // Achievement Tracking
  getUserAchievements: (userId) => api.get(`/users/${userId}/achievements`),
  trackAchievement: (userId, achievementData) => api.post(`/users/${userId}/achievements`, achievementData),
  getAchievementStats: () => api.get('/achievements/stats')
};

export default apiService;
