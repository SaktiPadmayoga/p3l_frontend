import React, { useState, useEffect } from "react";
import axiosInstance from "../../../utils/axiosInstance"; // Adjust the import path as necessary
import AuthService from "../../../services/authService"; // Import AuthService to get current user info

const ManagePenitip = () => {
  const [penitips, setPenitips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPenitip, setNewPenitip] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    noKtp: "",
    password: "",
    fotoKtp: null, // For file upload
  });
  const [currentUserId, setCurrentUserId] = useState(null);
  const [editingPenitipId, setEditingPenitipId] = useState(null);
  const [loadError, setLoadError] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  // Function to fetch penitips data
  const fetchPenitips = async () => {
    try {
      setLoading(true);
      setLoadError(null);
      const response = await axiosInstance.get("/cs/manage-penitip");
      console.log("Fetched penitips:", response.data);
      setPenitips(response.data);
    } catch (error) {
      console.error("Error fetching penitips:", error);
      setLoadError("Failed to load penitips data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const user = AuthService.getCurrentUser();
        setCurrentUserId(user.id); // Assuming user object has an 'id' property
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    fetchPenitips();
    fetchCurrentUser();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPenitips = penitips.filter((penitip) =>
    penitip.NAMA.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPenitip({
      ...newPenitip,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Check if file is an image
      if (!file.type.match("image.*")) {
        alert("Please select an image file (jpeg, png, jpg, gif)");
        e.target.value = ""; // Reset the input
        return;
      }

      // Check file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert("File size should be less than 2MB");
        e.target.value = ""; // Reset the input
        return;
      }

      console.log("Selected file:", file.name, file.type, file.size);
      setNewPenitip({
        ...newPenitip,
        fotoKtp: file,
      });

      // Create preview URL for the selected image
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);
    } else {
      setNewPenitip({
        ...newPenitip,
        fotoKtp: null,
      });
      setPreviewImage(null);
    }
  };

  // Format the image URL
  const formatImageUrl = (imagePath) => {
    if (!imagePath) return null;

    // If path already includes http:// or https://, return as is
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      return imagePath;
    }

    // Otherwise, prepend the storage URL
    return `http://localhost:8000/storage/${imagePath}`;
  };

  const handleAddPenitip = async (e) => {
    // Prevent default form submission if called from a form
    if (e) e.preventDefault();

    console.log("handleAddPenitip called");

    // Validation
    if (!newPenitip.name) {
      alert("Name is required");
      return;
    }

    // Create FormData object for file upload
    const formData = new FormData();
    formData.append("NAMA", newPenitip.name);
    formData.append("ALAMAT", newPenitip.address || "");
    formData.append("TELEPON", newPenitip.phone || "");
    formData.append("NO_KTP", newPenitip.noKtp || "");
    formData.append("EMAIL", newPenitip.email || "");

    // Only append password if it exists
    if (newPenitip.password) {
      formData.append("PASSWORD", newPenitip.password);
    }

    // Only append file if it exists
    if (newPenitip.fotoKtp) {
      formData.append("FOTO_KTP", newPenitip.fotoKtp);
    }

    // Log form data for debugging
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    try {
      // Show loading indicator if needed
      setLoading(true);

      const response = await axiosInstance.post(
        "/cs/manage-penitip",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response from server:", response.data);

      // Refresh the penitip list
      fetchPenitips();

      // Reset form and close modal
      setIsModalOpen(false);
      resetForm();

      // Show success message
      alert("Penitip added successfully!");
    } catch (error) {
      console.error("Error adding penitip:", error);

      // Better error handling
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Error data:", error.response.data);
        console.error("Error status:", error.response.status);

        // Show friendly error message
        if (error.response.data && error.response.data.message) {
          alert(`Error: ${error.response.data.message}`);
        } else if (error.response.data && error.response.data.error) {
          alert(`Error: ${error.response.data.error}`);
        } else {
          alert(`Error: ${error.response.status} - Something went wrong`);
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Error request:", error.request);
        alert(
          "No response from server. Please check your internet connection."
        );
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error message:", error.message);
        alert(`Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePenitip = async (e) => {
    // Prevent default form submission if called from a form
    if (e) e.preventDefault();

    console.log("handleUpdatePenitip called for ID:", editingPenitipId);

    // Validation
    if (!newPenitip.name) {
      alert("Name is required");
      return;
    }

    // Create FormData object for file upload
    const formData = new FormData();
    formData.append("_method", "PUT"); // This is important for Laravel to recognize it as a PUT request
    formData.append("NAMA", newPenitip.name);
    formData.append("ALAMAT", newPenitip.address || "");
    formData.append("TELEPON", newPenitip.phone || "");
    formData.append("NO_KTP", newPenitip.noKtp || "");
    formData.append("EMAIL", newPenitip.email || "");

    // Only append password if it exists and is not empty
    if (newPenitip.password) {
      formData.append("PASSWORD", newPenitip.password);
    }

    // Only append file if it exists
    if (newPenitip.fotoKtp) {
      formData.append("FOTO_KTP", newPenitip.fotoKtp);
    }

    // Log form data for debugging
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    try {
      // Show loading indicator if needed
      setLoading(true);

      // Using post with _method: PUT for proper file upload handling
      const response = await axiosInstance.post(
        `/cs/manage-penitip/${editingPenitipId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response from server:", response.data);

      // Refresh the penitip list
      fetchPenitips();

      // Reset form and close modal
      setIsModalOpen(false);
      resetForm();

      // Show success message
      alert("Penitip updated successfully!");
    } catch (error) {
      console.error("Error updating penitip:", error);

      // Better error handling
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Error data:", error.response.data);
        console.error("Error status:", error.response.status);

        // Show friendly error message
        if (error.response.data && error.response.data.message) {
          alert(`Error: ${error.response.data.message}`);
        } else if (error.response.data && error.response.data.error) {
          alert(`Error: ${error.response.data.error}`);
        } else {
          alert(`Error: ${error.response.status} - Something went wrong`);
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Error request:", error.request);
        alert(
          "No response from server. Please check your internet connection."
        );
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error message:", error.message);
        alert(`Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePenitip = async (id) => {
    if (window.confirm("Yakin ingin menghapus penitip ini?")) {
      try {
        await axiosInstance.delete(`/cs/manage-penitip/${id}`);
        setPenitips(penitips.filter((p) => p.ID_PENITIP !== id));
        alert("Penitip berhasil dihapus!");
      } catch (error) {
        console.error("Error deleting penitip:", error);
        alert("Gagal menghapus penitip. Silakan coba lagi.");
      }
    }
  };

  const resetForm = () => {
    setNewPenitip({
      name: "",
      email: "",
      phone: "",
      address: "",
      noKtp: "",
      password: "",
      fotoKtp: null, // Reset file input
    });
    setPreviewImage(null);
    setEditingPenitipId(null);
    setIsModalOpen(false);
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
      <h1 className="text-4xl font-bold mb-10">Manage Penitip</h1>

      {/* Error message display */}
      {loadError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{loadError}</p>
          <button onClick={fetchPenitips} className="ml-2 font-bold underline">
            Retry
          </button>
        </div>
      )}

      {/* Search and Add */}
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Cari penitip..."
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 border border-gray-300 rounded-md w-1/3"
        />
        <button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="bg-teal-600 text-white px-4 py-3 text-lg rounded-md hover:bg-teal-700"
        >
          + Tambah Penitip
        </button>
      </div>

      {/* Tabel Penitip */}
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
                  "No. Telepon",
                  "Alamat",
                  "Email",
                  "No. KTP",
                  "Status",
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
              {filteredPenitips.length > 0 ? (
                filteredPenitips.map((penitip) => (
                  <tr key={penitip.ID_PENITIP}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {penitip.ID_PENITIP}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {penitip.NAMA}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {penitip.TELEPON}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {penitip.ALAMAT}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {penitip.EMAIL}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {penitip.NO_KTP}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {penitip.STATUS}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-4">
                        <button
                          className="text-blue-500 hover:text-blue-600"
                          onClick={() => {
                            setNewPenitip({
                              name: penitip.NAMA,
                              email: penitip.EMAIL,
                              phone: penitip.TELEPON,
                              address: penitip.ALAMAT,
                              noKtp: penitip.NO_KTP,
                              password: "", // Do not pre-fill password
                              fotoKtp: null, // Reset file input
                            });
                            setEditingPenitipId(penitip.ID_PENITIP);
                            setIsModalOpen(true);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-500 hover:text-red-600"
                          onClick={() =>
                            handleDeletePenitip(penitip.ID_PENITIP)
                          }
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
                    colSpan="8"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    Tidak ada penitip ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for Penitip Form - Matched to ManageMerchandise style */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-gray-900/50 flex items-center justify-center z-50"
          onClick={(e) => e.target === e.currentTarget && resetForm()}
        >
          <div className="bg-white p-6 rounded-lg w-11/12 md:w-3/5">
            <h2 className="text-xl font-bold mb-4">
              {editingPenitipId ? "Edit" : "Tambah"} Penitip
            </h2>
            <form
              onSubmit={
                editingPenitipId ? handleUpdatePenitip : handleAddPenitip
              }
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Nama <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={newPenitip.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={newPenitip.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    No. Telepon
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={newPenitip.phone}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    No. KTP
                  </label>
                  <input
                    type="text"
                    name="noKtp"
                    value={newPenitip.noKtp}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">
                    Alamat
                  </label>
                  <textarea
                    name="address"
                    value={newPenitip.address}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                {!editingPenitipId && (
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={newPenitip.password}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                )}

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">
                    Foto KTP
                  </label>
                  <input
                    type="file"
                    name="fotoKtp"
                    onChange={handleFileChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    accept="image/jpeg,image/png,image/jpg,image/gif"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Format yang diperbolehkan: JPG, PNG, JPEG, GIF. Maks: 2MB.
                  </p>

                  {previewImage && (
                    <div className="mt-3">
                      <p className="text-sm text-gray-500 mb-1">Preview:</p>
                      <div className="relative inline-block">
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="h-24 w-24 rounded object-cover"
                          onError={(e) => {
                            e.target.src = "/placeholder-ktp.png";
                            e.target.onerror = null;
                          }}
                        />
                        <button
                          type="button"
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
                          onClick={() => {
                            setNewPenitip({
                              ...newPenitip,
                              fotoKtp: null,
                            });
                            setPreviewImage(null);
                          }}
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-end mt-6">
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

export default ManagePenitip;
