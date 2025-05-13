import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageBarangTitipan = () => {
  const [items, setItems] = useState([]);
  const [penitipans, setPenitipans] = useState([]);
  const [subkategoris, setSubkategoris] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalMode, setModalMode] = useState(null); // null, 'add', 'edit'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [penitipanSearch, setPenitipanSearch] = useState("");
  const [subkategoriSearch, setSubkategoriSearch] = useState("");
  const [barangTitipan, setBarangTitipan] = useState({
    KODE_PRODUK: "",
    ID_PENITIPAN: "",
    ID_SUBKATEGORI: "",
    NAMA_SUBKATEGORI: "",
    NAMA_BARANG: "",
    HARGA_JUAL: "",
    BERAT: "",
    KONDISI: "",
    TANGGAL_GARANSI: "",
    DESKRIPSI: "",
    FOTOS: [null, null, null],
    IS_UTAMA_INDEX: 0,
  });

  useEffect(() => {
    fetchItems();
    fetchPenitipans();
    fetchSubkategoris();
  }, []);

  const fetchItems = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:8000/api/gudang/barang-titipan",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data.success) {
        setItems(response.data.data);
        setError(null);
      } else {
        throw new Error(
          response.data.message || "Failed to fetch barang titipan"
        );
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Gagal mengambil barang titipan."
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchPenitipans = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:8000/api/gudang/manage-transaksi-penitipan",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (Array.isArray(response.data)) {
        setPenitipans(response.data);
      } else {
        setError("Invalid penitipan data format.");
      }
    } catch (err) {
      setError(`Failed to fetch penitipans: ${err.message}`);
    }
  };

  const fetchSubkategoris = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/subcategories",
        {
          headers: { Accept: "application/json" },
        }
      );
      const data = response.data.data || response.data;
      if (Array.isArray(data)) {
        setSubkategoris(data);
      } else {
        throw new Error(
          "Invalid subkategori data format: " + JSON.stringify(data)
        );
      }
    } catch (err) {
      console.error("Subkategori fetch error:", err);
      setError(`Failed to fetch subkategoris: ${err.message}`);
    }
  };

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const handlePenitipanSearch = (e) => {
    setPenitipanSearch(e.target.value);
    setBarangTitipan({ ...barangTitipan, ID_PENITIPAN: e.target.value });
  };

  const handleSubkategoriSearch = (e) => {
    setSubkategoriSearch(e.target.value);
    setBarangTitipan({
      ...barangTitipan,
      NAMA_SUBKATEGORI: e.target.value,
      ID_SUBKATEGORI: "",
    });
  };

  const filteredItems = items.filter(
    (item) =>
      item.kode_barang.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.nama_subkategori.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.deskripsi.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPenitipans = penitipans.filter((p) =>
    p.ID_PENITIPAN.toString().includes(penitipanSearch)
  );

  const filteredSubkategoris = subkategoris.filter((s) =>
    s.NAMASUB.toLowerCase().includes(subkategoriSearch.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name.startsWith("FOTO_")) {
      const index = parseInt(name.split("_")[1]);
      const newFotos = [...barangTitipan.FOTOS];
      newFotos[index] = files ? files[0] : null;
      setBarangTitipan({ ...barangTitipan, FOTOS: newFotos });
    } else if (name === "IS_UTAMA_INDEX") {
      setBarangTitipan({ ...barangTitipan, IS_UTAMA_INDEX: parseInt(value) });
    } else {
      setBarangTitipan({ ...barangTitipan, [name]: value });
    }
  };

  const selectPenitipan = (penitipan) => {
    setBarangTitipan({
      ...barangTitipan,
      ID_PENITIPAN: penitipan.ID_PENITIPAN,
    });
    setPenitipanSearch("");
  };

  const selectSubkategori = (subkategori) => {
    setBarangTitipan({
      ...barangTitipan,
      ID_SUBKATEGORI: subkategori.ID_SUBKATEGORI,
      NAMA_SUBKATEGORI: subkategori.NAMASUB,
    });
    setSubkategoriSearch("");
  };

  const openModal = (mode, data = null) => {
    setModalMode(mode);
    if (mode === "edit" && data) {
      const subkategori = subkategoris.find(
        (s) => s.NAMASUB === data.nama_subkategori
      );
      setBarangTitipan({
        KODE_PRODUK: data.kode_barang,
        ID_PENITIPAN: data.id_penitipan,
        ID_SUBKATEGORI: subkategori ? subkategori.ID_SUBKATEGORI : "",
        NAMA_SUBKATEGORI: data.nama_subkategori,
        NAMA_BARANG: data.nama || "",
        HARGA_JUAL: data.harga_jual.replace(/[^0-9]/g, ""),
        BERAT: data.berat,
        KONDISI: data.kondisi,
        TANGGAL_GARANSI: data.tanggal_garansi || "",
        DESKRIPSI: data.deskripsi,
        FOTOS: [null, null, null],
        IS_UTAMA_INDEX: 0,
      });
      setPenitipanSearch(data.id_penitipan.toString());
      setSubkategoriSearch(data.nama_subkategori);
    } else {
      setBarangTitipan({
        KODE_PRODUK: "",
        ID_PENITIPAN: "",
        ID_SUBKATEGORI: "",
        NAMA_SUBKATEGORI: "",
        NAMA_BARANG: "",
        HARGA_JUAL: "",
        BERAT: "",
        KONDISI: "",
        TANGGAL_GARANSI: "",
        DESKRIPSI: "",
        FOTOS: [null, null, null],
        IS_UTAMA_INDEX: 0,
      });
      setPenitipanSearch("");
      setSubkategoriSearch("");
    }
    setIsModalOpen(true);
  };

  const validateForm = () => {
    if (!barangTitipan.ID_PENITIPAN) return "ID Penitipan is required.";
    if (!barangTitipan.NAMA_SUBKATEGORI) return "Nama Subkategori is required.";
    if (!barangTitipan.NAMA_BARANG) return "Nama Barang is required.";
    if (!barangTitipan.HARGA_JUAL || isNaN(barangTitipan.HARGA_JUAL))
      return "Harga Jual must be a valid number.";
    if (!barangTitipan.BERAT || isNaN(barangTitipan.BERAT))
      return "Berat must be a valid number.";
    if (!barangTitipan.KONDISI) return "Kondisi is required.";
    if (!barangTitipan.DESKRIPSI) return "Deskripsi is required.";
    if (!barangTitipan.FOTOS.some((foto) => foto))
      return "At least one photo is required.";
    if (
      barangTitipan.TANGGAL_GARANSI &&
      !/^\d{4}-\d{2}-\d{2}$/.test(barangTitipan.TANGGAL_GARANSI)
    ) {
      return "Tanggal Garansi must be a valid date (YYYY-MM-DD).";
    }
    return null;
  };

  const handleSubmit = async () => {
    if (!confirm(`${modalMode === "add" ? "Add" : "Edit"} this item?`)) return;

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("ID_PENITIPAN", barangTitipan.ID_PENITIPAN);
      formData.append("ID_SUBKATEGORI", barangTitipan.ID_SUBKATEGORI);
      formData.append("NAMA", barangTitipan.NAMA_BARANG);
      formData.append("HARGA_JUAL", barangTitipan.HARGA_JUAL);
      formData.append("BERAT", barangTitipan.BERAT);
      formData.append("KONDISI", barangTitipan.KONDISI);
      // Explicitly set TANGGAL_GARANSI to null if empty
      formData.append(
        "TANGGAL_GARANSI",
        barangTitipan.TANGGAL_GARANSI ? barangTitipan.TANGGAL_GARANSI : ""
      );
      formData.append("DESKRIPSI", barangTitipan.DESKRIPSI);
      formData.append("NAMA_SUBKATEGORI", barangTitipan.NAMA_SUBKATEGORI);
      formData.append("IS_UTAMA_INDEX", barangTitipan.IS_UTAMA_INDEX);
      barangTitipan.FOTOS.forEach((foto, index) => {
        if (foto) {
          formData.append(`FOTOS[${index}]`, foto);
        }
      });

      // Log FormData for debugging
      console.log("FormData:", [...formData]);

      const url =
        modalMode === "add"
          ? "http://localhost:8000/api/gudang/barang-titipan"
          : `http://localhost:8000/api/gudang/barang-titipan/${barangTitipan.KODE_PRODUK}`;
      const method = modalMode === "add" ? "post" : "put";

      await axios({
        method,
        url,
        data: formData,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });

      fetchItems();
      setIsModalOpen(false);
      setError(null);
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      const validationErrors = err.response?.data?.errors
        ? JSON.stringify(err.response.data.errors)
        : "";
      setError(
        `Failed to ${
          modalMode === "add" ? "add" : "edit"
        } item: ${errorMessage} ${validationErrors}`
      );
    }
  };

  const handleDelete = async (kode_barang) => {
    if (!confirm("Delete this item?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:8000/api/gudang/barang-titipan/${kode_barang}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setItems(items.filter((item) => item.kode_barang !== kode_barang));
      setError(null);
    } catch (err) {
      setError(`Failed to delete item: ${err.message}`);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-10">Manage Barang Titipan</h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-6">{error}</div>
      )}

      <div className="flex justify-between mb-6">
        <input
          type="text"
          placeholder="Cari barang (kode, subkategori, deskripsi)..."
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 border border-gray-300 rounded-md w-1/3"
        />
        <button
          onClick={() => openModal("add")}
          className="bg-stone-600 text-white px-4 py-3 text-lg rounded-md hover:bg-stone-700"
        >
          + Tambah Barang
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
                  "Kode Barang",
                  "ID Penitipan",
                  "ID Penjualan",
                  "Nama Barang",
                  "Nama Subkategori",
                  "Harga Jual",
                  "Berat",
                  "Tanggal Kadaluarsa",
                  "Tanggal Perpanjangan",
                  "Status Barang",
                  "Kondisi",
                  "Tanggal Garansi",
                  "Deskripsi",
                  "Foto Produk",
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
              {filteredItems.map((item) => (
                <tr key={item.kode_barang}>
                  <td className="px-6 py-4">{item.kode_barang}</td>
                  <td className="px-6 py-4">{item.id_penitipan}</td>
                  <td className="px-6 py-4">{item.id_penjualan}</td>
                  <td className="px-6 py-4">{item.nama}</td>
                  <td className="px-6 py-4">{item.nama_subkategori}</td>
                  <td className="px-6 py-4">{item.harga_jual}</td>
                  <td className="px-6 py-4">{item.berat}</td>
                  <td className="px-6 py-4">{item.tanggal_kadaluarsa}</td>
                  <td className="px-6 py-4">{item.tanggal_perpanjangan}</td>
                  <td className="px-6 py-4">{item.status_barang}</td>
                  <td className="px-6 py-4">{item.kondisi}</td>
                  <td className="px-6 py-4">{item.tanggal_garansi}</td>
                  <td className="px-6 py-4">{item.deskripsi}</td>
                  <td className="px-6 py-4">
                    <img
                      src={item.foto_produk}
                      alt="Produk"
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-4">
                      <button
                        className="text-blue-500 hover:text-blue-600"
                        onClick={() => openModal("edit", item)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-500 hover:text-red-600"
                        onClick={() => handleDelete(item.kode_barang)}
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
              {modalMode === "add" ? "Tambah" : "Edit"} Barang Titipan
            </h2>
            <form>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    ID Penitipan
                  </label>
                  <input
                    type="text"
                    placeholder="Cari atau masukkan ID penitipan..."
                    value={barangTitipan.ID_PENITIPAN}
                    onChange={handlePenitipanSearch}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  {penitipanSearch && (
                    <div className="absolute bg-white border border-gray-300 rounded-md mt-1 w-full max-h-40 overflow-y-auto">
                      {filteredPenitipans.map((p) => (
                        <div
                          key={p.ID_PENITIPAN}
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => selectPenitipan(p)}
                        >
                          {p.ID_PENITIPAN}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Nama Subkategori
                  </label>
                  <input
                    type="text"
                    placeholder="Cari atau masukkan nama subkategori..."
                    value={barangTitipan.NAMA_SUBKATEGORI}
                    onChange={handleSubkategoriSearch}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  {subkategoriSearch && (
                    <div className="absolute bg-white border border-gray-300 rounded-md mt-1 w-full max-h-40 overflow-y-auto">
                      {filteredSubkategoris.map((s) => (
                        <div
                          key={s.ID_SUBKATEGORI}
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => selectSubkategori(s)}
                        >
                          {s.NAMASUB}
                        </div>
                      ))}
                    </div>
                  )}
                  {barangTitipan.NAMA_SUBKATEGORI && (
                    <p className="text-sm text-gray-600 mt-1">
                      Selected: {barangTitipan.NAMA_SUBKATEGORI}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Nama Barang
                  </label>
                  <input
                    type="text"
                    name="NAMA_BARANG"
                    value={barangTitipan.NAMA_BARANG}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Harga Jual
                  </label>
                  <input
                    type="number"
                    name="HARGA_JUAL"
                    value={barangTitipan.HARGA_JUAL}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Berat
                  </label>
                  <input
                    type="number"
                    name="BERAT"
                    value={barangTitipan.BERAT}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Kondisi
                  </label>
                  <input
                    type="text"
                    name="KONDISI"
                    value={barangTitipan.KONDISI}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Tanggal Garansi (Opsional)
                  </label>
                  <input
                    type="date"
                    name="TANGGAL_GARANSI"
                    value={barangTitipan.TANGGAL_GARANSI}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">
                    Deskripsi
                  </label>
                  <textarea
                    name="DESKRIPSI"
                    value={barangTitipan.DESKRIPSI}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">
                    Foto Produk (Maks 3)
                  </label>
                  {[0, 1, 2].map((index) => (
                    <div key={index} className="flex items-center mb-2">
                      <input
                        type="file"
                        name={`FOTO_${index}`}
                        accept="image/*"
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                      <label className="ml-4">
                        <input
                          type="radio"
                          name="IS_UTAMA_INDEX"
                          value={index}
                          checked={barangTitipan.IS_UTAMA_INDEX === index}
                          onChange={handleInputChange}
                          disabled={!barangTitipan.FOTOS[index]}
                        />
                        Utama
                      </label>
                    </div>
                  ))}
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
                  onClick={handleSubmit}
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

export default ManageBarangTitipan;