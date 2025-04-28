import React, { useState, useEffect } from 'react';

const ManageRequestDonasi = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRequest, setNewRequest] = useState({
    deskripsi_permintaan: '',
    tanggal_permintaan: '',
    status: 'Menunggu',
  });

  useEffect(() => {
    // Simulasi fetch data awal
    setTimeout(() => {
      setRequests([
        {
          id: 1,
          deskripsi_permintaan: 'Permintaan dana untuk kegiatan sosial',
          tanggal_permintaan: '2025-04-25',
          status: 'Menunggu',
        },
        {
          id: 2,
          deskripsi_permintaan: 'Donasi bencana alam',
          tanggal_permintaan: '2025-04-20',
          status: 'Disetujui',
        },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredRequests = requests.filter((r) =>
    r.deskripsi_permintaan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRequest({
      ...newRequest,
      [name]: value,
    });
  };

  const handleAddRequest = () => {
    const newId = requests.length > 0 ? requests[requests.length - 1].id + 1 : 1;
    const requestToAdd = {
      id: newId,
      ...newRequest,
    };
    setRequests([...requests, requestToAdd]);
    setIsModalOpen(false);
    setNewRequest({
      deskripsi_permintaan: '',
      tanggal_permintaan: '',
      status: 'Menunggu',
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-10">Manage Request Donasi</h1>

      {/* Search dan Tambah */}
      <div className="flex justify-between mb-6">
        <input
          type="text"
          placeholder="Cari permintaan..."
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 border border-gray-300 rounded-md w-1/3"
        />
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-teal-600 text-white px-4 py-3 text-lg rounded-md hover:bg-teal-700"
        >
          + Tambah Permintaan
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
                {['ID', 'Deskripsi Permintaan', 'Tanggal Permintaan', 'Status', 'Aksi'].map((header) => (
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
              {filteredRequests.map((req) => (
                <tr key={req.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{req.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{req.deskripsi_permintaan}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{req.tanggal_permintaan}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{req.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-4">
                      <button
                        className="text-blue-500 hover:text-blue-600"
                        onClick={() => {
                          // Edit request
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-500 hover:text-red-600"
                        onClick={() => {
                          if (confirm('Yakin ingin menghapus permintaan ini?')) {
                            setRequests(requests.filter((r) => r.id !== req.id));
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
            <h2 className="text-xl font-bold mb-4">Tambah Permintaan Donasi</h2>
            <form>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Deskripsi Permintaan</label>
                  <textarea
                    name="deskripsi_permintaan"
                    value={newRequest.deskripsi_permintaan}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Tanggal Permintaan</label>
                  <input
                    type="date"
                    name="tanggal_permintaan"
                    value={newRequest.tanggal_permintaan}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <select
                    name="status"
                    value={newRequest.status}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="Menunggu">Menunggu</option>
                    <option value="Disetujui">Disetujui</option>
                    <option value="Ditolak">Ditolak</option>
                  </select>
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
                  onClick={handleAddRequest}
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

export default ManageRequestDonasi;
