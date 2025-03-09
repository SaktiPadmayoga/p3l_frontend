import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import DashboardContent from '../components/DashboardContent';
import ManagePegawai from '../components/ManagePegawai'; // Tambahkan halaman lainnya

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-auto bg-teal-50">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <Header sidebarOpen={sidebarOpen} />
        <main className="p-6">
          <Routes>
            <Route path="/" element={<DashboardContent />} />
            <Route path="/manage-pegawai" element={<ManagePegawai />} />
            {/* Tambahkan route lain jika diperlukan */}
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
