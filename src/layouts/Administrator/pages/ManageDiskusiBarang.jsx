import React, { useState, useEffect } from "react";
import axios from "axios";
import AuthService from "../../../services/authService";

const ManageDiskusiProduk = () => {
  const [discussions, setDiscussions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDiscussionId, setCurrentDiscussionId] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [productFilter, setProductFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [error, setError] = useState("");

  const API_URL = "http://localhost:8000/api/cs/product-discussions";
  const token = localStorage.getItem("token");
  const user = AuthService.getCurrentUser();

  useEffect(() => {
    fetchDiscussions();
  }, []);

  const fetchDiscussions = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Fetched discussions:", response.data); // Debug log
      setDiscussions(response.data);
      setError("");
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Failed to fetch discussions. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleProductFilter = (e) => {
    setProductFilter(e.target.value);
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const filteredDiscussions = discussions
    .filter((d) => {
      const searchMatch =
        (d.PESAN_DISKUSI || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (d.NAMA_PRODUK || "").toLowerCase().includes(searchTerm.toLowerCase());
      const productMatch =
        productFilter === "" ||
        (d.NAMA_PRODUK || "")
          .toLowerCase()
          .includes(productFilter.toLowerCase());
      const statusMatch =
        statusFilter === "all" ||
        (statusFilter === "replied" && d.STATUS_BALASAN === "Sudah Dibalas") ||
        (statusFilter === "notReplied" && d.STATUS_BALASAN === "Belum Dibalas");
      return searchMatch && productMatch && statusMatch;
    })
    .sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.TANGGAL_DISKUSI) - new Date(a.TANGGAL_DISKUSI);
      } else if (sortBy === "oldest") {
        return new Date(a.TANGGAL_DISKUSI) - new Date(b.TANGGAL_DISKUSI);
      } else if (sortBy === "productName") {
        return (a.NAMA_PRODUK || "").localeCompare(b.NAMA_PRODUK || "");
      } else if (sortBy === "status") {
        return (a.STATUS_BALASAN || "").localeCompare(b.STATUS_BALASAN || "");
      }
      return 0;
    });

  const handleReplyChange = (e) => {
    setReplyText(e.target.value);
  };

  const handleOpenReplyModal = (discussion) => {
    setCurrentDiscussionId(discussion.ID_DISKUSI);
    setReplyText(discussion.BALASAN || "");
    setIsModalOpen(true);
  };

  const handleSubmitReply = async () => {
    if (!replyText.trim()) {
      setError("Reply cannot be empty");
      return;
    }

    try {
      const payload = {
        BALASAN: replyText,
        TANGGAL_BALASAN: new Date().toISOString().split("T")[0],
        ID_CS: user.id,
      };

      const response = await axios.put(
        `${API_URL}/${currentDiscussionId}/reply`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setDiscussions(
        discussions.map((disc) =>
          disc.ID_DISKUSI === currentDiscussionId
            ? {
                ...disc,
                BALASAN: replyText,
                TANGGAL_BALASAN: payload.TANGGAL_BALASAN,
                STATUS_BALASAN: "Sudah Dibalas",
                NAMA_CS: user.nama || "CS",
              }
            : disc
        )
      );

      setIsModalOpen(false);
      setReplyText("");
      setError("");
    } catch (err) {
      setError(
        err.response?.data?.error || "Failed to submit reply. Please try again."
      );
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-10">Manajemen Diskusi Produk</h1>

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded mb-4">{error}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div>
          <input
            type="text"
            placeholder="Cari diskusi atau produk..."
            value={searchTerm}
            onChange={handleSearch}
            className="p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Filter berdasarkan produk"
            value={productFilter}
            onChange={handleProductFilter}
            className="p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div>
          <select
            value={statusFilter}
            onChange={handleStatusFilter}
            className="p-2 border border-gray-300 rounded-md w-full"
          >
            <option value="all">Semua Status</option>
            <option value="replied">Sudah Dibalas</option>
            <option value="notReplied">Belum Dibalas</option>
          </select>
        </div>
        <div>
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="p-2 border border-gray-300 rounded-md w-full"
          >
            <option value="newest">Terbaru</option>
            <option value="oldest">Terlama</option>
            <option value="productName">Nama Produk</option>
            <option value="status">Status</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-olive-700"></div>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow mt-10">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                {[
                  "ID",
                  "Produk",
                  "Pelanggan",
                  "Pesan Diskusi",
                  "Tanggal Diskusi",
                  "Status",
                  "Balasan",
                  "Tanggal Balasan",
                  "CS",
                  "Aksi",
                ].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-4 bg-olive-500 text-lg font-medium text-white uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDiscussions.length > 0 ? (
                filteredDiscussions.map((disc) => (
                  <tr key={disc.ID_DISKUSI}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {disc.ID_DISKUSI}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {disc.NAMA_PRODUK || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {disc.NAMA_PELANGGAN || "Customer #" + disc.ID_PEMBELI}
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs overflow-hidden text-ellipsis">
                        {disc.PESAN_DISKUSI || "-"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatDate(disc.TANGGAL_DISKUSI)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          disc.STATUS_BALASAN === "Sudah Dibalas"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {disc.STATUS_BALASAN || "-"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs overflow-hidden text-ellipsis">
                        {disc.BALASAN || "-"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatDate(disc.TANGGAL_BALASAN) || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {disc.NAMA_CS || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        className="bg-olive-500 text-white px-3 py-1 rounded-md hover:bg-olive-900"
                        onClick={() => handleOpenReplyModal(disc)}
                      >
                        {disc.STATUS_BALASAN === "Sudah Dibalas"
                          ? "Edit Balasan"
                          : "Balas"}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="10"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    Tidak ada diskusi yang ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-2/3">
            <h2 className="text-xl font-bold mb-4">Balas Diskusi Produk</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmitReply();
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Diskusi Pelanggan
                </label>
                <div className="p-3 bg-gray-100 rounded-md">
                  {discussions.find((d) => d.ID_DISKUSI === currentDiscussionId)
                    ?.PESAN_DISKUSI || "-"}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Balasan Anda
                </label>
                <textarea
                  value={replyText}
                  onChange={handleReplyChange}
                  rows="5"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Ketik balasan untuk diskusi pelanggan ini..."
                />
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
                  type="submit"
                  className="bg-olive-500 text-white px-4 py-2 rounded-md hover:bg-olive-900"
                  disabled={!replyText.trim()}
                >
                  Kirim Balasan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageDiskusiProduk;
