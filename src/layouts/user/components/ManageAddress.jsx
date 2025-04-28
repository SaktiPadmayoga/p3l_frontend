import { useState, useEffect } from "react";

export default function AddressManagement() {
  const [addresses, setAddresses] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(null);
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    postal_code: ""
  });

  // Mock user data - in a real app, this would come from authentication
  const user = {
    name: "John Doe",
    phone: "0812345678"
  };

  // Mock initial addresses - in a real app, these would come from an API
  useEffect(() => {
    setAddresses([
      {
        id: 1,
        address: "Jl. Merdeka No. 123",
        city: "Jakarta",
        postal_code: "12345"
      },
      {
        id: 2,
        address: "Jl. Pahlawan No. 456",
        city: "Surabaya",
        postal_code: "54321"
      }
    ]);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const openAddModal = () => {
    setFormData({
      address: "",
      city: "",
      postal_code: ""
    });
    setShowAddModal(true);
  };

  const openEditModal = (address) => {
    setCurrentAddress(address);
    setFormData({
      address: address.address,
      city: address.city,
      postal_code: address.postal_code
    });
    setShowEditModal(true);
  };

  const openDeleteModal = (address) => {
    setCurrentAddress(address);
    setShowDeleteModal(true);
  };

  const addAddress = (e) => {
    e.preventDefault();
    const newAddress = {
      id: Date.now(),
      ...formData
    };
    setAddresses([...addresses, newAddress]);
    setShowAddModal(false);
  };

  const updateAddress = (e) => {
    e.preventDefault();
    const updatedAddresses = addresses.map(addr => 
      addr.id === currentAddress.id ? { ...addr, ...formData } : addr
    );
    setAddresses(updatedAddresses);
    setShowEditModal(false);
  };

  const deleteAddress = (e) => {
    e.preventDefault();
    const filteredAddresses = addresses.filter(addr => addr.id !== currentAddress.id);
    setAddresses(filteredAddresses);
    setShowDeleteModal(false);
  };

  return (
    <div className=" mx-auto my-8 px-4">
      <div className=" p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Address</h2>
        
        <div className="space-y-4">
          {addresses.length > 0 ? (
            addresses.map((address) => (
              <div key={address.id} className="border border-teal-500 p-4 rounded-md bg-white mb-4">
                <div className="flex flex-col sm:flex-row">
                  <div className="flex-1">
                    <h5 className="font-medium">{user.name}</h5>
                    <p className="m-0 text-gray-700">{user.phone}</p>
                    <p className="text-gray-700">
                      {address.address}, {address.city}, {address.postal_code}
                    </p>
                    <div className="flex space-x-4 mt-2">
                      <button
                        className="text-blue-500"
                        onClick={() => openEditModal(address)}
                      >
                        Edit
                      </button>
                      <span className="block w-0.5 h-6 bg-black"></span>
                      <button
                        className="text-red-500"
                        onClick={() => openDeleteModal(address)}
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Tidak ada alamat yang tersedia.</p>
          )}
          
          <div className="flex justify-center">
            <button
              onClick={openAddModal}
              className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition"
            >
              + Add New Address
            </button>
          </div>
        </div>
      </div>

      {/* Add Address Modal */}
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-xl">
            <div className="bg-green-500 p-4 rounded-t-lg flex justify-between items-center">
              <h1 className="text-white text-lg font-medium">+ Add Address</h1>
              <button onClick={() => setShowAddModal(false)} className="text-white hover:text-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <form onSubmit={addAddress}>
                <div className="flex flex-wrap">
                  <div className="w-full p-4">
                    <div className="mb-4">
                      <label htmlFor="add_name" className="block mb-2 text-sm font-medium text-gray-700">Name</label>
                      <input
                        id="add_name"
                        type="text"
                        name="name"
                        className="w-full bg-gray-100 border rounded px-4 py-2"
                        value={user.name}
                        disabled
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="add_phone" className="block mb-2 text-sm font-medium text-gray-700">Phone</label>
                      <input
                        id="add_phone"
                        type="number"
                        className="w-full bg-gray-100 border rounded px-4 py-2"
                        value={user.phone}
                        disabled
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="add_address" className="block mb-2 text-sm font-medium text-gray-700">Address Detail</label>
                      <textarea
                        id="add_address"
                        name="address"
                        className="w-full border rounded px-4 py-2 h-24"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="add_city" className="block mb-2 text-sm font-medium text-gray-700">City</label>
                      <input
                        id="add_city"
                        type="text"
                        name="city"
                        className="w-full border rounded px-4 py-2"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="add_postal_code" className="block mb-2 text-sm font-medium text-gray-700">Postal Code</label>
                      <input
                        id="add_postal_code"
                        type="text"
                        name="postal_code"
                        className="w-full border rounded px-4 py-2"
                        value={formData.postal_code}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
                    >
                      Add Address
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Address Modal */}
      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
            <div className="bg-green-500 p-4 rounded-t-lg flex justify-between items-center">
              <h1 className="text-white text-lg font-medium">Edit Address</h1>
              <button onClick={() => setShowEditModal(false)} className="text-white hover:text-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <form onSubmit={updateAddress}>
                <div className="flex flex-wrap">
                  <div className="w-full p-4">
                    <div className="mb-4">
                      <label htmlFor="edit_name" className="block mb-2 text-sm font-medium text-gray-700">Name</label>
                      <input
                        id="edit_name"
                        type="text"
                        name="name"
                        className="w-full bg-gray-100 border rounded px-4 py-2"
                        value={user.name}
                        disabled
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="edit_phone" className="block mb-2 text-sm font-medium text-gray-700">Phone</label>
                      <input
                        id="edit_phone"
                        type="number"
                        className="w-full bg-gray-100 border rounded px-4 py-2"
                        value={user.phone}
                        disabled
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="edit_address" className="block mb-2 text-sm font-medium text-gray-700">Address Detail</label>
                      <textarea
                        id="edit_address"
                        name="address"
                        className="w-full border rounded px-4 py-2 h-24"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="edit_city" className="block mb-2 text-sm font-medium text-gray-700">City</label>
                      <input
                        id="edit_city"
                        type="text"
                        name="city"
                        className="w-full border rounded px-4 py-2"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="edit_postal_code" className="block mb-2 text-sm font-medium text-gray-700">Postal Code</label>
                      <input
                        id="edit_postal_code"
                        type="text"
                        name="postal_code"
                        className="w-full border rounded px-4 py-2"
                        value={formData.postal_code}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Address Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="bg-green-500 p-4 rounded-t-lg">
              <h1 className="text-white text-lg font-medium">Delete Address</h1>
            </div>
            <div className="p-6">
              <form onSubmit={deleteAddress}>
                <p className="text-center text-gray-700 mb-6">Apakah Anda yakin ingin menghapus alamat ini?</p>
                <div className="flex justify-between mt-6">
                  <button
                    type="button"
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
                    onClick={() => setShowDeleteModal(false)}
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}