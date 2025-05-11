import React, { useState, useEffect } from "react";
import axios from "axios";
import AuthService from "../../../services/authService"; // Adjust path based on your project structure
import DetailPenitipan from "./DetailPenitipan"; // Placeholder for detail component

const HistoryPenitipan = () => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No authentication token found.");
        }

        const response = await axios.get(
          "http://localhost:8000/api/penitip/barang-titipan",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          // Map items to UI structure
          const mappedItems = response.data.data.map((item) => ({
            id: item.KODE_PRODUK,
            name: item.NAMA,
            status: item.STATUS || "tidak diketahui",
            price: item.HARGA_JUAL || 0,
            subcategory: item.ID_SUBKATEGORI, // Subcategory ID (could be resolved to name via another API call if needed)
            weight: item.BERAT || "-",
            condition: item.KONDISI || "-",
            warranty_date: item.TANGGAL_GARANSI || "-",
            description: item.DESKRIPSI || "-",
            rating: item.rating || 0,
            created_at: item.created_at,
            image: "/api/placeholder/60/60", // Placeholder image
          }));

          setItems(mappedItems);
        } else {
          throw new Error(
            response.data.message || "Failed to fetch consignment items"
          );
        }
      } catch (err) {
        console.error("Error fetching consignment items:", err);
        setError(
          err.response?.data?.message ||
            "Gagal mengambil riwayat penitipan. Silakan coba lagi."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
  };

  const handleFilterChange = (status) => {
    setFilterStatus(status);
  };

  const handleCardBodyClick = (itemId) => {
    console.log(`Navigating to item details for ID: ${itemId}`);
    setSelectedItemId(itemId);
  };

  const handleBackToHistory = () => {
    setSelectedItemId(null);
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      filterStatus === "Semua" ? true : item.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const statusFilters = [
    "Semua",
    "tersedia",
    "didonasikan",
    "hangus",
    "dibatalkan",
    // Add other statuses based on your application's needs
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 relative">
      {selectedItemId ? (
        <DetailPenitipan
          itemId={selectedItemId}
          onBack={handleBackToHistory}
        />
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Riwayat Penitipan
            </h2>
          </div>

          {/* Loading and Error States */}
          {isLoading && (
            <p className="text-center text-gray-500">
              Memuat riwayat penitipan...
            </p>
          )}
          {error && <p className="text-center text-red-600 mb-4">{error}</p>}

          {/* Filter Card Bar */}
          {!isLoading && !error && (
            <>
              <div className="flex space-x-2 overflow-x-auto mb-4">
                {statusFilters.map((status) => (
                  <button
                    key={status}
                    onClick={() => handleFilterChange(status)}
                    className={`text-sm font-medium px-4 py-2 rounded-lg border whitespace-nowrap transition ${
                      filterStatus === status
                        ? "bg-red-500 text-white border-red-500"
                        : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Cari barang titipan..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
                  className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-6">
                {filteredItems.length === 0 ? (
                  <p className="text-center text-gray-500">
                    Tidak ada barang titipan yang ditemukan.
                  </p>
                ) : (
                  filteredItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-lg shadow-sm border border-gray-200"
                    >
                      {/* Card Header - Item Info */}
                      <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-gray-50">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-semibold text-gray-800">
                            Kode Produk: {item.id}
                          </span>
                        </div>
                        <span
                          className={`text-sm font-medium ${
                            item.status === "tersedia"
                              ? "text-green-600"
                              : item.status === "dibatalkan" ||
                                item.status === "hangus"
                              ? "text-red-600"
                              : "text-yellow-600"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>

                      {/* Card Body */}
                      <div
                        className="p-4 cursor-pointer hover:bg-gray-50 transition"
                        onClick={() => handleCardBodyClick(item.id)}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-start space-x-4">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded"
                            />
                            <div>
                              <p className="text-sm font-medium text-gray-800">
                                {item.name}
                              </p>
                              <p className="text-sm text-gray-500">
                                Deskripsi: {item.description}
                              </p>
                              <p className="text-sm text-gray-500">
                                Kondisi: {item.condition}
                              </p>
                              <p className="text-sm text-gray-500">
                                Berat: {item.weight}
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-col items-end gap-2">
                            <div className="text-right">
                              <p className="text-sm text-gray-500">Harga:</p>
                              <span className="text-sm font-semibold text-gray-800">
                                Rp {item.price.toLocaleString()}
                              </span>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-500">Rating:</p>
                              <span className="text-sm font-semibold text-gray-800">
                                {item.rating} / 5
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Card Footer */}
                      <div className="flex justify-end items-center p-4 border-t border-gray-200 bg-gray-50">
                        <div className="text-right">
                          <p className="text-xs text-gray-500">
                            Tanggal Penitipan: {item.created_at}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default HistoryPenitipan;