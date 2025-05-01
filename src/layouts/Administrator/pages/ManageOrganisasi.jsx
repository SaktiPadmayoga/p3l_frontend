import React, { useState, useEffect, useCallback } from "react";
import axiosInstance from "../../../utils/axiosInstance";

const ManageOrganisasi = () => {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newOrganization, setNewOrganization] = useState({
    nama: "",
    alamat: "",
    telepon: "",
    deskripsi: "",
    email: "",
    status: "active",
    foto: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [loadError, setLoadError] = useState(null);

  // Function to format the image URL correctly
  const formatImageUrl = (imagePath) => {
    if (!imagePath) return null;

    // If path already includes http:// or https://, return as is
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      return imagePath;
    }

    // Otherwise, prepend the storage URL
    return `http://localhost:8000/storage/${imagePath}`;
  };

  const fetchOrganizations = useCallback(async () => {
    try {
      setLoadError(null);
      setLoading(true);
      const res = await axiosInstance.get("/admin/manage-organisasi");
      setOrganizations(res.data);
    } catch (err) {
      console.error("Failed to fetch organizations", err);
      setLoadError("Failed to load organizations. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrganizations();
  }, [fetchOrganizations]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredOrganizations = organizations.filter((org) =>
    org.NAMA.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrganization({
      ...newOrganization,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Create preview URL for the selected image
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);
    }
  };

  const resetForm = () => {
    setNewOrganization({
      nama: "",
      alamat: "",
      telepon: "",
      deskripsi: "",
      email: "",
      status: "active",
      foto: "",
    });
    setSelectedFile(null);
    setPreviewImage(null);
    setEditingId(null);
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create FormData object to handle file uploads
      const formData = new FormData();
      formData.append("NAMA", newOrganization.nama);
      formData.append("ALAMAT", newOrganization.alamat);
      formData.append("TELEPON", newOrganization.telepon);
      formData.append("DESKRIPSI", newOrganization.deskripsi);
      formData.append("EMAIL", newOrganization.email);
      formData.append("STATUS", newOrganization.status);

      // If a new file is selected, append it to formData
      if (selectedFile) {
        formData.append("FOTO_ORGANISASI", selectedFile);
      } else if (newOrganization.foto && !selectedFile) {
        // If no new file but there's an existing foto URL, pass it along
        formData.append("FOTO_ORGANISASI", newOrganization.foto);
      }

      if (editingId) {
        // For update, need to use appropriate headers for multipart/form-data
        await axiosInstance.post(
          `/admin/manage-organisasi/${editingId}?_method=PUT`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        alert("Organisasi berhasil diperbarui!");
      }

      fetchOrganizations();
      resetForm();
    } catch (err) {
      console.error("Error saving organization", err);
      alert("Gagal menyimpan organisasi. Silakan coba lagi.");
    }
  };

  const handleEdit = (org) => {
    setNewOrganization({
      nama: org.NAMA,
      alamat: org.ALAMAT,
      telepon: org.TELEPON,
      deskripsi: org.DESKRIPSI,
      email: org.EMAIL,
      status: org.STATUS,
      foto: org.FOTO_ORGANISASI,
    });

    // Set the preview image if there's an existing photo
    if (org.FOTO_ORGANISASI) {
      setPreviewImage(formatImageUrl(org.FOTO_ORGANISASI));
    } else {
      setPreviewImage(null);
    }

    setEditingId(org.ID_ORGANISASI);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus organisasi ini?")) {
      try {
        await axiosInstance.delete(`/admin/manage-organisasi/${id}`);
        fetchOrganizations();
        alert("Organisasi berhasil dihapus!");
      } catch (err) {
        console.error("Error deleting organization", err);
        alert("Gagal menghapus organisasi. Silakan coba lagi.");
      }
    }
  };

  // Clean up preview URL when component unmounts or when a new file is selected
  useEffect(() => {
    return () => {
      if (previewImage && previewImage.startsWith("blob:")) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-10">Manage Organisasi</h1>

      {loadError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{loadError}</p>
          <button
            onClick={fetchOrganizations}
            className="ml-2 font-bold underline"
          >
            Retry
          </button>
        </div>
      )}

      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Cari organisasi..."
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 border border-gray-300 rounded-md w-1/3"
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-teal-600"></div>
          <p className="ml-3">Loading data...</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow mt-10">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                {[
                  "ID",
                  "Nama",
                  "Alamat",
                  "Telepon",
                  "Deskripsi",
                  "Email",
                  "Status",
                  "Foto",
                  "Aksi",
                ].map((header) => (
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
              {filteredOrganizations.length > 0 ? (
                filteredOrganizations.map((org) => (
                  <tr key={org.ID_ORGANISASI}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {org.ID_ORGANISASI}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{org.NAMA}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {org.ALAMAT}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {org.TELEPON}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {org.DESKRIPSI}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{org.EMAIL}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {org.STATUS}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {org.FOTO_ORGANISASI ? (
                        <img
                          src={formatImageUrl(org.FOTO_ORGANISASI)}
                          alt="Foto Organisasi"
                          className="h-16 w-16 rounded-full object-cover"
                          onError={(e) => {
                            console.error(
                              "Image failed to load:",
                              org.FOTO_ORGANISASI
                            );
                            e.target.src = "/placeholder-organization.png"; // Fallback image
                            e.target.onerror = null; // Prevent infinite loop
                          }}
                        />
                      ) : (
                        <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-500 text-xs">
                            No Image
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-4">
                        <button
                          className="text-blue-500 hover:text-blue-600"
                          onClick={() => handleEdit(org)}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-500 hover:text-red-600"
                          onClick={() => handleDelete(org.ID_ORGANISASI)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="9"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    Tidak ada organisasi ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-gray-900/50 flex items-center justify-center z-50"
          onClick={(e) => e.target === e.currentTarget && resetForm()}
        >
          <div className="bg-white p-6 rounded-lg w-11/12 md:w-1/3">
            <h2 className="text-xl font-bold mb-4">
              {editingId ? "Edit" : "Tambah"} Organisasi
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Nama Organisasi <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="nama"
                  value={newOrganization.nama}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Alamat</label>
                <input
                  type="text"
                  name="alamat"
                  value={newOrganization.alamat}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Telepon
                </label>
                <input
                  type="text"
                  name="telepon"
                  value={newOrganization.telepon}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Deskripsi
                </label>
                <textarea
                  name="deskripsi"
                  value={newOrganization.deskripsi}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={newOrganization.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  name="status"
                  value={newOrganization.status}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Foto Organisasi
                </label>
                <input
                  type="file"
                  name="foto_file"
                  onChange={handleFileChange}
                  accept="image/jpeg,image/png,image/jpg"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Format yang diperbolehkan: JPG, PNG, JPEG. Maks: 2MB.
                </p>

                {previewImage && (
                  <div className="mt-3">
                    <p className="text-sm text-gray-500 mb-1">Preview:</p>
                    <div className="relative">
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="h-24 w-24 rounded-full object-cover"
                        onError={(e) => {
                          e.target.src = "/placeholder-organization.png";
                          e.target.onerror = null;
                        }}
                      />
                      <button
                        type="button"
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
                        onClick={() => {
                          setSelectedFile(null);
                          setPreviewImage(null);
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={resetForm}
                  className="mr-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700"
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

export default ManageOrganisasi;
