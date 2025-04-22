import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './layouts/Administrator/Dashboard';
import Login from './auth/login/login';
import Register from './auth/register/register';
import HomePage from './layouts/user/pages/homepage';
import UserNavbar from './layouts/user/components/use-navbar';
import DetailProduct from './layouts/user/pages/detail-product';

function App() {
  const isLoggedIn = false;

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/detail-product" element={
          <>
            <UserNavbar isLoggedIn={isLoggedIn} />
            <DetailProduct />
          </>
        } />
        <Route path="*" element={
          <>
            <UserNavbar isLoggedIn={isLoggedIn} />
            <HomePage />
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;