import React, { useState } from "react";
import axios from "axios";
import bg from "../../assets/BgFix.png";
import AuthService from "../../services/authService"; // Import AuthService for redirection
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    password: "",
    notlp: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message

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
        // Redirect to login page after successful registration
        window.location.href = "/login";
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || "Registration failed");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div
      className="flex items-center justify-center bg-cover bg-center bg-no-repeat min-h-screen"
      // style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="rounded-xl overflow-hidden flex flex-col md:flex-row max-w-5xl w-full mx-4 md:h-[90vh] shadow-2xl bg-white/60">
        {/* Logo Section */}
        <div className="md:w-1/2 flex flex-col items-center justify-center p-10 text-center sm:ml-14">
          <img
            src="src/assets/logo.png"
            alt="Logo"
            className="w-80 object-contain flex justify-center items-center"
          />
          <h1 className="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl mt-6">
            Reuse lebih baik dari refuse! Bergabung sekarang dan jadi bagian
            dari perubahan.
          </h1>
        </div>

        {/* Form Section */}
        <div className="md:w-1/2 bg-white/20 bg-opacity-70 backdrop-blur-md p-6 px-12 flex items-center justify-center">
          <div className="w-full max-w-md">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-black md:text-xl mb-6">
              Daftar ke ReuseMart
            </h1>
            {error && <p className="text-red-500">{error}</p>}
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Nama Lengkap */}
              <div>
                <label
                  htmlFor="nama"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nama Lengkap
                </label>
                <input
                  id="nama"
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  className="bg-stone-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-stone-600 focus:border-stone-600 block w-full p-2.5"
                  placeholder="Masukkan nama lengkap Anda"
                  required
                />
              </div>
              {/* Email Address */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-stone-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-stone-600 focus:border-stone-600 block w-full p-2.5"
                  placeholder="name@company.com"
                  required
                />
              </div>
              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="bg-stone-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-stone-600 focus:border-stone-600 block w-full p-2.5"
                  placeholder="••••••••"
                  required
                />
              </div>
              {/* No HP */}
              <div>
                <label
                  htmlFor="notlp"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nomor Telepon
                </label>
                <input
                  id="notlp"
                  type="number"
                  name="notlp"
                  value={formData.notlp}
                  onChange={handleChange}
                  className="bg-stone-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-stone-600 focus:border-stone-600 block w-full p-2.5"
                  placeholder="Masukkan nomor telepon Anda"
                  required
                />
              </div>
              {/* Register Button */}
              <div className="flex items-center text-center">
                <button
                  type="submit"
                  className="w-full text-white bg-stone-500 hover:bg-stone-600 focus:ring-4 focus:outline-none focus:ring-stone-300 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  Daftar
                </button>
              </div>
              {/* Register Link */}
              <p className="text-sm font-light text-gray-500 mt-4">
                Sudah memiliki akun?{" "}
                <a
                  href="/login"
                  className="font-medium text-stone-600 hover:underline"
                >
                  Masuk.
                </a>
              </p>

              {/* Back to selection */}
              <p className="text-sm font-light text-gray-500">
                <Link
                  to="/register-selection"
                  className="font-medium text-stone-600 hover:underline"
                >
                  Kembali ke pemilihan jenis akun
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
