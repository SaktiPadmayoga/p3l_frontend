import React, { useState, useEffect } from "react";
import axios from "axios";
import AuthService from "../../../services/authService"; // Adjust path based on your project structure
import DetailPembelian from "./DetailPembelian";

const HistoryPembelian = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [rating, setRating] = useState(0);
  const [selectedTransactionId, setSelectedTransactionId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No authentication token found.");
        }

        const response = await axios.get(
          "http://localhost:8000/api/pembeli/transaksi",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          // Group transactions by no_nota
          const groupedByNota = response.data.data.reduce((acc, tx) => {
            const existing = acc.find((t) => t.no_nota === tx.no_nota);
            if (existing) {
              existing.products.push(...tx.products);
            } else {
              acc.push({
                no_nota: tx.no_nota,
                status: tx.status,
                products: tx.products,
                total_akhir: tx.total_akhir,
                tanggal_transaksi: tx.tanggal_transaksi,
              });
            }
            return acc;
          }, []);

          // Map to UI structure
          const mappedTransactions = groupedByNota.map((tx, index) => {
            // Group products by penitip
            const itemsByPenitip = tx.products.reduce((acc, product) => {
              const penitip = product.nama_penitip;
              const existing = acc.find((item) => item.shopName === penitip);
              if (existing) {
                existing.products.push({
                  id: product.product_id,
                  name: product.nama_barang,
                  price: product.harga_barang,
                  penitip: product.nama_penitip,
                  image: "/api/placeholder/60/60", // Keep placeholder
                });
              } else {
                acc.push({
                  shopName: penitip,
                  products: [
                    {
                      id: product.product_id,
                      name: product.nama_barang,
                      price: product.harga_barang,
                      penitip: product.nama_penitip,
                      image: "/api/placeholder/60/60",
                    },
                  ],
                });
              }
              return acc;
            }, []);

            return {
              id: tx.no_nota,
              date: tx.tanggal_transaksi,
              status: tx.status,
              items: itemsByPenitip,
              totalAmount: tx.total_akhir,
            };
          });

          setTransactions(mappedTransactions);
        } else {
          throw new Error(
            response.data.message || "Failed to fetch transactions"
          );
        }
      } catch (err) {
        console.error("Error fetching transactions:", err);
        setError(
          err.response?.data?.message ||
            "Gagal mengambil riwayat transaksi. Silakan coba lagi."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
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

  const handleCardBodyClick = (transactionId) => {
    console.log(`Navigating to transaction details for ID: ${transactionId}`);
    setSelectedTransactionId(transactionId);
  };

  const handleBackToHistory = () => {
    setSelectedTransactionId(null);
  };

  const openRatingModal = (product, shopName) => {
    setSelectedProduct({ ...product, shopName });
    setRating(0);
    setIsRatingModalOpen(true);
  };

  const handleRatingChange = (rating) => {
    setRating(rating);
  };

  const handleRatingSubmit = () => {
    console.log("Submitted rating for product:", selectedProduct.id, rating);
    setIsRatingModalOpen(false);
    setSelectedProduct(null);
    setRating(0);
  };

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch =
      tx.items.some((item) =>
        item.products.some(
          (product) =>
            product.penitip.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      ) || tx.date.includes(searchQuery);

    const matchesStatus =
      filterStatus === "Semua" ? true : tx.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const statusFilters = [
    "Semua",
    "menunggu pembayaran",
    "sedang dikemas",
    "sedang dikirim",
    "sudah diterima",
    "sudah diambil",
    "dibatalkan",
    "siap diambil",
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 relative">
      {selectedTransactionId ? (
        <DetailPembelian
          transactionId={selectedTransactionId}
          onBack={handleBackToHistory}
        />
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Riwayat Pembelian
            </h2>
          </div>

          {/* Loading and Error States */}
          {isLoading && (
            <p className="text-center text-gray-500">
              Memuat riwayat transaksi...
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
                  placeholder="Cari transaksi..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
                  className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-6">
                {filteredTransactions.length === 0 ? (
                  <p className="text-center text-gray-500">
                    Tidak ada transaksi yang ditemukan.
                  </p>
                ) : (
                  filteredTransactions.map((tx) => (
                    <div
                      key={tx.id}
                      className="bg-white rounded-lg shadow-sm border border-gray-200"
                    >
                      {/* Card Header - Transaction Info */}
                      <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-gray-50">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-semibold text-gray-800">
                            No. Nota: {tx.id}
                          </span>
                        </div>
                        <span
                          className={`text-sm font-medium ${
                            tx.status === "sudah diterima" ||
                            tx.status === "sudah diambil"
                              ? "text-green-600"
                              : tx.status === "dibatalkan"
                              ? "text-red-600"
                              : "text-yellow-600"
                          }`}
                        >
                          {tx.status}
                        </span>
                      </div>

                      {/* Card Body with Penitip Groups */}
                      <div
                        className="p-4 cursor-pointer hover:bg-gray-50 transition"
                        onClick={() => handleCardBodyClick(tx.id)}
                      >
                        {tx.items.map((item, shopIndex) => (
                          <div key={shopIndex} className="mb-6 last:mb-0">
                            {/* Penitip Header */}
                            <div className="flex items-center space-x-2 mb-3 pb-2 border-b border-gray-100">
                              <span className="text-sm font-semibold text-gray-700">
                                {item.shopName}
                              </span>
                            </div>

                            {/* Penitip Products */}
                            <div className="space-y-4">
                              {item.products.map((product, productIndex) => (
                                <div
                                  key={productIndex}
                                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100 last:border-0"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <div className="flex items-start space-x-4">
                                    <img
                                      src={product.image}
                                      alt={product.name}
                                      className="w-16 h-16 object-cover rounded"
                                    />
                                    <div>
                                      <p className="text-sm font-medium text-gray-800">
                                        {product.name}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="flex flex-col items-end gap-2">
                                    <div className="text-right">
                                      <p className="text-sm text-gray-500">
                                        Harga:
                                      </p>
                                      <span className="text-sm font-semibold text-gray-800">
                                        {product.price}
                                      </span>
                                    </div>
                                    {(tx.status === "sudah diambil" ||
                                      tx.status === "sudah diterima") && (
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          openRatingModal(
                                            product,
                                            product.penitip
                                          );
                                        }}
                                        className="bg-blue-500 text-white px-3 py-1.5 text-sm rounded-lg hover:bg-blue-600 transition"
                                      >
                                        Beri Nilai
                                      </button>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Card Footer */}
                      <div className="flex justify-end items-center p-4 border-t border-gray-200 bg-gray-50">
                        <div className="text-right">
                          <p className="text-sm text-gray-600">
                            Total Pesanan:{" "}
                            <span className="font-semibold text-gray-800">
                              {tx.totalAmount}
                            </span>
                          </p>
                          <p className="text-xs text-gray-500">
                            Tanggal Transaksi: {tx.date}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}

          {/* Rating Modal */}
          {isRatingModalOpen && selectedProduct && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="absolute inset-0 bg-black/50 pointer-events-none"></div>
              <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-700">
                  Beri Nilai Produk
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">
                        {selectedProduct.name}
                      </p>
                      <div className="flex space-x-1 mt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => handleRatingChange(star)}
                            className={`text-2xl ${
                              rating >= star
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                          >
                            ★
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-6 space-x-2">
                  <button
                    onClick={() => setIsRatingModalOpen(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleRatingSubmit}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                  >
                    Kirim
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HistoryPembelian;
