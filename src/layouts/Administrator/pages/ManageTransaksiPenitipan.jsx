import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageTransaksiPenitipan = () => {
  const [transaksiPenitipans, setTransaksiPenitipans] = useState([]);
  const [penitips, setPenitips] = useState([]);
  const [hunters, setHunters] = useState([]);
  const [qcEmployees, setQcEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [penitipSearch, setPenitipSearch] = useState("");
  const [hunterSearch, setHunterSearch] = useState("");
  const [qcSearch, setQcSearch] = useState("");
  const [modalMode, setModalMode] = useState(null); // null, 'add', 'edit'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transaksiPenitipan, setTransaksiPenitipan] = useState({
    ID_PENITIPAN: "",
    ID_PENITIP: "",
    NAMA_PENITIP: "",
    ID_PEGAWAI_HUNTER: "",
    NAMA_PEGAWAI_HUNTER: "",
    ID_PEGAWAI_QC: "",
    NAMA_PEGAWAI_QC: "",
    TANGGAL_PENITIPAN: "",
    TOTAL_NILAI_BARANG: null,
    CATATAN: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTransaksiPenitipans();
    fetchPenitips();
    fetchHunters();
    fetchQcEmployees();
  }, []);

  const fetchTransaksiPenitipans = () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8000/api/gudang/manage-transaksi-penitipan", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
      .then((response) => {
        if (Array.isArray(response.data)) {
          setTransaksiPenitipans(response.data);
          setError("");
        } else {
          setError("Invalid data format.");
        }
      })
      .catch((error) => {
        setError(`Failed to fetch transactions: ${error.message}`);
      })
      .finally(() => setLoading(false));
  };

  const fetchPenitips = () => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8000/api/gudang/manage-penitip", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
      .then((response) => {
        if (Array.isArray(response.data)) {
          setPenitips(response.data);
        } else {
          setError("Invalid penitip data format.");
        }
      })
      .catch((error) => {
        setError(`Failed to fetch penitips: ${error.message}`);
      });
  };

  const fetchHunters = () => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8000/api/gudang/employees/hunter", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
      .then((response) => {
        if (Array.isArray(response.data)) {
          setHunters(response.data);
        } else {
          setError("Invalid hunter data format.");
        }
      })
      .catch((error) => {
        setError(`Failed to fetch hunters: ${error.message}`);
      });
  };

  const fetchQcEmployees = () => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8000/api/gudang/employees/gudang", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
      .then((response) => {
        if (Array.isArray(response.data)) {
          setQcEmployees(response.data);
        } else {
          setError("Invalid QC employee data format.");
        }
      })
      .catch((error) => {
        setError(`Failed to fetch QC employees: ${error.message}`);
      });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePenitipSearch = (e) => {
    setPenitipSearch(e.target.value);
  };

  const handleHunterSearch = (e) => {
    setHunterSearch(e.target.value);
  };

  const handleQcSearch = (e) => {
    setQcSearch(e.target.value);
  };

  const filteredTransaksiPenitipans = transaksiPenitipans.filter((t) =>
    t.NO_NOTA_PENITIPAN?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPenitips = penitips.filter((p) =>
    p.NAMA?.toLowerCase().includes(penitipSearch.toLowerCase())
  );

  const filteredHunters = hunters.filter((h) =>
    h.NAMA?.toLowerCase().includes(hunterSearch.toLowerCase())
  );

  const filteredQcEmployees = qcEmployees.filter((q) =>
    q.NAMA?.toLowerCase().includes(qcSearch.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransaksiPenitipan({ ...transaksiPenitipan, [name]: value });
  };

  const selectPenitip = (penitip) => {
    setTransaksiPenitipan({
      ...transaksiPenitipan,
      ID_PENITIP: penitip.ID_PENITIP,
      NAMA_PENITIP: penitip.NAMA,
    });
    setPenitipSearch("");
  };

  const selectHunter = (hunter) => {
    setTransaksiPenitipan({
      ...transaksiPenitipan,
      ID_PEGAWAI_HUNTER: hunter.ID_PEGAWAI,
      NAMA_PEGAWAI_HUNTER: hunter.NAMA,
    });
    setHunterSearch("");
  };

  const selectQcEmployee = (qc) => {
    setTransaksiPenitipan({
      ...transaksiPenitipan,
      ID_PEGAWAI_QC: qc.ID_PEGAWAI,
      NAMA_PEGAWAI_QC: qc.NAMA,
    });
    setQcSearch("");
  };

  const openModal = (mode, data = null) => {
    setModalMode(mode);
    if (mode === "edit" && data) {
      // Find names for penitip, hunter, and QC
      const penitip = penitips.find((p) => p.ID_PENITIP === data.ID_PENITIP);
      const hunter = hunters.find(
        (h) => h.ID_PEGAWAI === data.ID_PEGAWAI_HUNTER
      );
      const qc = qcEmployees.find((q) => q.ID_PEGAWAI === data.ID_PEGAWAI_QC);

      setTransaksiPenitipan({
        ID_PENITIPAN: data.ID_PENITIPAN,
        ID_PENITIP: data.ID_PENITIP,
        NAMA_PENITIP: penitip ? penitip.NAMA : "",
        ID_PEGAWAI_HUNTER: data.ID_PEGAWAI_HUNTER,
        NAMA_PEGAWAI_HUNTER: hunter ? hunter.NAMA : "",
        ID_PEGAWAI_QC: data.ID_PEGAWAI_QC,
        NAMA_PEGAWAI_QC: qc ? qc.NAMA : "",
        TANGGAL_PENITIPAN: data.TANGGAL_PENITIPAN,
        TOTAL_NILAI_BARANG: data.TOTAL_NILAI_BARANG,
        CATATAN: data.CATATAN,
      });
    } else {
      setTransaksiPenitipan({
        ID_PENITIPAN: "",
        ID_PENITIP: "",
        NAMA_PENITIP: "",
        ID_PEGAWAI_HUNTER: "",
        NAMA_PEGAWAI_HUNTER: "",
        ID_PEGAWAI_QC: "",
        NAMA_PEGAWAI_QC: "",
        TANGGAL_PENITIPAN: "",
        TOTAL_NILAI_BARANG: null,
        CATATAN: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    if (!confirm(`${modalMode === "add" ? "Add" : "Edit"} this transaction?`))
      return;

    const token = localStorage.getItem("token");
    const url =
      modalMode === "add"
        ? "http://localhost:8000/api/gudang/manage-transaksi-penitipan"
        : `http://localhost:8000/api/gudang/manage-transaksi-penitipan/${transaksiPenitipan.ID_PENITIPAN}`;
    const method = modalMode === "add" ? "post" : "put";

    axios({
      method,
      url,
      data: {
        ID_PENITIP: transaksiPenitipan.ID_PENITIP,
        ID_PEGAWAI_HUNTER: transaksiPenitipan.ID_PEGAWAI_HUNTER,
        ID_PEGAWAI_QC: transaksiPenitipan.ID_PEGAWAI_QC,
        TANGGAL_PENITIPAN: transaksiPenitipan.TANGGAL_PENITIPAN,
        CATATAN: transaksiPenitipan.CATATAN,
      },
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        fetchTransaksiPenitipans();
        setIsModalOpen(false);
        setError("");
      })
      .catch((error) => {
        setError(
          `Failed to ${modalMode === "add" ? "add" : "edit"} transaction: ${
            error.message
          }`
        );
      });
  };

  const handleDelete = (id) => {
    if (!confirm("Delete this transaction?")) return;

    const token = localStorage.getItem("token");
    axios
      .delete(
        `http://localhost:8000/api/gudang/manage-transaksi-penitipan/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      )
      .then(() => {
        setTransaksiPenitipans(
          transaksiPenitipans.filter((tr) => tr.ID_PENITIPAN !== id)
        );
        setError("");
      })
      .catch((error) => {
        setError(`Failed to delete transaction: ${error.message}`);
      });
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-10">Manage Transaksi Penitipan</h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-6">{error}</div>
      )}

      <div className="flex justify-between mb-6">
        <input
          type="text"
          placeholder="Cari No Nota..."
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 border border-gray-300 rounded-md w-1/3"
        />
        <button
          onClick={() => openModal("add")}
          className="bg-stone-600 text-white px-4 py-3 text-lg rounded-md hover:bg-stone-700"
        >
          + Tambah Transaksi
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
                  "ID",
                  "ID Penitip",
                  "ID Pegawai Hunter",
                  "ID Pegawai QC",
                  "No Nota",
                  "Tanggal",
                  "Total Nilai",
                  "Catatan",
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
              {filteredTransaksiPenitipans.map((t) => (
                <tr key={t.ID_PENITIPAN}>
                  <td className="px-6 py-4">{t.ID_PENITIPAN}</td>
                  <td className="px-6 py-4">{t.ID_PENITIP}</td>
                  <td className="px-6 py-4">{t.ID_PEGAWAI_HUNTER}</td>
                  <td className="px-6 py-4">{t.ID_PEGAWAI_QC}</td>
                  <td className="px-6 py-4">{t.NO_NOTA_PENITIPAN}</td>
                  <td className="px-6 py-4">{t.TANGGAL_PENITIPAN}</td>
                  <td className="px-6 py-4">
                    {t.TOTAL_NILAI_BARANG
                      ? `Rp${parseInt(t.TOTAL_NILAI_BARANG).toLocaleString()}`
                      : "-"}
                  </td>
                  <td className="px-6 py-4">{t.CATATAN}</td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-4">
                      <button
                        className="text-blue-500 hover:text-blue-600"
                        onClick={() => openModal("edit", t)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-500 hover:text-red-600"
                        onClick={() => handleDelete(t.ID_PENITIPAN)}
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
              {modalMode === "add" ? "Tambah" : "Edit"} Transaksi Penitipan
            </h2>
            <form>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Nama Penitip
                  </label>
                  <input
                    type="text"
                    placeholder="Cari nama penitip..."
                    value={penitipSearch}
                    onChange={handlePenitipSearch}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  {penitipSearch && (
                    <div className="absolute bg-white border border-gray-300 rounded-md mt-1 w-full max-h-40 overflow-y-auto">
                      {filteredPenitips.map((p) => (
                        <div
                          key={p.ID_PENITIP}
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => selectPenitip(p)}
                        >
                          {p.NAMA}
                        </div>
                      ))}
                    </div>
                  )}
                  {transaksiPenitipan.NAMA_PENITIP && (
                    <p className="text-sm text-gray-600 mt-1">
                      Selected: {transaksiPenitipan.NAMA_PENITIP}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    ID Penitip
                  </label>
                  <input
                    type="text"
                    name="ID_PENITIP"
                    value={transaksiPenitipan.ID_PENITIP}
                    readOnly
                    className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Nama Pegawai Hunter
                  </label>
                  <input
                    type="text"
                    placeholder="Cari nama hunter..."
                    value={hunterSearch}
                    onChange={handleHunterSearch}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  {hunterSearch && (
                    <div className="absolute bg-white border border-gray-300 rounded-md mt-1 w-full max-h-40 overflow-y-auto">
                      {filteredHunters.map((h) => (
                        <div
                          key={h.ID_PEGAWAI}
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => selectHunter(h)}
                        >
                          {h.NAMA}
                        </div>
                      ))}
                    </div>
                  )}
                  {transaksiPenitipan.NAMA_PEGAWAI_HUNTER && (
                    <p className="text-sm text-gray-600 mt-1">
                      Selected: {transaksiPenitipan.NAMA_PEGAWAI_HUNTER}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    ID Pegawai Hunter
                  </label>
                  <input
                    type="text"
                    name="ID_PEGAWAI_HUNTER"
                    value={transaksiPenitipan.ID_PEGAWAI_HUNTER}
                    readOnly
                    className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Nama Pegawai QC
                  </label>
                  <input
                    type="text"
                    placeholder="Cari nama QC..."
                    value={qcSearch}
                    onChange={handleQcSearch}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  {qcSearch && (
                    <div className="absolute bg-white border border-gray-300 rounded-md mt-1 w-full max-h-40 overflow-y-auto">
                      {filteredQcEmployees.map((q) => (
                        <div
                          key={q.ID_PEGAWAI}
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => selectQcEmployee(q)}
                        >
                          {q.NAMA}
                        </div>
                      ))}
                    </div>
                  )}
                  {transaksiPenitipan.NAMA_PEGAWAI_QC && (
                    <p className="text-sm text-gray-600 mt-1">
                      Selected: {transaksiPenitipan.NAMA_PEGAWAI_QC}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    ID Pegawai QC
                  </label>
                  <input
                    type="text"
                    name="ID_PEGAWAI_QC"
                    value={transaksiPenitipan.ID_PEGAWAI_QC}
                    readOnly
                    className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Tanggal Penitipan
                  </label>
                  <input
                    type="date"
                    name="TANGGAL_PENITIPAN"
                    value={transaksiPenitipan.TANGGAL_PENITIPAN}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">
                    Catatan
                  </label>
                  <textarea
                    name="CATATAN"
                    value={transaksiPenitipan.CATATAN}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
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

export default ManageTransaksiPenitipan;