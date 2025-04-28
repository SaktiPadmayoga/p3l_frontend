import React, { useState, useEffect } from 'react';

const ManageMerchandise = () => {
  const [merchandises, setMerchandises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMerchandise, setNewMerchandise] = useState({
    nama: '',
    deskripsi: '',
    poin_dibutuhkan: '',
    stok: '',
    gambar: '',
  });

  useEffect(() => {
    // Simulasi fetch data merchandise
    setTimeout(() => {
      setMerchandises([
        {
          id: 1,
          nama: 'Kaos Eksklusif',
          deskripsi: 'Kaos edisi spesial organisasi',
          poin_dibutuhkan: 500,
          stok: 10,
          gambar: 'https://via.placeholder.com/100',
        },
        {
          id: 2,
          nama: 'Tumbler',
          deskripsi: 'Tumbler ramah lingkungan',
          poin_dibutuhkan: 300,
          stok: 25,
          gambar: 'https://via.placeholder.com/100',
        },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredMerchandises = merchandises.filter((item) =>
    item.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMerchandise({
      ...newMerchandise,
      [name]: value,
    });
  };

  const handleAddMerchandise = () => {
    const newId = merchandises.length > 0 ? merchandises[merchandises.length - 1].id + 1 : 1;
    const merchandiseToAdd = {
      id: newId,
      ...newMerchandise,
      poin_dibutuhkan: parseInt(newMerchandise.poin_dibutuhkan),
      stok: parseInt(newMerchandise.stok),
    };
    setMerchandises([...merchandises, merchandiseToAdd]);
    setIsModalOpen(false);
    setNewMerchandise({
      nama: '',
      deskripsi: '',
      poin_dibutuhkan: '',
      stok: '',
      gambar: '',
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-10">Manage Merchandise</h1>

      {/* Search dan Tambah */}
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Cari merchandise..."
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 border border-gray-300 rounded-md w-1/3"
        />
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-teal-600 text-white px-4 py-3 text-lg rounded-md hover:bg-teal-700"
        >
          + Tambah Merchandise
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className='overflow-x-auto bg-white rounded-lg shadow mt-10'>
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                {['ID', 'Nama', 'Deskripsi', 'Poin Dibutuhkan', 'Stok', 'Gambar', 'Aksi'].map((header) => (
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
              {filteredMerchandises.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{item.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.nama}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.deskripsi}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.poin_dibutuhkan}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.stok}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img src={item.gambar} alt="Gambar Merchandise" className="h-16 w-16 rounded object-cover" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-4">
                      <button
                        className="text-blue-500 hover:text-blue-600"
                        onClick={() => {
                          // Untuk edit merchandise
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-500 hover:text-red-600"
                        onClick={() => {
                          if (confirm('Yakin ingin menghapus merchandise ini?')) {
                            setMerchandises(merchandises.filter((m) => m.id !== item.id));
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

      {/* Modal Tambah */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-2/3">
            <h2 className="text-xl font-bold mb-4">Tambah Merchandise</h2>
            <form>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nama</label>
                  <input
                    type="text"
                    name="nama"
                    value={newMerchandise.nama}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Deskripsi</label>
                  <textarea
                    name="deskripsi"
                    value={newMerchandise.deskripsi}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Poin Dibutuhkan</label>
                  <input
                    type="number"
                    name="poin_dibutuhkan"
                    value={newMerchandise.poin_dibutuhkan}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Stok</label>
                  <input
                    type="number"
                    name="stok"
                    value={newMerchandise.stok}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Gambar (URL)</label>
                  <input
                    type="text"
                    name="gambar"
                    value={newMerchandise.gambar}
                    onChange={handleInputChange}
                    placeholder="https://example.com/gambar.jpg"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 text-black px-4 py-2 rounded-md mr-2 hover:bg-gray-400"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleAddMerchandise}
                  className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600"
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

export default ManageMerchandise;
