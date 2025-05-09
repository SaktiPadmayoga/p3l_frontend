import React, { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";

const DetailPenitipan = ({ transactionId, onBack }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Placeholder transaction data (in a real app, this would be fetched using transactionId)
  const transactions = [
    {
      id: 101,
      invoiceNumber: "INV-20250420-101",
      shopName: "JFR OFFICIAL Shop",
      date: "2025-04-20",
      status: "Selesai",
      products: [
        {
          name: "JFR Premium Sunglasses",
          variant: "MATTE BLACK",
          quantity: 3,
          price: 120000,
          originalPrice: "Rp200.000",
          image: "/api/placeholder/60/60",
          penitip: "Andi Pratama",
          qcEmployee: "Budi Santoso",
          courier: "JNE Express",
        },
      ],
      shippingAddress: {
        buyerName: "John Doe",
        phoneNumber: "081234567890",
        address: "Jl. Merdeka No. 123, Kec. Depok, Sleman, Yogyakarta 55281",
      },
      shippingCost: 15000,
      pointsUsed: 0,
      pointsEarned: 30,
    },
    {
      id: 102,
      invoiceNumber: "INV-20250412-102",
      shopName: "Fashion Outlet",
      date: "2025-04-12",
      status: "Dikirim",
      products: [
        {
          name: "Designer Scarf",
          variant: "RED",
          quantity: 2,
          price: 75000,
          originalPrice: "Rp100.000",
          image: "/api/placeholder/60/60",
          penitip: "Maya Sari",
          qcEmployee: "Tono Suparno",
          courier: "J&T Express",
        },
      ],
      shippingAddress: {
        buyerName: "Diana Prince",
        phoneNumber: "081789012345",
        address: "Jl. Thamrin No. 89, Semarang, Jawa Tengah 50134",
      },
      shippingCost: 10000,
      pointsUsed: 0,
      pointsEarned: 20,
    },
    {
      id: 103,
      invoiceNumber: "INV-20250505-103",
      shopName: "Electronics Megastore",
      date: "2025-05-05",
      status: "Sedang Dikemas",
      products: [
        {
          name: "Wireless Charger",
          variant: "WHITE",
          quantity: 5,
          price: 50000,
          originalPrice: "Rp80.000",
          image: "/api/placeholder/60/60",
          penitip: "Rina Susanti",
          qcEmployee: "Dedi Kurniawan",
          courier: "SiCepat",
        },
      ],
      shippingAddress: {
        buyerName: "Michael Tan",
        phoneNumber: "081234567891",
        address:
          "Jl. Pahlawan No. 45, Kec. Kemayoran, Jakarta Pusat, DKI Jakarta 10640",
      },
      shippingCost: 20000,
      pointsUsed: 0,
      pointsEarned: 50,
    },
  ];

  const transaction = transactions.find(
    (tx) => tx.id === Number(transactionId)
  );

  // Calculate discount from points (pointsUsed * 100)
  const discount = transaction ? transaction.pointsUsed * 100 : 0;
  // Calculate total amount (sum of product prices + shipping - discount)
  const subtotal = transaction
    ? transaction.products.reduce(
        (sum, product) => sum + product.price * product.quantity,
        0
      )
    : 0;
  const totalAmount = transaction
    ? subtotal + transaction.shippingCost - discount
    : 0;

  // Fetch transaction data based on ID (simulated)
  useEffect(() => {
    console.log(
      `Attempting to fetch penitipan transaction data for ID: ${transactionId}`
    );
    if (!transactionId || isNaN(Number(transactionId))) {
      setError("Invalid transaction ID");
      setLoading(false);
      return;
    }

    // Simulate loading
    const timer = setTimeout(() => {
      if (!transaction) {
        setError("Transaction not found");
      }
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [transactionId, transaction]);

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
              transaction.status === "Selesai"
                ? "text-green-600"
                : transaction.status === "Dibatalkan"
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
              {transaction.shippingAddress.phoneNumber}
            </p>
            <p className="text-sm text-gray-600">
              {transaction.shippingAddress.address}
            </p>
          </div>
        </div>

        {/* Product Details */}
        <div className="border-b border-gray-200 pb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Detail Produk Penitipan
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
                      <div>
                        <p className="text-xs text-gray-500">Kurir:</p>
                        <p className="text-gray-800">
                          {transaction.status === "Siap Diambil"
                            ? "-"
                            : product.courier}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Harga Produk:</p>
                  <span className="text-sm font-semibold text-gray-800">
                    Rp
                    {(product.price * product.quantity).toLocaleString("id-ID")}
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

export default DetailPenitipan;
