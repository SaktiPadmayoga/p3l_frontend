import React, { useState, useEffect } from "react";
import axios from "../../../utils/axiosInstance";

const HistoryDonasi = () => {
  const [histories, setHistories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDonasi, setSelectedDonasi] = useState(null);
  const [recipientName, setRecipientName] = useState("");
  const [donationDate, setDonationDate] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchHistories();
  }, []);

  const fetchHistories = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/owner/history-donasi");
      console.log("History data:", response.data);
      setHistories(response.data);
      setError("");
    } catch (error) {
      console.error("Error fetching donation history:", error);
      setError("Gagal memuat data donasi. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmDonation = (donasi) => {
    setSelectedDonasi(donasi);
    setRecipientName(
      donasi.nama_penerima !== "Belum ditentukan" ? donasi.nama_penerima : ""
    );
    setDonationDate(
      donasi.tanggal_donasi !== "Belum ditentukan" ? donasi.tanggal_donasi : ""
    );
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    try {
      // Update the donation with recipient name and date
      await axios.put(`/owner/history-donasi/${selectedDonasi.id}`, {
        NAMA_PENERIMA: recipientName,
        TANGGAL_DONASI: donationDate,
      });

      // Show success message
      setSuccessMessage("Donasi berhasil dikonfirmasi!");

      // Refresh data
      fetchHistories();

      // Close modal and reset form
      setIsModalOpen(false);
      setRecipientName("");
      setDonationDate("");

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error confirming donation:", error);
      setError("Gagal mengkonfirmasi donasi. Silakan coba lagi.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-8">History Donasi ke Organisasi</h1>

      {/* Success message */}
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {successMessage}
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-stone-600"></div>
        </div>
      ) : histories.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 p-4 rounded">
          Belum ada data donasi.
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                {[
                  "ID",
                  "Organisasi",
                  "Barang yang Didonasikan",
                  "Nama Penerima",
                  "Tanggal Donasi",
                  "Status",
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
              {histories.map((donasi) => (
                <tr key={donasi.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{donasi.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {donasi.organisasi}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <ul className="list-disc list-inside">
                      {donasi.barang && donasi.barang.length > 0 ? (
                        donasi.barang.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))
                      ) : (
                        <li>Tidak ada data barang</li>
                      )}
                    </ul>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {donasi.nama_penerima}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {donasi.tanggal_donasi}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        donasi.nama_penerima === "Belum ditentukan"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {donasi.nama_penerima === "Belum ditentukan"
                        ? "Belum Diterima"
                        : "Diterima"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleConfirmDonation(donasi)}
                      className={`px-3 py-2 rounded-md text-white ${
                        donasi.nama_penerima !== "Belum ditentukan"
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-blue-500 hover:bg-blue-600"
                      }`}
                      disabled={donasi.nama_penerima !== "Belum ditentukan"}
                    >
                      {donasi.nama_penerima !== "Belum ditentukan"
                        ? "Terkonfirmasi"
                        : "Konfirmasi Donasi"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for confirming donation */}
      {isModalOpen && selectedDonasi && (
        <div
          className="fixed inset-0 bg-gray-900/50 flex items-center justify-center z-50"
          onClick={(e) => e.target === e.currentTarget && setIsModalOpen(false)}
        >
          <div className="bg-white p-6 rounded-lg w-11/12 md:w-3/5">
            <h2 className="text-xl font-bold mb-4">
              Konfirmasi Donasi - {selectedDonasi.organisasi}
            </h2>
            <p className="mb-4 text-gray-700">
              Barang:{" "}
              {selectedDonasi.barang && selectedDonasi.barang.join(", ")}
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Nama Penerima <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Tanggal Donasi <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={donationDate}
                  onChange={(e) => setDonationDate(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="flex justify-end mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="mr-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-stone-600 text-white px-4 py-2 rounded-md hover:bg-stone-700"
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

export default HistoryDonasi;
