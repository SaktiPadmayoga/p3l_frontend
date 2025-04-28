import React, { useState, useEffect } from 'react';

const HistoryDonasi = () => {
  const [histories, setHistories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulasi data history donasi
    setTimeout(() => {
      setHistories([
        {
          id: 1,
          organisasi: 'Yayasan Peduli Anak',
          barang: ['Pakaian Anak', 'Buku Cerita', 'Mainan Edukasi'],
          tanggal_donasi: '2025-04-10',
          status: 'Diterima',
        },
        {
          id: 2,
          organisasi: 'Rumah Singgah Harapan',
          barang: ['Sembako', 'Alat Tulis'],
          tanggal_donasi: '2025-04-15',
          status: 'Diterima',
        },
        {
          id: 3,
          organisasi: 'Komunitas Hijau',
          barang: ['Bibit Pohon'],
          tanggal_donasi: '2025-04-18',
          status: 'Diproses',
        },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-8">History Donasi ke Organisasi</h1>

      {loading ? (
        <p>Loading...</p>
      ) : histories.length === 0 ? (
        <p>Belum ada data donasi.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                {['ID', 'Organisasi', 'Barang yang Didonasikan', 'Tanggal Donasi', 'Status'].map((header) => (
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
              {histories.map((donasi) => (
                <tr key={donasi.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{donasi.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{donasi.organisasi}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <ul className="list-disc list-inside">
                      {donasi.barang.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{donasi.tanggal_donasi}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        donasi.status === 'Diterima'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {donasi.status}
                    </span>
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

export default HistoryDonasi;
