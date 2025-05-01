import React from "react";
import { Link } from "react-router-dom";
import { UserCircle, Building } from "lucide-react";
import bg from "../../assets/BgFix.png";

const RegisterTypeSelection = () => {
  return (
    <div
      className="flex items-center justify-center bg-cover bg-center bg-no-repeat min-h-screen"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="rounded-xl overflow-hidden flex flex-col max-w-5xl w-full mx-4 md:h-[90vh] shadow-2xl bg-white/60">
        {/* Logo Section */}
        <div className="flex flex-col items-center justify-center p-10 text-center">
          <img
            src="src/assets/reusemartlogo.svg"
            alt="Logo"
            className="w-32 object-contain"
          />
          <h1 className="text-3xl font-bold text-teal-800 mt-6">
            Pilih Jenis Akun
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Silakan pilih jenis akun yang ingin Anda daftarkan
          </p>
        </div>

        {/* Selection Cards */}
        <div className="flex flex-col md:flex-row gap-6 p-8 justify-center">
          {/* Individual User Card */}
          <Link
            to="/register"
            className="flex flex-col items-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 w-full md:w-1/2 border border-gray-200 hover:border-teal-500"
          >
            <div className="p-4 bg-teal-100 rounded-full mb-4">
              <UserCircle size={64} className="text-teal-600" />
            </div>
            <h2 className="text-2xl font-semibold text-teal-800 mb-2">
              Pembeli
            </h2>
            <p className="text-center text-gray-600">
              Daftar sebagai pembeli untuk mengakses katalog produk dan
              melakukan pembelian
            </p>
            <button className="mt-6 px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
              Daftar sebagai Pembeli
            </button>
          </Link>

          {/* Organization Card */}
          <Link
            to="/register-organisasi"
            className="flex flex-col items-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 w-full md:w-1/2 border border-gray-200 hover:border-teal-500"
          >
            <div className="p-4 bg-teal-100 rounded-full mb-4">
              <Building size={64} className="text-teal-600" />
            </div>
            <h2 className="text-2xl font-semibold text-teal-800 mb-2">
              Organisasi
            </h2>
            <p className="text-center text-gray-600">
              Daftar sebagai organisasi untuk menyediakan produk dan mengajukan
              permintaan donasi
            </p>
            <button className="mt-6 px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
              Daftar sebagai Organisasi
            </button>
          </Link>
        </div>

        {/* Login Link */}
        <div className="text-center pb-8">
          <p className="text-gray-600">
            Sudah memiliki akun?{" "}
            <Link
              to="/login"
              className="text-teal-600 font-medium hover:underline"
            >
              Masuk sekarang
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterTypeSelection;
