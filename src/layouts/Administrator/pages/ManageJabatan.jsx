import React, { useState, useEffect } from 'react';

const ManageJabatan = () => {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPosition, setNewPosition] = useState({
    nama_jabatan: '',
  });

  useEffect(() => {
    // Simulasi fetch data jabatan
    setTimeout(() => {
      setPositions([
        { id: 1, nama_jabatan: 'Manager' },
        { id: 2, nama_jabatan: 'Admin' },
        { id: 3, nama_jabatan: 'Customer Service' },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPositions = positions.filter((position) =>
    position.nama_jabatan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPosition({
      ...newPosition,
      [name]: value,
    });
  };

  const handleAddPosition = () => {
    const newId = positions.length > 0 ? positions[positions.length - 1].id + 1 : 1;
    const positionToAdd = {
      id: newId,
      nama_jabatan: newPosition.nama_jabatan,
    };
    setPositions([...positions, positionToAdd]);
    setIsModalOpen(false);
    setNewPosition({ nama_jabatan: '' });
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-10">Manage Jabatan</h1>

      {/* Search Bar dan Tombol Tambah Jabatan */}
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Cari jabatan..."
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 border border-gray-300 rounded-md w-1/3"
        />
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-teal-600 text-white px-4 py-3 text-lg rounded-md hover:bg-teal-700"
        >
          + Tambah Jabatan
        </button>
      </div>

      {/* Tabel Jabatan */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className='overflow-hidden sm:rounded-lg bg-white shadow mt-10'>
          <table className="min-w-full divide-y divide-gray-200 rounded-2xl shadow">
            <thead>
              <tr>
                <th className="px-6 py-5 bg-teal-600 text-lg leading-4 font-medium text-white uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-5 bg-teal-600 text-lg leading-4 font-medium text-white uppercase tracking-wider">
                  Nama Jabatan
                </th>
                <th className="px-6 py-5 bg-teal-600 text-lg leading-4 font-medium text-white uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPositions.map((position) => (
                <tr key={position.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{position.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{position.nama_jabatan}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-4">
                      <button
                        className="text-blue-500 hover:text-blue-600"
                        onClick={() => {
                          // Untuk edit jabatan
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-500 hover:text-red-600"
                        onClick={() => {
                          if (confirm('Yakin ingin menghapus jabatan ini?')) {
                            setPositions(positions.filter((p) => p.id !== position.id));
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

      {/* Modal Tambah Jabatan */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Tambah Jabatan</h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Nama Jabatan</label>
                <input
                  type="text"
                  name="nama_jabatan"
                  value={newPosition.nama_jabatan}
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
                  onClick={handleAddPosition}
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

export default ManageJabatan;
