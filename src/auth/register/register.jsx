import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bg from "../../assets/BgFix.png";

const Register = () => {
  const [form, setForm] = useState({
    EMAIL: "",
    PASSWORD: "",
    ALAMAT: "",
    TELEPON: "",
    KATEGORI: "pembeli",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/auth/register", form);
      alert("Registrasi berhasil! Silakan login.");
      navigate("/login");
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Registrasi gagal. Coba lagi.");
      } else {
        setError("Tidak ada respon dari server.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center bg-cover bg-center bg-no-repeat min-h-screen" style={{ backgroundImage: `url(${bg})` }}>
      <div className="rounded-xl overflow-hidden flex flex-col md:flex-row max-w-5xl w-full mx-4 md:h-[90vh] shadow-2xl bg-white/60">
        {/* Logo & Form */}
        <div className="md:w-1/2 flex flex-col items-center justify-center p-10 text-center sm:ml-14">
          {/* Logo Section */}
          <div className="md:w-1/2 flex flex-col items-center justify-center p-10 text-center sm:ml-14">
            <img src="src/assets/reusemartlogo.svg" alt="Logo" className="w-80 object-contain" />
            <h1 className="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl mt-6">
              Reuse lebih baik dari refuse! Bergabung sekarang dan jadi bagian dari perubahan.
            </h1>
          </div>
        </div>
        <div className="md:w-1/2 bg-white/20 backdrop-blur-md p-6 px-12 flex items-center justify-center">
          <form onSubmit={handleRegister} className="w-full max-w-md space-y-6">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <input
              type="email"
              placeholder="Email"
              value={form.EMAIL}
              onChange={(e) => setForm({ ...form, EMAIL: e.target.value })}
              required
              className="w-full p-2 rounded-lg"
            />
            <input
              type="password"
              placeholder="Password"
              value={form.PASSWORD}
              onChange={(e) => setForm({ ...form, PASSWORD: e.target.value })}
              required
              className="w-full p-2 rounded-lg"
            />
            <input
              type="text"
              placeholder="Alamat"
              value={form.ALAMAT}
              onChange={(e) => setForm({ ...form, ALAMAT: e.target.value })}
              required
              className="w-full p-2 rounded-lg"
            />
            <input
              type="number"
              placeholder="No Telepon"
              value={form.TELEPON}
              onChange={(e) => setForm({ ...form, TELEPON: e.target.value })}
              required
              className="w-full p-2 rounded-lg"
            />
            <select
              value={form.KATEGORI}
              onChange={(e) => setForm({ ...form, KATEGORI: e.target.value })}
              className="w-full p-2 rounded-lg"
            >
              <option value="pembeli">Pembeli</option>
              <option value="organisasi">Organisasi</option>
            </select>
            <button
              type="submit"
              className="w-full bg-teal-500 text-white rounded-lg py-2.5"
            >
              Daftar
            </button>
            <p className="text-sm font-light text-gray-500">
              Sudah punya akun? <a href="/login" className="text-teal-600">Masuk.</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
