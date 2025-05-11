import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Upload } from "lucide-react";
import bg from "../../assets/BgFix.png";
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
  const navigate = useNavigate(); // Hook for navigation

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

  // In the handleSubmit function of RegisterOrganization.jsx

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    // Create FormData object
    const formDataToSend = new FormData();

    // Append form values to FormData
    formDataToSend.append("NAMA", formData.namaOrganisasi);
    formDataToSend.append("EMAIL", formData.email);
    formDataToSend.append("PASSWORD", formData.password);
    formDataToSend.append("ALAMAT", formData.alamat);
    formDataToSend.append("TELEPON", formData.notlp);
    formDataToSend.append("DESKRIPSI", formData.deskripsi);

    // Append the logo file if it exists
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
        // Show success message
        const successMessage = "Registrasi berhasil! Redirecting to login...";
        setError(successMessage); // You could use a separate state for success messages

        // Redirect after a short delay
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (err) {
      console.error("Registration error:", err);

      if (err.response) {
        // The server responded with an error status
        if (err.response.data.errors) {
          // Format validation errors nicely
          const errorMessages = Object.entries(err.response.data.errors)
            .map(([field, messages]) => {
              return `${
                field.charAt(0).toUpperCase() + field.slice(1)
              }: ${messages.join(", ")}`;
            })
            .join("\n");

          setError(errorMessages);
        } else if (err.response.data.error) {
          // Single error message
          setError(err.response.data.error);
        } else if (err.response.data.message) {
          setError(err.response.data.message);
        } else if (err.response.status === 500) {
          setError("Server error. Please try again later.");
        } else {
          setError(`Error ${err.response.status}: Registration failed`);
        }
      } else if (err.request) {
        // The request was made but no response was received
        setError("No response from server. Please check your connection.");
      } else {
        // Something happened in setting up the request
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div
      className="flex items-center justify-center bg-cover bg-center bg-no-repeat min-h-screen py-10"
      // style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="rounded-xl overflow-hidden flex flex-col md:flex-row max-w-5xl w-full mx-4 shadow-2xl bg-white/60">
        {/* Logo Section */}
        <div className="md:w-1/2 flex flex-col items-center justify-center p-10 text-center sm:ml-14">
          <img
            src="src/assets/logo.png"
            alt="Logo"
            className="w-80 object-contain flex justify-center items-center"
          />
          <h1 className="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl mt-6">
            Bergabung sebagai organisasi dan jadilah mitra perubahan lingkungan
            bersama kami.
          </h1>
        </div>

        {/* Form Section */}
        <div className="md:w-1/2 bg-white/20 backdrop-blur-md p-6 px-12 flex items-center justify-center">
          <div className="w-full max-w-md">
            <a className="flex items-center mb-6 text-3xl font-semibold text-black justify-center">
              <img
                className="w-8 h-8 mr-3"
                src="src/assets/logo.png"
                alt="ReuseMart Logo"
              />
              ReuseMart
            </a>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-black md:text-xl mb-4">
              Daftar sebagai Organisasi
            </h1>
            {error && <p className="text-red-500">{error}</p>}
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Nama Organisasi */}
              <div>
                <label
                  htmlFor="namaOrganisasi"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nama Organisasi
                </label>
                <input
                  id="namaOrganisasi"
                  type="text"
                  name="namaOrganisasi"
                  value={formData.namaOrganisasi}
                  onChange={handleChange}
                  className="bg-stone-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-stone-600 focus:border-stone-600 block w-full p-2.5"
                  placeholder="Masukkan nama organisasi"
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
                  placeholder="organisasi@example.com"
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

              {/* Alamat */}
              <div>
                <label
                  htmlFor="alamat"
                  className="block text-sm font-medium text-gray-700"
                >
                  Alamat
                </label>
                <textarea
                  id="alamat"
                  name="alamat"
                  rows="2"
                  value={formData.alamat}
                  onChange={handleChange}
                  className="bg-stone-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-stone-600 focus:border-stone-600 block w-full p-2.5"
                  placeholder="Masukkan alamat lengkap organisasi"
                  required
                ></textarea>
              </div>

              {/* No Telepon */}
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
                  placeholder="Masukkan nomor telepon organisasi"
                  required
                />
              </div>

              {/* Deskripsi Organisasi */}
              <div>
                <label
                  htmlFor="deskripsi"
                  className="block text-sm font-medium text-gray-700"
                >
                  Deskripsi Organisasi
                </label>
                <textarea
                  id="deskripsi"
                  name="deskripsi"
                  rows="3"
                  value={formData.deskripsi}
                  onChange={handleChange}
                  className="bg-stone-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-stone-600 focus:border-stone-600 block w-full p-2.5"
                  placeholder="Ceritakan tentang organisasi Anda"
                  required
                ></textarea>
              </div>

              {/* Logo Organisasi */}
              <div>
                <label
                  htmlFor="logo"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Logo Organisasi
                </label>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="logo"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-stone-50 hover:bg-stone-100"
                  >
                    {logoPreview ? (
                      <img
                        src={logoPreview}
                        alt="Logo Preview"
                        className="w-full h-full object-contain p-2"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-2 text-gray-500" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">
                            Klik untuk upload
                          </span>{" "}
                          atau drag and drop
                        </p>
                        <p className="text-xs text-gray-500">
                          SVG, PNG, JPG (MAX. 2MB)
                        </p>
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
              </div>

              {/* Register Button */}
              <div className="flex items-center text-center">
                <button
                  type="submit"
                  className="w-full text-white bg-stone-500 hover:bg-stone-600 focus:ring-4 focus:outline-none focus:ring-stone-300 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  Daftar Organisasi
                </button>
              </div>

              {/* Login Link */}
              <p className="text-sm font-light text-gray-500">
                Sudah memiliki akun?{" "}
                <a
                  href="/login"
                  className="font-medium text-stone-600 hover:underline"
                >
                  Masuk
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

export default RegisterOrganization;
