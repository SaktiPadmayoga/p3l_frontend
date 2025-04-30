import { div } from 'framer-motion/client';
import React, { useState, useEffect } from 'react';

const ManagePenitip = () => {
  const [penitips, setPenitips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPenitip, setNewPenitip] = useState({
    name: '',
    email: '',
    phone: '',
    status: '',
    address: '',
    saldo: '',
    poin: '',
    rating: '',
    badge: '',
    noKtp: '',
    password: '',
    jmlPenjualan: '',
  });

  useEffect(() => {
    // Simulasi fetch data penitip
    setTimeout(() => {
      setPenitips([
        { id: 1, name: 'Andi Wijaya', address: 'Jl. Melati No. 45', status: 'Aktif', email: 'andi@example.com', phone: '081234567890', saldo: 1000000, poin: 50, rating: 4.8, badge: 'Gold', noKtp: '1234567890', jmlPenjualan: 150 },
        { id: 2, name: 'Dina Sari', address: 'Jl. Kenanga No. 12', status: 'Aktif', email: 'dina@example.com', phone: '081234567891', saldo: 500000, poin: 30, rating: 4.5, badge: 'Silver', noKtp: '0987654321', jmlPenjualan: 80 },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPenitips = penitips.filter((penitip) =>
    penitip.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPenitip({
      ...newPenitip,
      [name]: value,
    });
  };

  const handleAddPenitip = () => {
    const newId = penitips.length + 1;
    const penitipToAdd = {
      id: newId,
      name: newPenitip.name,
      email: newPenitip.email,
      phone: newPenitip.phone,
      address: newPenitip.address,
      status: newPenitip.status,
      saldo: newPenitip.saldo,
      poin: newPenitip.poin,
      rating: newPenitip.rating,
      badge: newPenitip.badge,
      noKtp: newPenitip.noKtp,
      password: newPenitip.password,
      jmlPenjualan: newPenitip.jmlPenjualan,
    };
    setPenitips([...penitips, penitipToAdd]);
    setIsModalOpen(false);
    setNewPenitip({
      name: '',
      email: '',
      phone: '',
      status: '',
      address: '',
      saldo: '',
      poin: '',
      rating: '',
      badge: '',
      noKtp: '',
      password: '',
      jmlPenjualan: '',
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-10">Manage Penitip</h1>

      {/* Search dan Tambah */}
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Cari penitip..."
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 border border-gray-300 rounded-md w-1/3"
        />
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-teal-600 text-white px-4 py-3 text-lg rounded-md hover:bg-teal-700"
        >
          + Tambah Penitip
        </button>
      </div>

      {/* Tabel Penitip */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto  sm:rounded-lg bg-white shadow mt-10">
          <table className="w-full divide-y divide-gray-200 rounded-2xl shadow">
            <thead>
              <tr>
                {['ID', 'Nama', 'No. Telepon', 'Alamat', 'Email', 'Poin', 'Rating', 'Badge', 'No. KTP', 'Jumlah Penjualan', 'Status', 'Aksi'].map((head) => (
                  <th key={head} className="px-6 py-3 bg-teal-600 text-md leading-4 font-medium text-white uppercase tracking-wider">
                    <div className="flex cursor-pointer">
                      <span className="mr-2">{head}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPenitips.map((penitip) => (
                <tr key={penitip.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">{penitip.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">{penitip.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">{penitip.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">{penitip.address}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">{penitip.email}</td>
                 
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">{penitip.poin}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">{penitip.rating}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">{penitip.badge}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">{penitip.noKtp}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">{penitip.jmlPenjualan}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">{penitip.status}</td>
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

      {/* Modal Tambah Penitip */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Tambah Penitip</h2>
            <form>
              {/* Ini tetap sesuai form lamamu */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Nama</label>
                <input
                  type="text"
                  name="name"
                  value={newPenitip.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={newPenitip.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">No. Telepon</label>
                <input
                  type="text"
                  name="phone"
                  value={newPenitip.phone}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Alamat</label>
                <input
                  type="text"
                  name="address"
                  value={newPenitip.address}
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
                  onClick={handleAddPenitip}
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

export default ManagePenitip;
