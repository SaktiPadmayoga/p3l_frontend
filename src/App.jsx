import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Dashboard from "./layouts/Administrator/Dashboard";
import Login from "./auth/login/login";
import Register from "./auth/register/register";
import RegisterTypeSelection from "./auth/register/RegisterTypeSelection";
import RegisterOrganisasi from "./auth/register/RegisterOrganisasi";
import HomePage from "./layouts/user/pages/homepage";
import Catalogue from "./layouts/user/pages/Catalogue";
import UserNavbar from "./layouts/user/components/UserNavbar";
import DetailProduct from "./layouts/user/pages/DetailProduct";
import Profile from "./layouts/user/pages/Profile";
import ManagePegawai from "./layouts/administrator/pages/ManagePegawai";
import ManagePenitip from "./layouts/administrator/pages/ManagePenitip";
import ManageJabatan from "./layouts/administrator/pages/ManageJabatan";
import ManageOrganisasi from "./layouts/administrator/pages/ManageOrganisasi";
import ManageMerchandise from "./layouts/administrator/pages/ManageMerchandise";
import ManageRequestDonasi from "./layouts/administrator/pages/ManageRequestDonasi";
import DaftarRequestDonasi from "./layouts/administrator/pages/DaftarRequestDonasi";
import HistoryDonasi from "./layouts/administrator/pages/HistoryDonasi";
import DashboardContent from "./layouts/administrator/pages/DashboardContent";
import AuthService from "./services/authService";

// Layout component that includes navbar and footer
const UserLayout = () => {
  return (
    <>
      <UserNavbar />
      <Outlet />{" "}
      {/* This is where the child route components will be rendered */}
    </>
  );
};

// Protected route component to prevent unauthorized access
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = AuthService.isAuthenticated();
  const userType = AuthService.getUserType();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Redirect admin users to admin dashboard
  if (userType === "pegawai") {
    return <Navigate to="/admin/dashboard" />;
  }

  return children;
};

// Admin route protection
const AdminRoute = ({ children }) => {
  const isAuthenticated = AuthService.isAuthenticated();
  const userType = AuthService.getUserType();

  if (!isAuthenticated || userType !== "pegawai") {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  const [authChecked, setAuthChecked] = useState(false);

  // Check authentication status when the app loads
  useEffect(() => {
    // Just set the flag to true, as isAuthenticated() will check localStorage
    setAuthChecked(true);
  }, []);

  // Wait until auth check is complete
  if (!authChecked) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register-selection" element={<RegisterTypeSelection />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register-organisasi" element={<RegisterOrganisasi />} />

        {/* Admin layout - protected */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<DashboardContent />} />
          <Route path="manage-pegawai" element={<ManagePegawai />} />
          <Route path="manage-penitip" element={<ManagePenitip />} />
          <Route path="manage-jabatan" element={<ManageJabatan />} />
          <Route path="manage-organisasi" element={<ManageOrganisasi />} />
          <Route path="manage-merchandise" element={<ManageMerchandise />} />
          <Route
            path="manage-request-donasi"
            element={<ManageRequestDonasi />}
          />
          <Route
            path="daftar-request-donasi"
            element={<DaftarRequestDonasi />}
          />
          <Route path="history-donasi" element={<HistoryDonasi />} />
        </Route>

        {/* User layout */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/detail-product" element={<DetailProduct />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<HomePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
