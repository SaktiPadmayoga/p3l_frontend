import React from 'react';
import { Menu, X, Home, Users, Settings, BarChart2, Calendar, Mail, MessageSquare, HelpCircle, LogOut, MoveLeft, PanelLeftClose } from 'lucide-react';
import SidebarItem from './SidebarItem';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <div className={`bg-white text-black transition-all duration-300 $      {sidebarOpen ? 'w-64' : 'w-20'} fixed h-full z-10`}>
      <div className="flex items-center justify-between p-6 border-b border-teal-400 ">
        {sidebarOpen && (
        <div className="flex items-center space-x-2 mr-3">
            <img src="src/assets/reusemartlogo.svg" alt="Logo" className="h-8 w-8" />
            <h1 className="text-2xl font-bold">ReuseMart</h1>
        </div>
        )}
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg hover:bg-teal-600 hover:text-white">
          {sidebarOpen ? <PanelLeftClose size={20} className='' /> : <Menu size={20} />}
        </button>
      </div>
        <nav className="mt-6">
        <SidebarItem icon={<Home />} text="Dashboard" path="/" expanded={sidebarOpen} />
        <SidebarItem icon={<BarChart2 />} text="Manage Pegawai" path="/manage-pegawai" expanded={sidebarOpen} />
        
        <div className="absolute bottom-0 w-full border-t border-teal-400 p-4">
          <SidebarItem icon={<LogOut />} text="Logout" path="/" expanded={sidebarOpen} />
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
