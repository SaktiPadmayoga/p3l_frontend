import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthService from "../../services/authService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (AuthService.isAuthenticated()) {
      const userType = AuthService.getUserType();
      if (userType === "pegawai") {
        navigate("/admin/dashboard");
      } else if (userType === "pembeli") {
        navigate("/");
      } else if (userType === "organisasi") {
        navigate("/");
      } else if (userType === "penitip") {
        navigate("/");
      }
    }
  }, [navigate]);

  // login.jsx
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await AuthService.login(email, password);
      window.dispatchEvent(new Event("authChange"));

      if (response.user_type === "pegawai") {
        navigate("/admin/dashboard");
      } else if (response.user_type === "pembeli") {
        navigate("/");
      } else if (response.user_type === "organisasi") {
        navigate("/admin/manage-request-donasi"); // Redirect organization to ManageRequestDonasi
      } else if (response.user_type === "penitip") {
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center mb-6">
          <img
            src="src/assets/logo.png"
            alt="Logo"
            className="h-12 w-12 mx-auto"
          />
          <h1 className="text-2xl font-bold mt-2">ReuseMart</h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded mb-4">{error}</div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="mt-2">
              <h2 style={{ color: "blue" }}>
                <Link to="/forgotPass">Forgot Password</Link>
              </h2>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-stone-600 text-white py-2 rounded-md hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-500 focus:ring-offset-2 disabled:bg-stone-300"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
