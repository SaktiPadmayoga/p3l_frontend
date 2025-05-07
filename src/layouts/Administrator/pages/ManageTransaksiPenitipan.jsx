import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageTransaksiPenitipan = () => {
  const [transaksiPenitipans, setTransaksiPenitipans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTransaksiPenitipan, setNewTransaksiPenitipan] = useState({
    ID_PENITIP: "",
    ID_PEGAWAI_HUNTER: "",
    NO_NOTA_PENITIPAN: "",
    TANGGAL_PENITIPAN: "",
    TOTAL_NILAI_BARANG: "",
    CATATAN: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTransaksiPenitipans();
  }, []);

  const fetchTransaksiPenitipans = () => {
    setLoading(true);
    const token = localStorage.getItem("token"); // Changed from pegawai_token to token

    axios
      .get("http://localhost:8000/api/gudang/manage-transaksi-penitipan", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
      .then((response) => {
        if (Array.isArray(response.data)) {
          setTransaksiPenitipans(response.data);
          setError("");
        } else {
          setError("Format data tidak valid.");
          console.error("Unexpected response format:", response.data);
        }
      })
      .catch((error) => {
        let errorMessage = "Gagal mengambil data transaksi.";
        if (error.response) {
          errorMessage += ` Status: ${error.response.status}, Detail: ${
            error.response.data.message || error.response.data
          }`;
        } else if (error.request) {
          errorMessage +=
            " Tidak ada respons dari server. Periksa koneksi atau CORS.";
        } else {
          errorMessage += ` Error: ${error.message}`;
        }
        setError(errorMessage);
        console.error("Gagal fetch data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredTransaksiPenitipans = transaksiPenitipans.filter((t) =>
    t.NO_NOTA_PENITIPAN?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaksiPenitipan({ ...newTransaksiPenitipan, [name]: value });
  };

  const handleAddTransaksiPenitipan = () => {
    const token = localStorage.getItem("token"); // Changed from pegawai_token to token

    axios
      .post(
        "http://localhost:8000/api/gudang/manage-transaksi-penitipan",
        newTransaksiPenitipan,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        fetchTransaksiPenitipans();
        setIsModalOpen(false);
        setNewTransaksiPenitipan({
          ID_PENITIP: "",
          ID_PEGAWAI_HUNTER: "",
          NO_NOTA_PENITIPAN: "",
          TANGGAL_PENITIPAN: "",
          TOTAL_NILAI_BARANG: "",
          CATATAN: "",
        });
      })
      .catch((error) => {
        let errorMessage = "Gagal menambah transaksi.";
        if (error.response) {
          errorMessage += ` Status: ${error.response.status}, Detail: ${
            error.response.data.message || error.response.data
          }`;
        }
        setError(errorMessage);
        console.error("Gagal tambah transaksi:", error);
      });
  };

  const handleDelete = (id) => {
    if (confirm("Yakin ingin menghapus transaksi ini?")) {
      const token = localStorage.getItem("token"); // Changed from pegawai_token to token

      axios
        .delete(
          `http://localhost:8000/api/gudang/manage-transaksi-penitipan/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        )
        .then(() => {
          setTransaksiPenitipans(
            transaksiPenitipans.filter((tr) => tr.ID_PENITIPAN !== id)
          );
          setError("");
        })
        .catch((error) => {
          let errorMessage = "Gagal menghapus transaksi.";
          if (error.response) {
            errorMessage += ` Status: ${error.response.status}, Detail: ${
              error.response.data.message || error.response.data
            }`;
          }
          setError(errorMessage);
          console.error("Gagal hapus transaksi:", error);
        });
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-10">Manage Transaksi Penitipan</h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-6">{error}</div>
      )}

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

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow mt-10">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                {[
                  "ID",
                  "ID Penitip",
                  "ID Pegawai Hunter",
                  "ID Pegawai QC",
                  "No Nota",
                  "Tanggal",
                  "Total Nilai",
                  "Catatan",
                  "Aksi",
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
              {filteredTransaksiPenitipans.map((t) => (
                <tr key={t.ID_PENITIPAN}>
                  <td className="px-6 py-4">{t.ID_PENITIPAN}</td>
                  <td className="px-6 py-4">{t.ID_PENITIP}</td>
                  <td className="px-6 py-4">{t.ID_PEGAWAI_HUNTER}</td>
                  <td className="px-6 py-4">{t.ID_PEGAWAI_QC}</td>
                  <td className="px-6 py-4">{t.NO_NOTA_PENITIPAN}</td>
                  <td className="px-6 py-4">{t.TANGGAL_PENITIPAN}</td>
                  <td className="px-6 py-4">
                    Rp{parseInt(t.TOTAL_NILAI_BARANG).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">{t.CATATAN}</td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-4">
                      <button className="text-blue-500 hover:text-blue-600">
                        Edit
                      </button>
                      <button
                        className="text-red-500 hover:text-red-600"
                        onClick={() => handleDelete(t.ID_PENITIPAN)}
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

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-2/3">
            <h2 className="text-xl font-bold mb-4">
              Tambah Transaksi Penitipan
            </h2>
            <form>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "ID Penitip", name: "ID_PENITIP" },
                  { label: "ID Pegawai Hunter", name: "ID_PEGAWAI_HUNTER" },
                  { label: "No Nota Penitipan", name: "NO_NOTA_PENITIPAN" },
                  {
                    label: "Tanggal Penitipan",
                    name: "TANGGAL_PENITIPAN",
                    type: "date",
                  },
                  {
                    label: "Total Nilai Barang",
                    name: "TOTAL_NILAI_BARANG",
                    type: "number",
                  },
                ].map(({ label, name, type = "text" }) => (
                  <div key={name}>
                    <label className="block text-sm font-medium mb-1">
                      {label}
                    </label>
                    <input
                      type={type}
                      name={name}
                      value={newTransaksiPenitipan[name]}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                ))}
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">
                    Catatan
                  </label>
                  <textarea
                    name="CATATAN"
                    value={newTransaksiPenitipan.CATATAN}
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
                  onClick={handleAddTransaksiPenitipan}
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
