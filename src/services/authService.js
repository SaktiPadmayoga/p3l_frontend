import axios from 'axios';

const API_URL = 'http://localhost:8000/api/auth';

class AuthService {
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
        console.log("Stored user data:", response.data.user); // Debug log
      }
      
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('userData');
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('userData'));
  }

  getUserType() {
    return localStorage.getItem('userType');
  }

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }
}

export default new AuthService();