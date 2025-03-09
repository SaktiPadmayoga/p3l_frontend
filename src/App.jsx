import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './layouts/Dashboard';
import ManagePegawai from './components/ManagePegawai';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Dashboard />} />
        {/* <Route path="/manage-pegawai" element={<ManagePegawai />} /> */}
            {/* <Route path="/users" element={<Users />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/email" element={<Email />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/help" element={<Help />} /> */}
      </Routes>
    </Router>
  );
}

export default App;

