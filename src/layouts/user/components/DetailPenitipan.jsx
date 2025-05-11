import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChevronLeft } from "lucide-react";

const DetailPenitipan = ({ itemId, onBack }) => {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No authentication token found.");
        }

        const response = await axios.get(
          `http://localhost:8000/api/penitip/barang-titipan/${itemId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          setItem(response.data.data);
        } else {
          throw new Error(
            response.data.message || "Failed to fetch item details"
          );
        }
      } catch (err) {
        console.error("Error fetching item details:", err);
        setError(
          err.response?.data?.message ||
            "Gagal mengambil detail barang titipan. Silakan coba lagi."
        );
      } finally {
        setLoading(false);
      }
    };

    if (itemId) {
      fetchItemDetails();
    } else {
      setError("Invalid item ID");
      setLoading(false);
    }
  }, [itemId]);

  // Show error state
  if (error) {
    return (
      <div className="text-center text-red-600">
        <p className="text-lg font-medium">Error: {error}</p>
      </div>
    );
  }

  // Show loading state
  if (loading) {
    return (
      <div className="text-center text-gray-600">
        <p className="text-lg font-medium">Memuat detail barang titipan...</p>
      </div>
    );
  }

  // Show not found state
  if (!item) {
    return (
      <div className="text-center text-gray-600">
        <p className="text-lg font-medium">Barang titipan tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Card Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition"
        >
          <ChevronLeft size={20} />
          <span className="text-sm font-medium">Kembali</span>
        </button>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">
            KODE PRODUK {item.id}
          </span>
          <span className="text-sm font-medium text-gray-600">|</span>
          <span
            className={`text-sm font-medium ${
              item.status === "tersedia"
                ? "text-green-600"
                : item.status === "dibatalkan" || item.status === "hangus"
                ? "text-red-600"
                : "text-yellow-600"
            }`}
          >
            {item.status}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 space-y-6">
        {/* Item Details */}
        <div className="border-b border-gray-200 pb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Detail Barang Titipan
          </h3>
          <div className="flex items-start space-x-4">
            <img
              src="/api/placeholder/60/60" // Placeholder image
              alt={item.name}
              className="w-16 h-16 object-cover rounded"
            />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">{item.name}</p>
              <p className="text-sm text-gray-600 mt-1">{item.description}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Harga Jual:</p>
              <span className="text-sm font-semibold text-gray-800">
                Rp {item.price.toLocaleString("id-ID")}
              </span>
            </div>
          </div>
        </div>

        {/* Item Information */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Informasi Barang
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
            <div>
              <p className="text-sm text-gray-600">Kategori:</p>
              <p className="text-sm font-medium text-gray-800">
                {item.category}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Subkategori:</p>
              <p className="text-sm font-medium text-gray-800">
                {item.subcategory}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Kondisi:</p>
              <p className="text-sm font-medium text-gray-800">
                {item.condition || "-"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Berat:</p>
              <p className="text-sm font-medium text-gray-800">
                {item.weight || "-"}
              </p>
            </div>
            {/* <div>
              <p className="text-sm text-gray-600">Tanggal Garansi:</p>
              <p className="text-sm font-medium text-gray-800">
                {item.warranty_date || "-"}
              </p>
            </div> */}
            <div>
              <p className="text-sm text-gray-600">Rating:</p>
              <p className="text-sm font-medium text-gray-800">
                {item.rating || 0} / 5
                {/* {item.tanggal_siap} */}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPenitipan;