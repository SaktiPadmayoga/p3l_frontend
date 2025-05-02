import React, { useState, useEffect } from 'react';
import { Menu, PanelLeftClose, Home, Users, UserPlus, Briefcase, Building2, Package, HandHelping, HeartHandshake, History, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import SidebarItem from './SidebarItem';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const [userRoles, setUserRoles] = useState([]);
  const [userPermissions, setUserPermissions] = useState([]);
  const [userType, setUserType] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate hook
  
  useEffect(() => {
    // Get user data from localStorage (saved during login)
    const getUserData = () => {
      try {
        setIsLoading(true);
        
        // Get user data from localStorage
        const userData = JSON.parse(localStorage.getItem('userData'));
        const userType = localStorage.getItem('userType');
        
        if (!userData) {
          console.error('No user data found in localStorage');
          setIsLoading(false);
          return;
        }
        
        // Set user type (pegawai or pembeli)
        setUserType(userType || '');
        
        // Set roles from user data
        setUserRoles(userData.role || []);
        
        // Set permissions if available (only for pegawai)
        if (userData.permissions) {
          setUserPermissions(userData.permissions || []);
        } else {
          setUserPermissions([]);
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to load user data:', error);
        setIsLoading(false);
      }
    };
    
    getUserData();
  }, []);

  // Functions to check if user has specific roles or permissions
  const hasRole = (role) => userRoles.includes(role);
  const hasPermission = (permission) => userPermissions.includes(permission);

  // Logout function
  const handleLogout = () => {
    // Clear all auth related data
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('userData');
    
    // Optional: Invalidate token di backend
    // axios.post('/api/logout');
    
    // Redirect ke halaman login
    navigate('/login');
    
    // Optional: Force reload halaman untuk clear state
    window.location.reload();
  };

  if (isLoading) {
    return <div className="bg-white text-black fixed h-full z-50 w-64 flex items-center justify-center">
      <p>Loading...</p>
    </div>;
  }

  return (
    <div className={`bg-white text-black transition-all duration-300 fixed h-full z-50 ${sidebarOpen ? 'w-64' : 'sm:w-20 w-64'} ${sidebarOpen ? 'left-0' : 'sm:left-0 -left-full'}`}>
      <div className="flex items-center justify-between p-6 border-b border-stone-400">
        {(sidebarOpen || window.innerWidth < 640) && (
          <div className="flex items-center space-x-2 mr-3">
            <img src="src/assets/logo.png" alt="Logo" className="h-10 w-10" />
            <h1 className="text-2xl font-bold">ReuseMart</h1>
          </div>
        )}
        <div className="sm:block hidden">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg hover:bg-stone-600 hover:text-white">
            {sidebarOpen ? <PanelLeftClose size={20} /> : <Menu size={20} />}
          </button>
        </div>
        <div className="sm:hidden block">
          <button onClick={() => setSidebarOpen(false)} className="p-2 rounded-lg hover:bg-stone-600 hover:text-white">
            <PanelLeftClose size={20} />
          </button>
        </div>
      </div>
      <nav className="mt-6">
        {/* Dashboard - Only for admin */}
        {hasRole('admin') &&(
          <SidebarItem 
            icon={<Home />} 
            text="Dashboard" 
            path="dashboard" 
            expanded={sidebarOpen || window.innerWidth < 640} 
          />
        )}
        
        {/* Manage Pegawai - Admin with manage_pegawai permission */}
        {hasRole('admin') && hasPermission('manage-pegawai') && (
          <SidebarItem 
            icon={<Users />} 
            text="Manage Pegawai" 
            path="manage-pegawai" 
            expanded={sidebarOpen || window.innerWidth < 640} 
          />
        )}
        
        {/* Manage Penitip - Admin with manage_penitip permission */}
        {hasRole('cs') && hasPermission('manage-penitip') && (
          <SidebarItem 
            icon={<UserPlus />} 
            text="Manage Penitip" 
            path="manage-penitip" 
            expanded={sidebarOpen || window.innerWidth < 640} 
          />
        )}
        {hasRole('cs') && hasPermission('manage-diskusi') && (
          <SidebarItem 
            icon={<UserPlus />} 
            text="Manage Diskusi" 
            path="manage-diskusi" 
            expanded={sidebarOpen || window.innerWidth < 640} 
          />
        )}
        
        {/* Manage Jabatan - Only for admin */}
        {hasRole('admin') && hasPermission('manage-jabatan') && (
          <SidebarItem 
            icon={<Briefcase />} 
            text="Manage Jabatan" 
            path="manage-jabatan" 
            expanded={sidebarOpen || window.innerWidth < 640} 
          />
        )}
        
        {/* Manage Organisasi - Only for organisasi role */}
        {hasRole('admin') && hasPermission('manage-organisasi') && (
          <SidebarItem 
            icon={<Building2 />} 
            text="Manage Organisasi" 
            path="manage-organisasi" 
            expanded={sidebarOpen || window.innerWidth < 640} 
          />
        )}
        
        {/* Manage Merchandise - Anyone with manage_merchandise permission */}
        {hasRole('admin') && hasPermission('manage-merchandise') &&  (
          <SidebarItem 
            icon={<Package />} 
            text="Manage Merchandise" 
            path="manage-merchandise" 
            expanded={sidebarOpen || window.innerWidth < 640} 
          />
        )}
        {/* Manage Request Donasi - Anyone with manage_request_donasi permission */}
        {hasRole('organisasi') && hasPermission('manage-request-donasi') && (
          <SidebarItem 
            icon={<HandHelping />} 
            text="Manage Request Donasi" 
            path="manage-request-donasi" 
            expanded={sidebarOpen || window.innerWidth < 640} 
          />
        )}
        
        {/* Manage Donasi - Anyone with manage_donasi permission */}
        {hasRole('owner') && hasPermission('manage-donasi') && (
          <SidebarItem 
            icon={<HeartHandshake />} 
            text="Manage Donasi" 
            path="daftar-request-donasi" 
            expanded={sidebarOpen || window.innerWidth < 640} 
          />
        )}
        
        {/* History Donasi - Anyone with history_donasi permission */}
        {hasRole('owner') && hasPermission('history-donasi') && (
          <SidebarItem 
            icon={<History />} 
            text="History Donasi" 
            path="history-donasi" 
            expanded={sidebarOpen || window.innerWidth < 640} 
          />
        )}

        {hasRole('gudang') && hasPermission('manage-transaksi-penitipan') && (
          <SidebarItem 
            icon={<History />} 
            text="Manage Penitipan" 
            path="manage-transaksi-penitipan" 
            expanded={sidebarOpen || window.innerWidth < 640} 
          />
        )}
        {hasRole('gudang') && hasPermission('manage-barang-penitipan') && (
          <SidebarItem 
            icon={<History />} 
            text="Manage Barang Titipan" 
            path="manage-barang-penitipan" 
            expanded={sidebarOpen || window.innerWidth < 640} 
          />
        )}

        {/* Logout is available to everyone */}
        <div className="absolute bottom-0 w-full border-t border-stone-400 p-2">
  <button 
    onClick={() => {
      if(window.confirm('Yakin ingin logout?')) {
        handleLogout();
      }
    }}
    className={`flex items-center w-full p-3 rounded-lg hover:bg-black hover:text-white transition-colors duration-200 ${
      sidebarOpen || window.innerWidth < 640 ? 'justify-start' : 'justify-center'
    }`}
    title="Logout"
  >
    <LogOut size={20} />
    {(sidebarOpen || window.innerWidth < 640) && 
      <span className="ml-3">Logout</span>}
  </button>
</div>
      </nav>
    </div>
  );
};

export default Sidebar;