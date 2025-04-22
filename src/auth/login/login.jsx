import React from "react";
// import Logo from "./assets/logo.svg";
import { Link } from "react-router-dom";
import bg from "../../assets/BgFix.png";

const Login = () => {
  return (
    <div
      className="flex items-center justify-center bg-cover bg-center bg-no-repeat min-h-screen"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="rounded-xl overflow-hidden flex flex-col md:flex-row max-w-5xl w-full mx-4 md:h-[65vh] shadow-2xl bg-white/60">
        {/* Logo Section */}
        <div className="md:w-1/2 flex flex-col items-center justify-center p-10 text-center sm:ml-14">
          <img src="src/assets/reusemartlogo.svg" alt="Logo" className="w-80 object-contain" />
          <h1 className="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl mt-6">
            Reuse lebih baik dari refuse! Bergabung sekarang dan jadi bagian dari perubahan.
          </h1>
        </div>

        {/* Form Section */}
        <div className="md:w-1/2 bg-white/20 backdrop-blur-md p-6 px-12 flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="flex items-center mb-8 text-3xl font-semibold text-black justify-center">
              <img className="w-8 h-8 mr-3" src="src/assets/reusemartlogo.svg" alt="ReuseMart Logo" />
              ReuseMart
            </div>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-black md:text-xl mb-6">
              Masuk ke Akun Anda
            </h1>
            <form className="space-y-6">
              {/* Email Address */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
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
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  className="bg-teal-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5"
                  placeholder="••••••••"
                  required
                />
              </div>

              {/* Remember Me */}
              <div className="flex items-center">
                <input
                  id="remember_me"
                  type="checkbox"
                  className="rounded border-gray-300 text-teal-600 shadow-sm focus:ring-teal-500 active:ring-teal-500"
                />
                <label htmlFor="remember_me" className="ml-2 text-sm text-gray-600">
                  Ingat Saya
                </label>
              </div>

              {/* Login Button */}
              <div className="flex items-center text-center">
                {/* <button
                  type="submit"
                  className="w-full text-white bg-teal-500 hover:bg-teal-600 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  Masuk
                </button> */}
                <a
                  href="/dashboard"
                  className="w-full text-white bg-teal-500 hover:bg-teal-600 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  Masuk
                </a>
              </div>

              {/* Register Link */}
              <p className="text-sm font-light text-gray-500 mt-4">
                Belum memiliki akun?{" "}
                <Link to="/register" className="font-medium text-teal-600 hover:underline">
                  Daftar disini.
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
