import React, { useState, useEffect } from 'react';

const ManageBarangTitipan = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    ID_SUBKATEGORI: '',
    ID_PENITIPAN: '',
    ID_PEGAWAI: '',
    ID_PENJUALAN: '',
    NAMA: '',
    HARGA_JUAL: '',
    BERAT: '',
    TANGGAL_KADALUARSA: '',
    TANGGAL_PERPANJANGAN: '',
    STATUS: 'Menunggu',
    TERJUAL_CEPAT: 'Tidak',
    KONDISI: '',
    TANGGAL_GARANSI: '',
    rating: '',
    DESKRIPSI: '',
  });

  useEffect(() => {
    // Simulasi fetch data
    setTimeout(() => {
      setItems([
        {
          id: 1,
          ID_SUBKATEGORI: 'SK1',
          ID_PENITIPAN: 'PT001',
          ID_PEGAWAI: 'PG001',
          ID_PENJUALAN: 'J001',
          NAMA: 'Kopi Arabika',
          HARGA_JUAL: 50000,
          BERAT: '200g',
          TANGGAL_KADALUARSA: '2025-06-01',
          TANGGAL_PERPANJANGAN: '2025-12-01',
          STATUS: 'Tersedia',
          TERJUAL_CEPAT: 'Ya',
          KONDISI: 'Baru',
          TANGGAL_GARANSI: '2026-01-01',
          rating: 4.5,
          DESKRIPSI: 'Kopi berkualitas tinggi.',
        },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddItem = () => {
    const newId = items.length > 0 ? items[items.length - 1].id + 1 : 1;
    const itemToAdd = { id: newId, ...newItem };
    setItems([...items, itemToAdd]);
    setIsModalOpen(false);
    setNewItem({
      ID_SUBKATEGORI: '',
      ID_PENITIPAN: '',
      ID_PEGAWAI: '',
      ID_PENJUALAN: '',
      NAMA: '',
      HARGA_JUAL: '',
      BERAT: '',
      TANGGAL_KADALUARSA: '',
      TANGGAL_PERPANJANGAN: '',
      STATUS: 'Menunggu',
      TERJUAL_CEPAT: 'Tidak',
      KONDISI: '',
      TANGGAL_GARANSI: '',
      rating: '',
      DESKRIPSI: '',
    });
  };

  const filteredItems = items.filter((item) =>
    item.NAMA.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-10">Manage Barang Titipan</h1>

      {/* Search + Add */}
      <div className="flex justify-between mb-6">
        <input
          type="text"
          placeholder="Cari barang..."
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 border border-gray-300 rounded-md w-1/3"
        />
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-stone-600 text-white px-4 py-3 text-lg rounded-md hover:bg-stone-700"
        >
          + Tambah Barang
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead>
              <tr>
                {['ID', 'Nama', 'Harga', 'Berat', 'Status', 'Kondisi', 'Rating', 'Aksi'].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-2 bg-stone-600 text-white font-medium uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredItems.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-2">{item.id}</td>
                  <td className="px-4 py-2">{item.NAMA}</td>
                  <td className="px-4 py-2">Rp {item.HARGA_JUAL}</td>
                  <td className="px-4 py-2">{item.BERAT}</td>
                  <td className="px-4 py-2">{item.STATUS}</td>
                  <td className="px-4 py-2">{item.KONDISI}</td>
                  <td className="px-4 py-2">{item.rating}</td>
                  <td className="px-4 py-2">
                    <button
                      className="text-red-500 hover:text-red-600"
                      onClick={() => {
                        if (confirm('Yakin ingin menghapus barang ini?')) {
                          setItems(items.filter((i) => i.id !== item.id));
                        }
                      }}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-3/4 h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Tambah Barang Titipan</h2>
            <form className="grid grid-cols-2 gap-4">
              {Object.keys(newItem).map((key) => (
                <div key={key} className={key === 'DESKRIPSI' ? 'col-span-2' : ''}>
                  <label className="block text-sm font-medium mb-1 capitalize">{key.replace(/_/g, ' ')}</label>
                  {key === 'DESKRIPSI' ? (
                    <textarea
                      name={key}
                      value={newItem[key]}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  ) : key === 'STATUS' || key === 'TERJUAL_CEPAT' ? (
                    <select
                      name={key}
                      value={newItem[key]}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      {key === 'STATUS' ? (
                        ['Menunggu', 'Tersedia', 'Terjual'].map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))
                      ) : (
                        ['Ya', 'Tidak'].map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))
                      )}
                    </select>
                  ) : (
                    <input
                      type={key.includes('TANGGAL') ? 'date' : 'text'}
                      name={key}
                      value={newItem[key]}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  )}
                </div>
              ))}
            </form>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 px-4 py-2 rounded-md mr-2 hover:bg-gray-400"
              >
                Batal
              </button>
              <button
                onClick={handleAddItem}
                className="bg-stone-600 text-white px-4 py-2 rounded-md hover:bg-stone-700"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBarangTitipan;
