import React, { useState, useEffect } from 'react';

const DaftarRequestDonasi = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('Semua');

  useEffect(() => {
    // Simulasi data awal
    setTimeout(() => {
      setRequests([
        {
          id: 1,
          deskripsi_permintaan: 'Donasi untuk pembangunan sekolah',
          tanggal_permintaan: '2025-04-24',
          status: 'Menunggu',
        },
        {
          id: 2,
          deskripsi_permintaan: 'Bantuan korban banjir',
          tanggal_permintaan: '2025-04-20',
          status: 'Disetujui',
        },
        {
          id: 3,
          deskripsi_permintaan: 'Kegiatan sosial Ramadhan',
          tanggal_permintaan: '2025-04-22',
          status: 'Menunggu',
        },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const handleApproval = (id, newStatus) => {
    setRequests(
      requests.map((request) =>
        request.id === id ? { ...request, status: newStatus } : request
      )
    );
  };

  const filteredRequests =
    filterStatus === 'Semua'
      ? requests
      : requests.filter((r) => r.status === filterStatus);

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-8">Daftar Request Donasi</h1>

      {/* Filter Status */}
      <div className="flex mb-6">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="Semua">Semua</option>
          <option value="Menunggu">Menunggu</option>
          <option value="Disetujui">Disetujui</option>
          <option value="Ditolak">Ditolak</option>
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                {['ID', 'Deskripsi', 'Tanggal Permintaan', 'Status', 'Aksi'].map((header) => (
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
              {filteredRequests.map((req) => (
                <tr key={req.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{req.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{req.deskripsi_permintaan}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{req.tanggal_permintaan}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        req.status === 'Menunggu'
                          ? 'bg-yellow-100 text-yellow-700'
                          : req.status === 'Disetujui'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {req.status === 'Menunggu' ? (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleApproval(req.id, 'Disetujui')}
                          className="bg-green-500 text-white px-3 py-2 rounded-md hover:bg-green-600"
                        >
                          Setujui
                        </button>
                        <button
                          onClick={() => handleApproval(req.id, 'Ditolak')}
                          className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                        >
                          Tolak
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-400">Tidak ada aksi</span>
                    )}
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

export default DaftarRequestDonasi;
