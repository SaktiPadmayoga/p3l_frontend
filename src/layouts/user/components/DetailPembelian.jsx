import React, { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import axios from "axios";

const DetailPembelian = ({ transactionId, onBack }) => {
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch transaction data
  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        console.log(`Fetching transaction data for no_nota: ${transactionId}`);
        if (!transactionId) {
          throw new Error("Invalid transaction ID");
        }

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

        if (!response.data.success) {
          throw new Error(
            response.data.message || "Failed to fetch transaction"
          );
        }

        // Find transaction by no_nota
        const tx = response.data.data.find((t) => t.no_nota === transactionId);
        if (!tx) {
          throw new Error("Transaction not found");
        }

        // Map to template structure
        const mappedTransaction = {
          id: tx.no_nota,
          invoiceNumber: tx.no_nota,
          shopName: tx.products
            .map((p) => p.nama_penitip)
            .filter((v, i, a) => a.indexOf(v) === i)
            .join(" & "), // Combine unique penitip names
          date: tx.tanggal_transaksi,
          status: tx.status,
          metodePengiriman: tx.metode_pengiriman,
          delivery:
            tx.metodePengiriman === "diambil sendiri"
              ? "- (diambil sendiri)"
              : tx.nama_kurir,
          products: tx.products.map((p) => ({
            name: p.nama_barang,
            price: parseInt(p.harga_barang.replace(/[^0-9]/g, "")),
            image: "/api/placeholder/60/60", // Keep placeholder
            penitip: p.nama_penitip,
            qcEmployee: p.nama_qc,
          })),
          shippingAddress: {
            buyerName: tx.nama_pembeli,
            email: tx.email_pembeli, // Placeholder (not in backend)
            address: tx.alamat,
          },
          shippingCost: parseInt(tx.ongkir.replace(/[^0-9]/g, "")), // Convert Rp string to number
          pointsUsed: tx.poin_digunakan,
          pointsEarned: tx.poin_diperoleh,
        };

        setTransaction(mappedTransaction);
      } catch (err) {
        console.error("Error fetching transaction:", err);
        setError(err.message || "Gagal mengambil detail transaksi.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransaction();
  }, [transactionId]);

  // Calculate discount from points (pointsUsed * 100)
  const discount = transaction ? transaction.pointsUsed * 100 : 0;
  // Calculate subtotal (sum of product prices * quantity)
  const subtotal = transaction
    ? transaction.products.reduce((sum, product) => sum + product.price, 0)
    : 0;
  // Calculate total amount (subtotal + shipping - discount)
  const totalAmount = transaction
    ? subtotal + transaction.shippingCost - discount
    : 0;

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
        <p className="text-lg font-medium">Memuat detail transaksi...</p>
      </div>
    );
  }

  // Show not found state
  if (!transaction) {
    return (
      <div className="text-center text-gray-600">
        <p className="text-lg font-medium">Transaksi tidak ditemukan.</p>
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
            NO.NOTA {transaction.invoiceNumber}
          </span>
          <span className="text-sm font-medium text-gray-600">|</span>
          <span
            className={`text-sm font-medium ${
              transaction.status === "sudah diterima" ||
              transaction.status === "sudah diambil"
                ? "text-green-600"
                : transaction.status === "dibatalkan"
                ? "text-red-600"
                : "text-yellow-600"
            }`}
          >
            {transaction.status}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 space-y-6">
        {/* Shipping Address */}
        <div className="border-b border-gray-200 pb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Alamat Pengiriman
          </h3>
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-800">
              {transaction.shippingAddress.buyerName}
            </p>
            <p className="text-sm text-gray-600">
              {transaction.shippingAddress.email}
            </p>
            <p className="text-sm text-gray-600">
              {transaction.shippingAddress.address}
            </p>
            <p className="text-sm text-gray-600">
              Delivery: {transaction.delivery}
            </p>
          </div>
        </div>

        {/* Product Details */}
        <div className="border-b border-gray-200 pb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Detail Produk
          </h3>
          {transaction.products.length === 0 ? (
            <p className="text-sm text-gray-600">Tidak ada produk ditemukan.</p>
          ) : (
            transaction.products.map((product, index) => (
              <div
                key={index}
                className="flex items-start justify-between space-x-4 mb-4 last:mb-0"
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
                    <div className="grid grid-cols-3 gap-2 mt-2 text-sm">
                      <div>
                        <p className="text-xs text-gray-500">Nama Penitip:</p>
                        <p className="text-gray-800">{product.penitip}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Pegawai QC:</p>
                        <p className="text-gray-800">{product.qcEmployee}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Harga Produk:</p>
                  <span className="text-sm font-semibold text-gray-800">
                    Rp
                    {product.price.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Price Breakdown */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Rincian Pembayaran
          </h3>
          <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Harga Barang</span>
              <span className="text-gray-800">
                Rp{subtotal.toLocaleString("id-ID")}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Ongkos Kirim</span>
              <span className="text-gray-800">
                Rp{transaction.shippingCost.toLocaleString("id-ID")}
              </span>
            </div>
            {transaction.pointsUsed > 0 && (
              <>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Poin Digunakan</span>
                  <span className="text-gray-800">
                    {transaction.pointsUsed} poin
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Potongan Harga</span>
                  <span className="text-green-600">
                    -Rp{discount.toLocaleString("id-ID")}
                  </span>
                </div>
              </>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Poin Diperoleh</span>
              <span className="text-gray-800">
                {transaction.pointsEarned} poin
              </span>
            </div>
            <div className="flex justify-between text-sm font-semibold border-t border-gray-200 pt-2 mt-2">
              <span className="text-gray-800">Total Akhir</span>
              <span className="text-gray-800">
                Rp{totalAmount.toLocaleString("id-ID")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPembelian;
