import React, { useState, useEffect } from 'react';

const ManagePegawai = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    email: '',
    phone: '',
    salary: '',
    role: '',
  });

  useEffect(() => {
    // Simulasi fetch data pegawai
    setTimeout(() => {
      setEmployees([
        { id: 1, name: 'Budi Santoso', position: 'Manager', email: 'budi@example.com', phone: '081234567890', salary: 'Rp 10.000.000' },
        { id: 2, name: 'Siti Aisyah', position: 'Kasir', email: 'siti@example.com', phone: '081234567891', salary: 'Rp 5.000.000' },
        { id: 3, name: 'Rudi Hartono', position: 'Gudang', email: 'rudi@example.com', phone: '081234567892', salary: 'Rp 6.000.000' },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({
      ...newEmployee,
      [name]: value,
    });
  };

  const handleAddEmployee = () => {
    const newId = employees.length + 1;
    const employeeToAdd = {
      id: newId,
      name: newEmployee.name,
      position: newEmployee.role,
      email: newEmployee.email,
      phone: newEmployee.phone,
      salary: newEmployee.salary,
    };
    setEmployees([...employees, employeeToAdd]);
    setIsModalOpen(false);
    setNewEmployee({
      name: '',
      email: '',
      phone: '',
      salary: '',
      role: '',
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Pegawai</h1>

      {/* Search Bar dan Tombol Tambah Pegawai */}
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Cari pegawai..."
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 border border-gray-300 rounded-md w-1/3"
        />
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600"
        >
          Tambah Pegawai
        </button>
      </div>

      {/* Tabel Pegawai */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">ID</th>
              <th className="border border-gray-300 p-2">Nama</th>
              <th className="border border-gray-300 p-2">Jabatan</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">No. Telepon</th>
              <th className="border border-gray-300 p-2">Gaji</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => (
              <tr key={employee.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 p-2 text-center">{employee.id}</td>
                <td className="border border-gray-300 p-2">{employee.name}</td>
                <td className="border border-gray-300 p-2">{employee.position}</td>
                <td className="border border-gray-300 p-2">{employee.email}</td>
                <td className="border border-gray-300 p-2">{employee.phone}</td>
                <td className="border border-gray-300 p-2">{employee.salary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal Tambah Pegawai */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Tambah Pegawai</h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Nama</label>
                <input
                  type="text"
                  name="name"
                  value={newEmployee.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={newEmployee.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">No. Telepon</label>
                <input
                  type="text"
                  name="phone"
                  value={newEmployee.phone}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Gaji</label>
                <input
                  type="text"
                  name="salary"
                  value={newEmployee.salary}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Role</label>
                <input
                  type="text"
                  name="role"
                  value={newEmployee.role}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 text-black px-4 py-2 rounded-md mr-2 hover:bg-gray-400"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleAddEmployee}
                  className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600"
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

export default ManagePegawai;