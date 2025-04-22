import React from "react";
// import Logo from './assets/logo.svg'
import bg from "../../assets/BgFix.png";

const Register = () => {
  return (
    <div className="flex items-center justify-center bg-cover bg-center bg-no-repeat min-h-screen "
    style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="rounded-xl overflow-hidden flex flex-col md:flex-row max-w-5xl w-full mx-4 md:h-[90vh] shadow-2xl bg-white/60">
        {/* Logo Section */}
        <div className="md:w-1/2 flex flex-col items-center justify-center p-10 text-center sm:ml-14">
          <img src="src/assets/reusemartlogo.svg"  alt="Logo" className=" w-80 object-contain flex justify-center items-center " />
          <h1 className="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl mt-6">
          Reuse lebih baik dari refuse! Bergabung sekarang dan jadi bagian dari perubahan.
          </h1>
        </div>

        {/* Form Section */}
        <div className="md:w-1/2 bg-white/20 bg-opacity-70 backdrop-blur-md p-6 px-12 flex items-center justify-center">
          <div className="w-full max-w-md">
            <a className="flex items-center mb-8 text-3xl font-semibold text-black justify-center">
              <img className="w-8 h-8 mr-3" src="src/assets/reusemartlogo.svg" alt="PharmaCare Logo" />
              ReuseMart
            </a>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-black md:text-xl mb-6">
              Daftar ke ReuseMart
            </h1>
            <form className="space-y-6">
              {/* Email Address */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  className="bg-teal-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5"
                  placeholder="name@company.com"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  className="bg-teal-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5"
                  placeholder="••••••••"
                  required
                />
              </div>

              {/* Alamat */}
              <div>
                <label htmlFor="alamat" className="block text-sm font-medium text-gray-700">Alamat</label>
                <input
                  id="alamat"
                  type="text"
                  name="alamat"
                  className="bg-teal-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5"
                  placeholder="Masukkan alamat tempat tinggal Anda"
                  required
                />
              </div>

              {/* No HP */}
              <div>
                <label htmlFor="notlp" className="block text-sm font-medium text-gray-700">Nomor Telepon</label>
                <input
                  id="notlp"
                  type="number"
                  name="notlp"
                  className="bg-teal-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5"
                  placeholder="Masukkan nomor telepon Anda"
                  required
                />
              </div>

              {/* Kategori */}
              <div>
                <label htmlFor="kategori" className="block text-sm font-medium text-gray-700">Kategori</label>
                <select
                  id="kategori"
                  name="kategori"
                  className="bg-teal-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5"
                  
                  required>
                    <option className="text-gray-300" value="pembeli">Pembeli</option>
                    <option className="text-gray-300" value="organisasi">Organisasi</option>
                </select>
              </div>

              {/* Login Button */}
              <div className="flex items-center text-center">
                <button
                  type="submit"
                  className="w-full text-white bg-teal-500 hover:bg-teal-600 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  Daftar
                </button>
                
              </div>

              {/* Register Link */}
              <p className="text-sm font-light text-gray-500 mt-4">
                Sudah memiliki akun? <a href="/login" className="font-medium text-teal-600 hover:underline">Masuk.</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;