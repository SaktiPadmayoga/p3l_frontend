import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import HeroBg from "../../assets/hero-bg.png";

const Register = () => {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    password: "",
    notlp: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/register/pembeli",
        {
          NAMA: formData.nama,
          EMAIL: formData.email,
          PASSWORD: formData.password,
          TELEPON: formData.notlp,
        }
      );

      if (response.status === 201) {
        navigate("/login", { state: { message: "Registrasi berhasil. Silakan login." } });
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || "Registration failed");
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[url('/src/assets/hero-bg.png')] bg-center bg-cover flex items-center justify-center p-20 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-olive-500/80 via-olive-500/80 to-olive-500/80"></div>
      <div className="bg-white rounded-4xl shadow-lg overflow-hidden flex w-full md:min-h-[85vh] relative">
        
        {/* Left Side - Register Form */}
        <div className="w-1/2 p-10 flex flex-col justify-center ml-10">
          <div className="flex flex-row items-center justify-center mb-7">
            <img
              src="src/assets/logo.png"
              alt="Logo"
              className="h-14 w-14"
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded mb-4 font-medium text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="md:min-w-lg mx-auto">
            <p className="text-olive-900 text-2xl text-center mb-10">Daftar ke ReuseMart</p>

            <div className="mb-4">
              <label className="block text-olive-900 text-lg font-medium mb-1">
                Nama Lengkap
              </label>
              <input
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                className="w-full px-3 py-3 border border-olive-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive-500"
                placeholder="Masukkan nama lengkap"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-olive-900 text-lg font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-3 border border-olive-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive-500"
                placeholder="name@email.com"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-olive-900 text-lg font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-3 border border-olive-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive-500"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-olive-900 text-lg font-medium mb-1">
                Nomor Telepon
              </label>
              <input
                type="text"
                name="notlp"
                value={formData.notlp}
                onChange={handleChange}
                className="w-full px-3 py-3 border border-olive-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive-500"
                placeholder="08XXXXXXXX"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-olive-500 text-white text-lg py-3 rounded-xl hover:bg-olive-900 focus:outline-none focus:ring-2 focus:ring-olive-500 focus:ring-offset-2 disabled:bg-stone-300"
            >
              {loading ? "Mendaftar..." : "Daftar"}
            </button>
          </form>

          <div className="text-center mt-6">
            Sudah punya akun?{" "}
            <Link to="/login" className="text-olive-500 font-bold hover:underline">Masuk</Link>
          </div>
          <div className="text-center mt-2">
            <Link to="/register-selection" className="text-olive-500 hover:underline">
              Kembali ke pemilihan jenis akun
            </Link>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="w-4/5 p-10 relative rounded-4xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/50 to-white/0"></div>
          <img
            src={HeroBg}
            alt="Hero"
            className="object-cover w-full h-full rounded-4xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
