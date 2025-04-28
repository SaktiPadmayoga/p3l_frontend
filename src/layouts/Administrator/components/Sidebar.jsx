import React from 'react';
import { Menu, PanelLeftClose, Home, Users, UserPlus, Briefcase, Building2, Package, HandHelping, HeartHandshake, History, LogOut } from 'lucide-react';

import SidebarItem from './SidebarItem';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <div className={`bg-white text-black transition-all duration-300 fixed h-full z-50
      ${sidebarOpen ? 'w-64' : 'sm:w-20 w-64'} 
      ${sidebarOpen ? 'left-0' : 'sm:left-0 -left-full'}`}>
      <div className="flex items-center justify-between p-6 border-b border-teal-400">
        {(sidebarOpen || window.innerWidth < 640) && (
          <div className="flex items-center space-x-2 mr-3">
            <img src="src/assets/reusemartlogo.svg" alt="Logo" className="h-8 w-8" />
            <h1 className="text-2xl font-bold">ReuseMart</h1>
          </div>
        )}
        {/* Show close button on mobile when sidebar is open */}
        <div className="sm:block hidden">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg hover:bg-teal-600 hover:text-white">
            {sidebarOpen ? <PanelLeftClose size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {/* Show close button on mobile only when sidebar is open */}
        <div className="sm:hidden block">
          <button onClick={() => setSidebarOpen(false)} className="p-2 rounded-lg hover:bg-teal-600 hover:text-white">
            <PanelLeftClose size={20} />
          </button>
        </div>
      </div>
      <nav className="mt-6">
        <SidebarItem icon={<Home />} text="Dashboard" path="dashboard" expanded={sidebarOpen || window.innerWidth < 640} />
        <SidebarItem icon={<Users />} text="Manage Pegawai" path="manage-pegawai" expanded={sidebarOpen || window.innerWidth < 640} />
        <SidebarItem icon={<UserPlus />} text="Manage Penitip" path="manage-penitip" expanded={sidebarOpen || window.innerWidth < 640} />
        <SidebarItem icon={<Briefcase />} text="Manage Jabatan" path="manage-jabatan" expanded={sidebarOpen || window.innerWidth < 640} />
        <SidebarItem icon={<Building2 />} text="Manage Organisasi" path="manage-organisasi" expanded={sidebarOpen || window.innerWidth < 640} />
        <SidebarItem icon={<Package />} text="Manage Merchandise" path="manage-merchandise" expanded={sidebarOpen || window.innerWidth < 640} />
        <SidebarItem icon={<HandHelping />} text="Manage Request Donasi" path="manage-request-donasi" expanded={sidebarOpen || window.innerWidth < 640} />
        <SidebarItem icon={<HeartHandshake />} text="Manage Donasi" path="daftar-request-donasi" expanded={sidebarOpen || window.innerWidth < 640} />
        <SidebarItem icon={<History />} text="History Donasi" path="history-donasi" expanded={sidebarOpen || window.innerWidth < 640} /> 
        
        <div className="absolute bottom-0 w-full border-t border-teal-400 p-2">
          <SidebarItem icon={<LogOut />} text="Logout" path="/login" expanded={sidebarOpen || window.innerWidth < 640} />
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;