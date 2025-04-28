import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  ShoppingCart, 
  Bell, 
  Home, 
  Package, 
  Info, 
  LogIn, 
  UserPlus 
} from 'lucide-react';

const UserNavbar = ({ isLoggedIn = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const linkClasses = (path) =>
    `px-3 py-2 rounded-md text-xl font-medium transition duration-150 flex items-center ${
      isActive(path)
        ? 'text-teal-600 bg-gray-100'
        : 'text-gray-700 hover:text-teal-600 hover:bg-gray-100'
    }`;

  return (
    <nav className=" fixed top-0 z-50 px-4 sm:px-6 lg:px-16 w-full">
      <div className=" bg-white w-full rounded-b-2xl px-4">
        <div className="flex justify-between h-24">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <img className="h-8 w-8" src="/src/assets/reusemartlogo.svg" alt="ReuseMart" />
              <span className="ml-2 text-2xl font-bold text-teal-600">ReuseMart</span>
            </div>
            <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
            <Link to="/" className={linkClasses('/')}>
              <Home className="mr-1 h-4 w-4" />
              Home
            </Link>
            <Link to="/catalogue" className={linkClasses('/catalogue')}>
              <Package className="mr-1 h-4 w-4" />
              Products
            </Link>
            <Link to="/about" className={linkClasses('/about')}>
              <Info className="mr-1 h-4 w-4" />
              About Us
            </Link>
          </div>
          </div>
          <div className="relative flex items-center w-full max-w-4xl">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-5 py-3 text-gray-700 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600 text-lg"
              />
              <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-teal-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35M16.65 10.65a6 6 0 11-12 0 6 6 0 0112 0z"
                  />
                </svg>
              </button>
          </div>
          
          
          {/* Right side buttons */}
          <div className="hidden md:flex items-center">
            {isLoggedIn ? (
              <>
                {/* Cart Icon */}
                <Link to="/cart" className="p-2 rounded-full text-gray-600 hover:text-teal-600 hover:bg-gray-100 relative">
                  <ShoppingCart className="h-6 w-6" />
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">3</span>
                </Link>
                
                {/* Notification Icon */}
                <Link to="/notifications" className="ml-4 p-2 rounded-full text-gray-600 hover:text-teal-600 hover:bg-gray-100 relative">
                  <Bell className="h-6 w-6" />
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">2</span>
                </Link>
                
                {/* Avatar */}
                <Link to="/profile" className="ml-4">
                  <div className="h-8 w-8 rounded-full bg-teal-500 flex items-center justify-center text-white font-semibold">
                    US
                  </div>
                </Link>
              </>
            ) : (
              <>
                {/* Login Button */}
                <Link to="/login" className="px-4 py-2 text-xl font-medium text-teal-600 rounded-md hover:bg-gray-100 hover:text-teal-700 flex items-center">
                  <LogIn className="mr-1 h-4 w-4" />
                  Login
                </Link>
                
                {/* Register Button */}
                <Link to="/register" className="ml-3 px-4 py-2 text-xl font-medium text-white bg-teal-600 rounded-md hover:bg-teal-700 flex items-center">
                  <UserPlus className="mr-1 h-4 w-4" />
                  Register
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-teal-600 hover:bg-gray-100 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
          <Link 
            to="/" 
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="flex items-center">
              <Home className="mr-2 h-5 w-5" />
              Home
            </span>
          </Link>
          <Link 
            to="/products" 
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="flex items-center">
              <Package className="mr-2 h-5 w-5" />
              Products
            </span>
          </Link>
          <Link 
            to="/about" 
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="flex items-center">
              <Info className="mr-2 h-5 w-5" />
              About Us
            </span>
          </Link>
          
          {isLoggedIn ? (
            <div className="border-t pt-4 pb-3">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-teal-500 flex items-center justify-center text-white font-semibold">
                    US
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">User Name</div>
                  <div className="text-sm font-medium text-gray-500">user@example.com</div>
                </div>
              </div>
              <div className="mt-3 space-y-1 px-2">
                <Link 
                  to="/cart" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="flex items-center">
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Cart
                    <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">3</span>
                  </span>
                </Link>
                <Link 
                  to="/notifications" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="flex items-center">
                    <Bell className="mr-2 h-5 w-5" />
                    Notifications
                    <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">2</span>
                  </span>
                </Link>
                <Link 
                  to="/profile" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
              </div>
            </div>
          ) : (
            <div className="pt-4 pb-3 border-t flex flex-col space-y-2 px-3">
              <Link 
                to="/login" 
                className="flex items-center justify-center px-4 py-2 text-base font-medium text-teal-600 rounded-md border border-teal-600"
                onClick={() => setIsMenuOpen(false)}
              >
                <LogIn className="mr-2 h-5 w-5" />
                Login
              </Link>
              <Link 
                to="/register" 
                className="flex items-center justify-center px-4 py-2 text-base font-medium text-white bg-teal-600 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                <UserPlus className="mr-2 h-5 w-5" />
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;