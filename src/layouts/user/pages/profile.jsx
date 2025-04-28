import { useState } from 'react';
import { User, Home, ShoppingBag, Heart, Clock, Settings, Bell } from 'lucide-react';
import AddressManagement from '../components/profile-manage-address';

export default function Profile() {
  const [activeTab, setActiveTab] = useState('profile');
  
  return (
    <div className="flex h-[80vh] rounded-2xl bg-gray-50 mx-16 mt-28">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg rounded-l-2xl">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-teal-600">User Profile</h1>
        </div>
        <div className="px-2">
          <SidebarItem 
            icon={<User size={24} />} 
            text="User Info" 
            active={activeTab === 'profile'} 
            onClick={() => setActiveTab('profile')}
          />
          <SidebarItem 
            icon={<Home size={24} />} 
            text="Address" 
            active={activeTab === 'address'} 
            onClick={() => setActiveTab('address')}
          />
          <SidebarItem 
            icon={<ShoppingBag size={24} />} 
            text="Transactions" 
            active={activeTab === 'transactions'} 
            onClick={() => setActiveTab('transactions')}
          />
          <SidebarItem 
            icon={<Bell size={24} />} 
            text="Notifications" 
            active={activeTab === 'notifications'} 
            onClick={() => setActiveTab('notifications')}
          />
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-8">
        {activeTab === 'profile' && <ProfilePage />}
        {activeTab === 'address' && <AddressPage />}
        {activeTab === 'transactions' && <TransactionsPage />}
        {activeTab === 'notifications' && <PlaceholderPage title="Notifications" />}
      </div>
    </div>
  );
}

function SidebarItem({ icon, text, active, onClick }) {
  return (
    <div 
      className={`flex items-center text-xl p-3 mb-2 rounded-lg cursor-pointer ${active ? 'bg-teal-50 text-teal-600 font-medium' : 'text-gray-500 hover:bg-gray-100'}`}
      onClick={onClick}
    >
      <div className="mr-3">{icon}</div>
      <span>{text}</span>
      {active && <div className="ml-auto w-1 h-6 bg-teal-600 rounded"></div>}
    </div>
  );
}

function ProfilePage() {
  return (
    <div>
      <div className="flex items-center mb-10">
        <div className="relative">
          <img 
            src="/api/placeholder/150/150" 
            alt="Profile" 
            className="w-24 h-24 rounded-full object-cover"
          />
          <button className="absolute bottom-0 right-0 bg-teal-500 text-white p-1 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
        </div>
        <div className="ml-6">
          <h2 className="text-2xl font-bold">Sara Tancredi</h2>
          <p className="text-gray-500">New York, USA</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm text-gray-500 mb-1">Name</label>
          <input 
            type="text" 
            className="w-full p-3 border rounded-lg" 
            value="Sara" 
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">Full Name</label>
          <input 
            type="text" 
            className="w-full p-3 border rounded-lg" 
            value="Tancredi" 
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">Email Address</label>
          <input 
            type="email" 
            className="w-full p-3 border rounded-lg" 
            value="Sara.Tancredi@gmail.com" 
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">Phone Number</label>
          <input 
            type="text" 
            className="w-full p-3 border rounded-lg" 
            value="(+98) 9123728167" 
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">Location</label>
          <input 
            type="text" 
            className="w-full p-3 border rounded-lg" 
            value="New York, USA" 
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">Postal Code</label>
          <input 
            type="text" 
            className="w-full p-3 border rounded-lg" 
            value="23728167" 
            readOnly
          />
        </div>
      </div>
      
      <div className="mt-8">
        <button className="bg-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700">
          Save Changes
        </button>
      </div>
    </div>
  );
}

function AddressPage() {
  return (
    <div>
      <AddressManagement />
    </div>
  );
}

function TransactionsPage() {
  const transactions = [
    { 
      id: 1, 
      date: '2025-04-15', 
      description: 'Online Purchase', 
      amount: '$129.99', 
      status: 'Completed',
      paymentMethod: 'Credit Card'
    },
    { 
      id: 2, 
      date: '2025-04-10', 
      description: 'Subscription Renewal', 
      amount: '$9.99', 
      status: 'Completed',
      paymentMethod: 'PayPal'
    },
    { 
      id: 3, 
      date: '2025-04-05', 
      description: 'Mobile Phone Case', 
      amount: '$24.99', 
      status: 'Processing',
      paymentMethod: 'Credit Card'
    },
    { 
      id: 4, 
      date: '2025-03-30', 
      description: 'Annual Membership', 
      amount: '$99.00', 
      status: 'Completed',
      paymentMethod: 'Bank Transfer'
    },
    { 
      id: 5, 
      date: '2025-03-22', 
      description: 'Wireless Headphones', 
      amount: '$149.99', 
      status: 'Completed',
      paymentMethod: 'Credit Card'
    }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Transaction History</h2>
        <div className="flex space-x-2">
          <button className="bg-teal-50 text-teal-600 px-4 py-2 rounded-lg hover:bg-teal-100">
            Filter
          </button>
          <button className="bg-teal-50 text-teal-600 px-4 py-2 rounded-lg hover:bg-teal-100">
            Export
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment Method
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {transaction.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {transaction.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {transaction.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {transaction.paymentMethod}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    transaction.status === 'Completed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {transaction.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-teal-600 hover:text-teal-800">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-6 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Showing 1 to 5 of 5 entries
        </div>
        <div className="flex space-x-1">
          <button className="px-3 py-1 bg-teal-50 text-teal-600 rounded">1</button>
        </div>
      </div>
    </div>
  );
}

function PlaceholderPage({ title }) {
  return (
    <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold text-gray-400">{title} Page</h2>
      <p className="text-gray-400 mt-2">This page is not implemented in this demo</p>
    </div>
  );
}