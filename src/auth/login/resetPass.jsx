import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ResetPass = () => {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  const [email, setEmail] = useState(''); // Add email state

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setToken(params.get('token') || '');
    setEmail(params.get('email') || ''); // Extract email from URL
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi input password
    if (!password || !passwordConfirm) {
      setMessage('Harap isi kedua field password.');
      return;
    }

    if (password !== passwordConfirm) {
      setMessage('Password dan konfirmasi password tidak cocok.');
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post('http://127.0.0.1:8000/api/auth/reset-password', {
        email, // Use the email state
        token,
        password,
        password_confirmation: passwordConfirm,
      });

      setMessage(res.data.message || 'Password berhasil direset!');
    } catch (err) {
      setMessage(
        err.response?.data?.message || 'Terjadi kesalahan saat reset password.'
      );
    } finally {
      setLoading(false); // Set loading to false after the request
    }
  };

  // Jika token tidak valid
  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-md">
          <h2 className="text-3xl font-semibold text-gray-800 text-center">
            Token tidak valid!
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300">
      <div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <img
            src="/src/assets/logo.png"
            alt="Logo"
            className="h-16 w-16 mx-auto mb-4"
          />
          <h2 className="text-3xl font-semibold text-gray-800">Reset Password</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password Baru
            </label>
            <input
              type="password"
              id="password"
              placeholder="Masukkan Password Baru"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="passwordConfirm"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Konfirmasi Password
            </label>
            <input
              type="password"
              id="passwordConfirm"
              placeholder="Konfirmasi Password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
              className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-200"
          >
            {loading ? 'Sedang memproses...' : 'Reset Password'}
          </button>
        </form>
        {message && (
          <p
            className={`mt-4 text-center ${
              message.includes('berhasil') ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default ResetPass;
