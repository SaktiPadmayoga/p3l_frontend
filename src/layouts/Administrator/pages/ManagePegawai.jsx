import React, { useState, useEffect, useCallback } from "react";
import axiosInstance from "../../../utils/axiosInstance";

const ManagePegawai = () => {
  const [employees, setEmployees] = useState([]);
  const [jobPositions, setJobPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    status: "active",
    password: "",
    idJabatan: "",
  });
  const [editingEmployeeId, setEditingEmployeeId] = useState(null);
  const [loadError, setLoadError] = useState(null);

  // Function to fetch job positions - memoized with useCallback
  const fetchJobPositions = useCallback(async () => {
    try {
      setLoadError(null);
      console.log("Fetching job positions...");
      const response = await axiosInstance.get("/admin/manage-jabatan");
      console.log("Job positions fetched:", response.data);
      setJobPositions(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching job positions:", error);
      setLoadError("Failed to load job positions. Please try again.");
      return [];
    }
  }, []);

  // Function to fetch employees data - memoized with useCallback
  const fetchEmployees = useCallback(async () => {
    try {
      setLoading(true);
      setLoadError(null);
      console.log("Fetching employees...");

      const response = await axiosInstance.get("/admin/manage-pegawai");
      console.log("Employees fetched:", response.data);

      // Get job positions if not already loaded
      let positions = jobPositions;
      if (positions.length === 0) {
        positions = await fetchJobPositions();
      }

      // Create a map for faster lookup
      const jobPositionsMap = {};
      positions.forEach((position) => {
        jobPositionsMap[position.ID_JABATAN] = position.NAMA;
      });

      // Map job position names to employees
      const employeesWithJabatan = response.data.map((employee) => ({
        ...employee,
        JABATAN: jobPositionsMap[employee.ID_JABATAN] || "Unknown Position",
      }));

      setEmployees(employeesWithJabatan);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching employees:", error);
      setLoadError("Failed to load employee data. Please try again.");
      setLoading(false);
    }
  }, [jobPositions, fetchJobPositions]);

  useEffect(() => {
    // Separate useEffect for job positions
    const loadJobPositions = async () => {
      await fetchJobPositions();
    };

    loadJobPositions();
  }, [fetchJobPositions]);

  useEffect(() => {
    // Separate useEffect for employees
    const loadEmployees = async () => {
      // Only fetch employees if job positions are loaded
      if (jobPositions.length > 0) {
        await fetchEmployees();
      }
    };

    loadEmployees();
  }, [jobPositions, fetchEmployees]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.NAMA.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({
      ...newEmployee,
      [name]: value,
    });
  };

  const handleAddEmployee = async (e) => {
    if (e) e.preventDefault();

    // Validation
    if (!newEmployee.name || !newEmployee.email || !newEmployee.idJabatan) {
      alert("Name, Email, and Job Position are required");
      return;
    }

    try {
      setLoading(true);
      console.log("Adding new employee:", newEmployee);

      await axiosInstance.post("/admin/manage-pegawai", {
        NAMA: newEmployee.name,
        EMAIL: newEmployee.email,
        TELEPON: newEmployee.phone,
        ALAMAT: newEmployee.address,
        STATUS: newEmployee.status,
        PASSWORD: newEmployee.password,
        ID_JABATAN: newEmployee.idJabatan,
      });

      console.log("Employee added successfully");
      alert("Employee added successfully!");
      await fetchEmployees();
      resetForm();
    } catch (error) {
      console.error("Error adding employee:", error);
      alert("Failed to add employee. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateEmployee = async (e) => {
    if (e) e.preventDefault();

    // Validation
    if (!newEmployee.name || !newEmployee.email || !newEmployee.idJabatan) {
      alert("Name, Email, and Job Position are required");
      return;
    }

    try {
      setLoading(true);
      console.log("Updating employee:", editingEmployeeId, newEmployee);

      const updateData = {
        NAMA: newEmployee.name,
        EMAIL: newEmployee.email,
        TELEPON: newEmployee.phone,
        ALAMAT: newEmployee.address,
        STATUS: newEmployee.status,
        ID_JABATAN: newEmployee.idJabatan,
      };

      // Only include password if it's provided
      if (newEmployee.password) {
        updateData.PASSWORD = newEmployee.password;
      }

      await axiosInstance.put(
        `/admin/manage-pegawai/${editingEmployeeId}`,
        updateData
      );

      console.log("Employee updated successfully");
      alert("Employee updated successfully!");
      await fetchEmployees();
      resetForm();
    } catch (error) {
      console.error("Error updating employee:", error);
      alert("Failed to update employee. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEmployee = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        console.log("Deleting employee:", id);
        await axiosInstance.delete(`/admin/manage-pegawai/${id}`);
        setEmployees(employees.filter((e) => e.ID_PEGAWAI !== id));
        console.log("Employee deleted successfully");
        alert("Employee deleted successfully!");
      } catch (error) {
        console.error("Error deleting employee:", error);
        alert("Failed to delete employee. Please try again.");
      }
    }
  };

  const resetForm = () => {
    setNewEmployee({
      name: "",
      email: "",
      phone: "",
      address: "",
      status: "active",
      password: "",
      idJabatan: "",
    });
    setEditingEmployeeId(null);
    setIsModalOpen(false);
  };

  // Function to handle opening the modal
  const openModal = () => {
    console.log("Opening modal - current state:", isModalOpen);
    setIsModalOpen(true);
    console.log("Modal state set to true");

    // Force a re-render if necessary
    setTimeout(() => {
      console.log("Checking modal state after timeout:", isModalOpen);
    }, 100);
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-10">Manage Pegawai</h1>

      {/* Error message display */}
      {loadError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{loadError}</p>
          <button
            onClick={() => {
              setLoadError(null);
              fetchJobPositions().then(() => fetchEmployees());
            }}
            className="ml-2 font-bold underline"
          >
            Retry
          </button>
        </div>
      )}

      {/* Search and Add */}
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Cari pegawai..."
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 border border-gray-300 rounded-md w-1/3"
        />
        {/* Using div instead of button for better click handling */}
        <div
          role="button"
          onClick={openModal}
          onKeyDown={(e) => e.key === "Enter" && openModal()}
          tabIndex={0}
          className="bg-teal-600 text-white px-4 py-3 text-lg rounded-md hover:bg-teal-700 cursor-pointer flex items-center justify-center"
        >
          + Tambah Pegawai
        </div>
      </div>

      {/* Tabel Pegawai */}
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-teal-600"></div>
          <p className="ml-3">Loading data...</p>
        </div>
      ) : (
        <div className="overflow-hidden sm:rounded-lg bg-white shadow mt-10">
          <table className="min-w-full divide-y divide-gray-200 rounded-2xl shadow">
            <thead>
              <tr>
                {[
                  "ID",
                  "Nama",
                  "No. Telepon",
                  "Alamat",
                  "Email",
                  "Status",
                  "Jabatan",
                  "Aksi",
                ].map((head) => (
                  <th
                    key={head}
                    className="px-6 py-3 bg-teal-600 text-md leading-4 font-medium text-white uppercase tracking-wider"
                  >
                    <div className="flex cursor-pointer">
                      <span className="mr-2">{head}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((employee) => (
                  <tr key={employee.ID_PEGAWAI}>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                      {employee.ID_PEGAWAI}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                      {employee.NAMA}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                      {employee.TELEPON}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                      {employee.ALAMAT}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                      {employee.EMAIL}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                      {employee.STATUS}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                      {employee.JABATAN}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex space-x-4">
                        <button
                          onClick={() => {
                            setNewEmployee({
                              name: employee.NAMA,
                              email: employee.EMAIL,
                              phone: employee.TELEPON,
                              address: employee.ALAMAT,
                              status: employee.STATUS,
                              password: "",
                              idJabatan: employee.ID_JABATAN,
                            });
                            setEditingEmployeeId(employee.ID_PEGAWAI);
                            setIsModalOpen(true);
                          }}
                          className="text-blue-500 hover:text-blue-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() =>
                            handleDeleteEmployee(employee.ID_PEGAWAI)
                          }
                          className="text-red-500 hover:text-red-600"
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
                    No employees found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Tambah/Edit Pegawai - Using React.createPortal would be better */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-gray-900/50 flex items-center justify-center z-50"
          onClick={(e) => {
            // Close modal if clicking the backdrop
            if (e.target === e.currentTarget) {
              setIsModalOpen(false);
            }
          }}
        >
          <div className="bg-white p-6 rounded-lg w-11/12 md:w-1/3">
            <h2 className="text-xl font-bold mb-4">
              {editingEmployeeId ? "Edit Pegawai" : "Tambah Pegawai"}
            </h2>
            <form
              onSubmit={
                editingEmployeeId ? handleUpdateEmployee : handleAddEmployee
              }
            >
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Nama <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={newEmployee.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={newEmployee.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  No. Telepon
                </label>
                <input
                  type="text"
                  name="phone"
                  value={newEmployee.phone}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Alamat</label>
                <input
                  type="text"
                  name="address"
                  value={newEmployee.address}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  name="status"
                  value={newEmployee.status}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Jabatan <span className="text-red-500">*</span>
                </label>
                <select
                  name="idJabatan"
                  value={newEmployee.idJabatan}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select Jabatan</option>
                  {jobPositions.map((jabatan) => (
                    <option key={jabatan.ID_JABATAN} value={jabatan.ID_JABATAN}>
                      {jabatan.NAMA}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Password{" "}
                  {!editingEmployeeId && (
                    <span className="text-red-500">*</span>
                  )}
                </label>
                <input
                  type="password"
                  name="password"
                  value={newEmployee.password}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required={!editingEmployeeId}
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 text-black px-4 py-2 rounded-md mr-2 hover:bg-gray-400 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 cursor-pointer"
                >
                  {editingEmployeeId ? "Update" : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePegawai;
