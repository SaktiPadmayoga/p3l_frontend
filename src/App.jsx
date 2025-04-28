import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Dashboard from './layouts/Administrator/Dashboard';
import Login from './auth/login/login';
import Register from './auth/register/register';
import HomePage from './layouts/user/pages/homepage';
import Catalogue from './layouts/user/pages/catalogue';
import UserNavbar from './layouts/user/components/user-navbar';
import Footer from './layouts/user/components/footer';
import DetailProduct from './layouts/user/pages/detail-product';
import Profile from './layouts/user/pages/profile';
import ManagePegawai from './layouts/administrator/pages/manage-pegawai';
import ManagePenitip from './layouts/administrator/pages/ManagePenitip';
import ManageJabatan from './layouts/administrator/pages/ManageJabatan';
import ManageOrganisasi from './layouts/administrator/pages/ManageOrganisasi';
import ManageMerchandise from './layouts/administrator/pages/ManageMerchandise';
import ManageRequestDonasi from './layouts/administrator/pages/ManageRequestDonasi';
import DaftarRequestDonasi from './layouts/administrator/pages/DaftarRequestDonasi';
import HistoryDonasi from './layouts/administrator/pages/HistoryDonasi';
import DashboardContent from './layouts/administrator/pages/DashboardContent';

// Layout component that includes navbar and footer
const UserLayout = ({ isLoggedIn }) => {
  return (
    <>
      <UserNavbar isLoggedIn={isLoggedIn} />
      <Outlet /> {/* This is where the child route components will be rendered */}
    </>
  );
};

function App() {
  const isLoggedIn = true;

  return (
    <Router>
      <Routes>
        {/* Routes WITHOUT navbar and footer */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Dashboard />} />

        {/* Admin layout */}
        <Route path="/admin" element={<Dashboard />}>
          <Route index path='dashboard' element={<DashboardContent />} /> {/* /admin */}
          <Route path="manage-pegawai" element={<ManagePegawai />} /> {/* /admin/manage-pegawai */}
          <Route path="manage-penitip" element={<ManagePenitip />} /> {/* /admin/manage-penitip */}
          <Route path="manage-jabatan" element={<ManageJabatan />} /> {/* /admin/manage-jabatan */}
          <Route path="manage-organisasi" element={<ManageOrganisasi />} /> {/* /admin/manage-organisasi */}
          <Route path="manage-merchandise" element={<ManageMerchandise />} /> {/* /admin/manage-merchandise */}
          <Route path="manage-request-donasi" element={<ManageRequestDonasi />} /> {/* /admin/manage-request-donasi */}
          <Route path="daftar-request-donasi" element={<DaftarRequestDonasi />} /> {/* /admin/daftar-request-donasi */}
          <Route path="history-donasi" element={<HistoryDonasi />} /> {/* /admin/history-donasi */}
        </Route>
                
        
        {/* Routes WITH navbar and footer */}
        <Route element={<UserLayout isLoggedIn={isLoggedIn} />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/detail-product" element={<DetailProduct />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<HomePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;