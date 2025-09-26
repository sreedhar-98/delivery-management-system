import axios from 'axios';

// Base API configuration
const API_BASE_URL = 'http://localhost:3001';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging and auth
api.interceptors.request.use(
  (config) => {
    // console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    // console.log(`Response received from ${response.config.url}:`, response.status);
    return response;
  },
  (error) => {
    console.error('Response error:', error);
    
    // Handle different error scenarios
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      console.error(`Server Error ${status}:`, data);
    } else if (error.request) {
      // Request was made but no response received
      console.error('Network Error: No response received');
    } else {
      // Something else happened
      console.error('Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// Generic API methods
export const apiService = {
  // GET request
  get: async (endpoint, params = {}) => {
    try {
      const response = await api.get(endpoint, { params });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch data from ${endpoint}: ${error.message}`);
    }
  },

  // POST request
  post: async (endpoint, data) => {
    try {
      const response = await api.post(endpoint, data);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create data at ${endpoint}: ${error.message}`);
    }
  },

  // PUT request
  put: async (endpoint, data) => {
    try {
      const response = await api.put(endpoint, data);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update data at ${endpoint}: ${error.message}`);
    }
  },

  // DELETE request
  delete: async (endpoint) => {
    try {
      const response = await api.delete(endpoint);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to delete data at ${endpoint}: ${error.message}`);
    }
  },

  // PATCH request
  patch: async (endpoint, data) => {
    try {
      const response = await api.patch(endpoint, data);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to patch data at ${endpoint}: ${error.message}`);
    }
  }
};

// Specific API endpoints
export const endpoints = {
  users: '/users',
  vendors: '/vendors',
  deliveryPartners: '/deliveryPartners',
  orders: '/orders',
  stats: '/stats',
  platformPerformance: '/platformPerformance',
  alerts: '/alerts',
  quickActions: '/quickActions',
  deliveryZones: '/deliveryZones',
  deliveryShifts: '/deliveryShifts',
  weeklySchedule: '/weeklySchedule',
  deliveryPayouts: '/deliveryPayouts',
  supportTickets: '/supportTickets',
  supportSummary: '/supportSummary',
  issueTypes: '/issueTypes'
};

export default api;