import React, { useState, useEffect } from 'react';

const ManageOrganisasi = () => {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newOrganization, setNewOrganization] = useState({
    nama: '',
    alamat: '',
    telepon: '',
    deskripsi: '',
    email: '',
    status: 'Aktif',
    foto: '',
  });

  useEffect(() => {
    // Simulasi fetch data organisasi
    setTimeout(() => {
      setOrganizations([
        {
          id: 1,
          nama: 'Organisasi A',
          alamat: 'Jl. Mawar No. 1',
          telepon: '08123456789',
          deskripsi: 'Organisasi A adalah ...',
          email: 'orga@example.com',
          status: 'Aktif',
          foto: 'https://via.placeholder.com/100',
        },
        {
          id: 2,
          nama: 'Organisasi B',
          alamat: 'Jl. Melati No. 2',
          telepon: '08234567890',
          deskripsi: 'Organisasi B bergerak di bidang ...',
          email: 'orgb@example.com',
          status: 'Tidak Aktif',
          foto: 'https://via.placeholder.com/100',
        },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredOrganizations = organizations.filter((org) =>
    org.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrganization({
      ...newOrganization,
      [name]: value,
    });
  };

  

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-10">Manage Organisasi</h1>

      {/* Search dan Tambah */}
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Cari organisasi..."
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 border border-gray-300 rounded-md w-1/3"
        />
      </div>

      {/* Table */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className='overflow-x-auto bg-white rounded-lg shadow mt-10'>
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                {['ID', 'Nama', 'Alamat', 'Telepon', 'Deskripsi', 'Email', 'Status', 'Foto', 'Aksi'].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-4 bg-teal-600 text-lg font-medium text-white uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrganizations.map((org) => (
                <tr key={org.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{org.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{org.nama}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{org.alamat}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{org.telepon}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{org.deskripsi}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{org.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{org.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img src={org.foto} alt="Foto Organisasi" className="h-16 w-16 rounded-full object-cover" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-4">
                      <button
                        className="text-blue-500 hover:text-blue-600"
                        onClick={() => {
                          // Untuk edit organisasi
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-500 hover:text-red-600"
                        onClick={() => {
                          if (confirm('Yakin ingin menghapus organisasi ini?')) {
                            setOrganizations(organizations.filter((o) => o.id !== org.id));
                          }
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageOrganisasi;
