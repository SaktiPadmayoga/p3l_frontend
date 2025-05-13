import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Upload } from "lucide-react";
import HeroBg from "../../assets/hero-bg.png";
import axios from "axios";

const RegisterOrganization = () => {
  const [logoPreview, setLogoPreview] = useState(null);
  const [formData, setFormData] = useState({
    namaOrganisasi: "",
    email: "",
    password: "",
    alamat: "",
    notlp: "",
    deskripsi: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("NAMA", formData.namaOrganisasi);
    formDataToSend.append("EMAIL", formData.email);
    formDataToSend.append("PASSWORD", formData.password);
    formDataToSend.append("ALAMAT", formData.alamat);
    formDataToSend.append("TELEPON", formData.notlp);
    formDataToSend.append("DESKRIPSI", formData.deskripsi);

    const logoInput = document.getElementById("logo");
    if (logoInput.files[0]) {
      formDataToSend.append("FOTO_ORGANISASI", logoInput.files[0]);
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/register/organisasi",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        setError("Registrasi berhasil! Mengarahkan ke login...");
        setTimeout(() => navigate("/login"), 1500);
      }
    } catch (err) {
      if (err.response) {
        if (err.response.data.errors) {
          const errorMessages = Object.entries(err.response.data.errors)
            .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
            .join("\n");
          setError(errorMessages);
        } else {
          setError(err.response.data.message || "Terjadi kesalahan.");
        }
      } else {
        setError("Gagal terhubung ke server.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat px-20"
      style={{ backgroundImage: `url(${HeroBg})` }}
    >
      <div className="absolute inset-0 bg-olive-500/80 z-0" />
      
      <div className="relative z-10 w-full bg-white rounded-3xl shadow-lg overflow-hidden h-[85vh] flex flex-col md:flex-row p-10" >
        
        {/* Form Section */}
        <div className="w-full md:w-2/5 p-8 md:p-10 overflow-y-auto">
          <div className="flex justify-center mb-6">
            <img src="/src/assets/logo.png" alt="Logo" className="h-14 w-14" />
          </div>

          <h1 className="text-2xl font-bold text-olive-900 text-center mb-6">Daftar sebagai Organisasi</h1>

          {error && (
            <div className={`p-4 rounded mb-4 text-sm font-medium text-center ${error.includes("berhasil") ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-olive-900 font-medium mb-1">Nama Organisasi</label>
              <input
                type="text"
                name="namaOrganisasi"
                value={formData.namaOrganisasi}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-olive-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive-500"
                placeholder="Masukkan nama organisasi"
              />
            </div>

            <div>
              <label className="block text-sm text-olive-900 font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-olive-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive-500"
                placeholder="organisasi@example.com"
              />
            </div>

            <div>
              <label className="block text-sm text-olive-900 font-medium mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-olive-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive-500"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="block text-sm text-olive-900 font-medium mb-1">Alamat</label>
              <textarea
                name="alamat"
                rows="2"
                value={formData.alamat}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-olive-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive-500"
                placeholder="Alamat lengkap"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm text-olive-900 font-medium mb-1">Nomor Telepon</label>
              <input
                type="number"
                name="notlp"
                value={formData.notlp}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-olive-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive-500"
                placeholder="08xxxxxxxxxx"
              />
            </div>

            <div>
              <label className="block text-sm text-olive-900 font-medium mb-1">Deskripsi Organisasi</label>
              <textarea
                name="deskripsi"
                rows="2"
                value={formData.deskripsi}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-olive-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive-500"
                placeholder="Deskripsi singkat organisasi"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm text-olive-900 font-medium mb-1">Logo Organisasi</label>
              <label
                htmlFor="logo"
                className="flex flex-col items-center justify-center w-full h-24 border border-olive-500 border-dashed rounded-xl cursor-pointer bg-olive-50 hover:bg-olive-100"
              >
                {logoPreview ? (
                  <img
                    src={logoPreview}
                    alt="Logo Preview"
                    className="w-full h-full object-contain p-2"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center pt-2 pb-2">
                    <Upload className="w-6 h-6 mb-1 text-olive-600" />
                    <p className="text-sm text-olive-600 font-semibold">Klik untuk upload</p>
                    <p className="text-xs text-olive-500">SVG, PNG, JPG (MAX. 2MB)</p>
                  </div>
                )}
                <input
                  id="logo"
                  type="file"
                  name="logo"
                  className="hidden"
                  accept="image/*"
                  onChange={handleLogoChange}
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-olive-500 text-white text-md py-2 rounded-xl hover:bg-olive-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-olive-500 disabled:bg-stone-300"
            >
              {loading ? "Mendaftar..." : "Daftar Organisasi"}
            </button>

            <p className="text-center text-sm mt-4">
              Sudah punya akun?{" "}
              <Link to="/login" className="text-olive-600 font-semibold hover:underline">
                Masuk
              </Link>
            </p>

            <p className="text-center text-sm mt-2">
              <Link to="/register-selection" className="text-olive-600 hover:underline">
                Kembali ke pemilihan jenis akun
              </Link>
            </p>
          </form>
        </div>

        {/* Right Section - Optional image */}
        <div className="hidden md:block w-3/5 relative">
          <img
            src={HeroBg}
            alt="Background"
            className="w-full h-full object-cover rounded-r-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/60 to-transparent" />
        </div>
      </div>
    </div>
  );
};

export default RegisterOrganization;
