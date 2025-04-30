import axios from 'axios';

const API_URL =  'http://localhost:8000/api/auth';

class AuthService {
  // Login method that handles both pegawai and pembeli authentication
  async login(email, password) {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        EMAIL: email,
        PASSWORD: password
      });
      
      if (response.data.token) {
        // Store token in localStorage
        localStorage.setItem('token', response.data.token);
        
        // Store user type (pegawai or pembeli)
        localStorage.setItem('userType', response.data.user_type);
        
        // Store user data including roles and permissions
        localStorage.setItem('userData', JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Logout method
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('userData');
  }

  // Get current user data
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('userData'));
  }

  // Get user type (pegawai or pembeli)
  getUserType() {
    return localStorage.getItem('userType');
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!localStorage.getItem('token');
  }
}

export default new AuthService();