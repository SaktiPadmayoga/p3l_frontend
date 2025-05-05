import React, { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";

const AddressManagement = () => {
  const [addresses, setAddresses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    JALAN: "",
    KECAMATAN: "",
    KELURAHAN: "",
    KOTA: "",
    KODE_POS: "",
    ALAMAT_UTAMA: false,
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchAddresses();
  }, [searchQuery]); // Tambahkan searchQuery sebagai dependensi

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      setLoadError(null);
      const response = await axiosInstance.get("/pembeli/alamat", {
        params: { search: searchQuery }, // Kirim query pencarian ke backend
      });
      setAddresses(response.data);
    } catch (error) {
      console.error("Error fetching addresses:", error);
      setLoadError("Gagal memuat data alamat. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update state pencarian
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Mencegah reload halaman
    fetchAddresses(); // Panggil fungsi fetchAddresses untuk mendapatkan alamat
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axiosInstance.put(`/pembeli/alamat/${editingId}`, formData);
      } else {
        await axiosInstance.post("/pembeli/alamat", formData);
      }
      resetForm();
      fetchAddresses();
    } catch (error) {
      console.error("Gagal menyimpan alamat:", error);
    }
  };

  const handleEdit = (alamat) => {
    setFormData({
      JALAN: alamat.JALAN,
      KECAMATAN: alamat.KECAMATAN,
      KELURAHAN: alamat.KELURAHAN,
      KOTA: alamat.KOTA,
      KODE_POS: alamat.KODE_POS,
      ALAMAT_UTAMA: alamat.ALAMAT_UTAMA === 1, // pastikan checkbox aktif jika 1
    });
    setEditingId(alamat.ID_ALAMAT);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/pembeli/alamat/${id}`);
      fetchAddresses();
    } catch (error) {
      console.error("Gagal menghapus alamat:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      JALAN: "",
      KECAMATAN: "",
      KELURAHAN: "",
      KOTA: "",
      KODE_POS: "",
      ALAMAT_UTAMA: false,
    });
    setEditingId(null);
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Manajemen Alamat</h2>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Tambah Alamat
        </button>
      </div>

      <form onSubmit={handleSearchSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Cari alamat..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </form>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black/50 pointer-events-none"></div>
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">{editingId ? "Edit Alamat" : "Tambah Alamat"}</h3>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="JALAN" className="block mb-1 font-semibold text-gray-700">
                    Jalan
                  </label>
                  <input
                    id="JALAN"
                    type="text"
                    name="JALAN"
                    placeholder="Jalan"
                    className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.JALAN}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="KECAMATAN" className="block mb-1 font-semibold text-gray-700">
                    Kecamatan
                  </label>
                  <input
                    id="KECAMATAN"
                    type="text"
                    name="KECAMATAN"
                    placeholder="Kecamatan"
                    className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.KECAMATAN}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="KELURAHAN" className="block mb-1 font-semibold text-gray-700">
                    Kelurahan
                  </label>
                  <input
                    id="KELURAHAN"
                    type="text"
                    name="KELURAHAN"
                    placeholder="Kelurahan"
                    className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.KELURAHAN}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="KOTA" className="block mb-1 font-semibold text-gray-700">
                    Kota
                  </label>
                  <input
                    id="KOTA"
                    type="text"
                    name="KOTA"
                    placeholder="Kota"
                    className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.KOTA}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="KODE_POS" className="block mb-1 font-semibold text-gray-700">
                    Kode Pos
                  </label>
                  <input
                    id="KODE_POS"
                    type="text"
                    name="KODE_POS"
                    placeholder="Kode Pos"
                    className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.KODE_POS}
                    onChange={handleChange}
                    required
                  />
                </div>
                <label className="flex items-center gap-2 mt-2 md:col-span-2">
                  <input
                    type="checkbox"
                    name="ALAMAT_UTAMA"
                    checked={formData.ALAMAT_UTAMA}
                    onChange={handleChange}
                    className="w-5 h-5 text-blue-600"
                  />
                  <span className="text-gray-700">Jadikan sebagai Alamat Utama</span>
                </label>
              </div>
              <div className="flex justify-end mt-4 gap-2">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded -lg hover:bg-blue-700 transition"
                >
                  {editingId ? "Update Alamat" : "Tambah Alamat"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <h3 className="text-xl font-semibold mb-4 text-gray-700 mt-8">Daftar Alamat</h3>
      {loading ? (
        <p className="text-gray-500">Memuat data alamat...</p>
      ) : loadError ? (
        <p className="text-red-500">{loadError}</p>
      ) : (
        <div className="space-y-4">
          {addresses.map((alamat) => (
            <div
              key={alamat.ID_ALAMAT}
              className="bg-white shadow-sm rounded-lg p-4 flex justify-between items-start"
            >
              <div>
                <p className="font-medium text-gray-800">
                  {alamat.JALAN}, {alamat.KECAMATAN}, {alamat.KELURAHAN}, {alamat.KOTA}, {alamat.KODE_POS}
                </p>
                {alamat.ALAMAT_UTAMA === 1 && (
                  <span className="inline-block bg-green-100 text-green-800 text-sm px-2 py-1 rounded mt-1">
                    Alamat Utama
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(alamat)}
                  className="text-sm bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(alamat.ID_ALAMAT)}
                  className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddressManagement;