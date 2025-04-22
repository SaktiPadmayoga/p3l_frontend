import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardContent from './components/DashboardContent';
import ManagePegawai from './pages/manage-pegawai';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // md breakpoint

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
      // Di desktop, pastikan sidebar selalu terbuka
      if (window.innerWidth >= 640) {
        setSidebarOpen(true);
      } else {
        // Optional: close sidebar on mobile by default
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Panggil sekali saat komponen dimount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex h-auto bg-teal-50 w-full overflow-x-hidden relative">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} isMobile={isMobile} />

      {/* Overlay untuk layar kecil */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Konten utama */}
      <div className={`flex-1 transition-all duration-300 mt-20 ${isMobile ? 'ml-0' : (sidebarOpen ? 'ml-64' : 'ml-20')} w-full`}>
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} isMobile={isMobile} />
        <main className="p-6 w-full overflow-x-hidden">
          <Routes>
            <Route path="/" element={<DashboardContent />} />
            <Route path="/manage-pegawai" element={<ManagePegawai />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;