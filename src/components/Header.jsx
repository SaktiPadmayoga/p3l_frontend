import React from 'react';
import { Mail, MessageSquare } from 'lucide-react';

const Header = ({ sidebarOpen }) => {
    return (
      <header className={`bg-white shadow-lg fixed top-0 left-0 w-full z-50 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-22'}`}>
        <div className="relative w-full flex items-center justify-between p-4 pr-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
            <p className="text-sm text-gray-600">Welcome back, Admin</p>
          </div>
        </div>
      </header>
    );
  };
  
export default Header;
