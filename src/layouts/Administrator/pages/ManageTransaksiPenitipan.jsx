import React, { useState, useEffect } from 'react';

const ManageTransaksiPenitipan = () => {
  const [transaksis, setTransaksis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTransaksi, setNewTransaksi] = useState({
    ID_PENITIP: '',
    ID_PEGAWAI_HUNTER: '',
    ID_PEGAWAI_QC: '',
    NO_NOTA_PENITIPAN: '',
    TANGGAL_PENITIPAN: '',
    TOTAL_NILAI_BARANG: '',
    CATATAN: '',
  });

  useEffect(() => {
    // Simulasi data awal
    setTimeout(() => {
      setTransaksis([
        {
          id: 1,
          ID_PENITIP: 'P001',
          ID_PEGAWAI_HUNTER: 'H101',
          ID_PEGAWAI_QC: 'Q101',
          NO_NOTA_PENITIPAN: 'NP-20250425-01',
          TANGGAL_PENITIPAN: '2025-04-25',
          TOTAL_NILAI_BARANG: 1500000,
          CATATAN: 'Barang elektronik',
        },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredTransaksis = transaksis.filter((t) =>
    t.NO_NOTA_PENITIPAN.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaksi({ ...newTransaksi, [name]: value });
  };

  const handleAddTransaksi = () => {
    const newId = transaksis.length > 0 ? transaksis[transaksis.length - 1].id + 1 : 1;
    const transaksiToAdd = {
      id: newId,
      ...newTransaksi,
    };
    setTransaksis([...transaksis, transaksiToAdd]);
    setIsModalOpen(false);
    setNewTransaksi({
      ID_PENITIP: '',
      ID_PEGAWAI_HUNTER: '',
      ID_PEGAWAI_QC: '',
      NO_NOTA_PENITIPAN: '',
      TANGGAL_PENITIPAN: '',
      TOTAL_NILAI_BARANG: '',
      CATATAN: '',
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-10">Manage Transaksi Penitipan</h1>

      {/* Search & Button */}
      <div className="flex justify-between mb-6">
        <input
          type="text"
          placeholder="Cari No Nota..."
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 border border-gray-300 rounded-md w-1/3"
        />
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-stone-600 text-white px-4 py-3 text-lg rounded-md hover:bg-stone-700"
        >
          + Tambah Transaksi
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow mt-10">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                {[
                  'ID',
                  'ID Penitip',
                  'ID Pegawai Hunter',
                  'ID Pegawai QC',
                  'No Nota',
                  'Tanggal',
                  'Total Nilai',
                  'Catatan',
                  'Aksi',
                ].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-4 bg-stone-600 text-lg font-medium text-white uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransaksis.map((t) => (
                <tr key={t.id}>
                  <td className="px-6 py-4">{t.id}</td>
                  <td className="px-6 py-4">{t.ID_PENITIP}</td>
                  <td className="px-6 py-4">{t.ID_PEGAWAI_HUNTER}</td>
                  <td className="px-6 py-4">{t.ID_PEGAWAI_QC}</td>
                  <td className="px-6 py-4">{t.NO_NOTA_PENITIPAN}</td>
                  <td className="px-6 py-4">{t.TANGGAL_PENITIPAN}</td>
                  <td className="px-6 py-4">Rp{parseInt(t.TOTAL_NILAI_BARANG).toLocaleString()}</td>
                  <td className="px-6 py-4">{t.CATATAN}</td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-4">
                      <button
                        className="text-blue-500 hover:text-blue-600"
                        onClick={() => {}}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-500 hover:text-red-600"
                        onClick={() => {
                          if (confirm('Yakin ingin menghapus transaksi ini?')) {
                            setTransaksis(transaksis.filter((tr) => tr.id !== t.id));
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
            <h2 className="text-xl font-bold mb-4">Tambah Transaksi Penitipan</h2>
            <form>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'ID Penitip', name: 'ID_PENITIP' },
                  { label: 'ID Pegawai Hunter', name: 'ID_PEGAWAI_HUNTER' },
                  { label: 'ID Pegawai QC', name: 'ID_PEGAWAI_QC' },
                  { label: 'No Nota Penitipan', name: 'NO_NOTA_PENITIPAN' },
                  { label: 'Tanggal Penitipan', name: 'TANGGAL_PENITIPAN', type: 'date' },
                  { label: 'Total Nilai Barang', name: 'TOTAL_NILAI_BARANG', type: 'number' },
                ].map(({ label, name, type = 'text' }) => (
                  <div key={name}>
                    <label className="block text-sm font-medium mb-1">{label}</label>
                    <input
                      type={type}
                      name={name}
                      value={newTransaksi[name]}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                ))}
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Catatan</label>
                  <textarea
                    name="CATATAN"
                    value={newTransaksi.CATATAN}
                    onChange={handleInputChange}
                    rows="3"
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
                  onClick={handleAddTransaksi}
                  className="bg-stone-500 text-white px-4 py-2 rounded-md hover:bg-stone-600"
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

export default ManageTransaksiPenitipan;
