import { div } from 'framer-motion/client';
import React, { useState, useEffect } from 'react';

const ManagePegawai = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    email: '',
    phone: '',
    status: '',
    address: '',
  });

  useEffect(() => {
    // Simulasi fetch data pegawai
    setTimeout(() => {
      setEmployees([
        { id: 1, name: 'Budi Santoso', address: 'Jl. Merdeka No. 123', status: 'Aktif', email: 'budi@example.com', phone: '081234567890', salary: 'Rp 10.000.000' },
        { id: 2, name: 'Siti Aisyah', address: 'Jl. Merdeka No. 123', status: 'Aktif', email: 'siti@example.com', phone: '081234567891', salary: 'Rp 5.000.000' },
        { id: 3, name: 'Rudi Hartono', address: 'Jl. Merdeka No. 123', status: 'Aktif', email: 'rudi@example.com', phone: '081234567892', salary: 'Rp 6.000.000' },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({
      ...newEmployee,
      [name]: value,
    });
  };

  const handleAddEmployee = () => {
    const newId = employees.length + 1;
    const employeeToAdd = {
      id: newId,
      name: newEmployee.name,
      status: newEmployee.status,
      email: newEmployee.email,
      phone: newEmployee.phone,
      address: newEmployee.address,
    };
    setEmployees([...employees, employeeToAdd]);
    setIsModalOpen(false);
    setNewEmployee({
      name: '',
      email: '',
      phone: '',
      status: '',
      address: '',
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-10">Manage Pegawai</h1>

      {/* Search Bar dan Tombol Tambah Pegawai */}
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Cari pegawai..."
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 border border-gray-300 rounded-md w-1/3"
        />
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-teal-600 text-white px-4 py-3 text-lg rounded-md hover:bg-teal-700"
        >
          + Tambah Pegawai
        </button>
      </div>

      {/* Tabel Pegawai */}
      {loading ? (
        <p>Loading...</p>
      ) : (
      
        <div className='overflow-hidden sm:rounded-lg bg-white shadow mt-10'>
          <table className="min-w-full divide-y divide-gray-200 rounded-2xl shadow">
            <thead >
              <tr className=''>
                <th className="px-6 py-5 bg-teal-600 text-lg leading-4 font-medium text-white uppercase tracking-wider">
                  <div className="flex cursor-pointer">
                    <span className="mr-2">ID</span>
                  </div>
                </th>
                <th className="px-6 py-3 bg-teal-600 text-md leading-4 font-medium text-white uppercase tracking-wider">
                  <div className="flex cursor-pointer">
                    <span className="mr-2">NAMA</span>
                  </div>
                </th>
                <th className="px-6 py-3 bg-teal-600 text-md leading-4 font-medium text-white uppercase tracking-wider">
                  <div className="flex cursor-pointer">
                    <span className="mr-2">NO. TELEPON</span>
                  </div>
                </th>
                <th className="px-6 py-3 bg-teal-600 text-md leading-4 font-medium text-white uppercase tracking-wider">
                  <div className="flex cursor-pointer">
                    <span className="mr-2">ALAMAT</span>
                  </div>
                </th>
                <th className="px-6 py-3 bg-teal-600 text-md leading-4 font-medium text-white uppercase tracking-wider">
                  <div className="flex cursor-pointer">
                    <span className="mr-2">EMAIL</span>
                  </div>
                </th>
                <th className="px-6 py-3 bg-teal-600 text-md leading-4 font-medium text-white uppercase tracking-wider">
                  <div className="flex cursor-pointer">
                    <span className="mr-2">PASSWORD</span>
                  </div>
                </th>
                <th className="px-6 py-3 bg-teal-600 text-md leading-4 font-medium text-white uppercase tracking-wider">
                  <div className="flex cursor-pointer">
                    <span className="mr-2">STATUS</span>
                  </div>
                </th>
                <th className="px-6 py-3 bg-teal-600 text-md leading-4 font-medium text-white uppercase tracking-wider">
                  <div className="flex cursor-pointer">
                    <span className="mr-2">AKSI</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">{employee.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap  text-gray-900">{employee.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap  text-gray-900">{employee.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap  text-gray-900">{employee.address}</td>
                  <td className="px-6 py-4 whitespace-nowrap  text-gray-900">{employee.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap  text-gray-900">
                    <a href="#" className="text-blue-500 underline">Reset</a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex space-x-4">
                      <a href="javascript:void(0)" onClick={() => setUpdateForm(employee.id, employee.name, employee.phone)} className="text-blue-500 hover:text-blue-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        <p>Edit</p>
                      </a>
                      <button 
                        onClick={() => {
                          if(confirm('Are you sure?')) {
                            // Delete function would go here
                          }
                        }} 
                        className="text-red-500 hover:text-red-600"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-1 ml-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        <p>Delete</p>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
      )}

      {/* Modal Tambah Pegawai */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Tambah Pegawai</h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Nama</label>
                <input
                  type="text"
                  name="name"
                  value={newEmployee.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={newEmployee.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">No. Telepon</label>
                <input
                  type="text"
                  name="phone"
                  value={newEmployee.phone}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Gaji</label>
                <input
                  type="text"
                  name="salary"
                  value={newEmployee.salary}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Role</label>
                <input
                  type="text"
                  name="role"
                  value={newEmployee.role}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 text-black px-4 py-2 rounded-md mr-2 hover:bg-gray-400"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleAddEmployee}
                  className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePegawai;