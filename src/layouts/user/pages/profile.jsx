import React, { useEffect, useState } from 'react';
import { User, Home, ShoppingBag, Heart, Clock, Settings, Bell } from 'lucide-react';
import AddressManagement from '../components/ManageAddress';
import axios from 'axios';

export default function Profile() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="flex h-[80vh] rounded-2xl bg-gray-50 mx-16 mt-28">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg rounded-l-2xl">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-stone-600">User Profile</h1>
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
      <div className="flex-1 p-8 overflow-auto">
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
      className={`flex items-center text-xl p-3 mb-2 rounded-lg cursor-pointer ${active ? 'bg-stone-50 text-stone-600 font-medium' : 'text-gray-500 hover:bg-gray-100'}`}
      onClick={onClick}
    >
      <div className="mr-3">{icon}</div>
      <span>{text}</span>
      {active && <div className="ml-auto w-1 h-6 bg-stone-600 rounded"></div>}
    </div>
  );
}

function ProfilePage() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserData(response.data);
      } catch (error) {
        console.error('Gagal mengambil data profil:', error);
      }
    };

    fetchProfile();
  }, []);

  if (!userData) {
    return <div className="text-center text-gray-600 mt-10">Memuat data profil...</div>;
  }

  const { user_type, user } = userData;

  return (
    <div className="max-w-3xl mx-auto mt-6 p-8 bg-white shadow-lg rounded-2xl">
      <div className="flex items-center space-x-6">
        <img 
          src="/api/placeholder/150/150" 
          alt="Profile" 
          className="w-24 h-24 rounded-full object-cover border-2 border-stone-300" 
        />
        <div>
          <h2 className="text-3xl font-semibold text-stone-700">{user.nama}</h2>
          <p className="text-stone-500">{user.email}</p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-stone-700">
        <ProfileItem label="Tipe Pengguna" value={user_type} />
        <ProfileItem label="ID Pengguna" value={user.id} />
        <ProfileItem label="Poin Loyalitas" value={user.poin ?? '-'} />
        <ProfileItem label="Role" value={user.role.join(', ')} />
        {user_type === 'organisasi' && (
          <>
            <ProfileItem label="Alamat" value={user.alamat} />
            <ProfileItem label="Telepon" value={user.telepon} />
            <ProfileItem label="Deskripsi" value={user.deskripsi} />
          </>
        )}

        {user_type !== 'organisasi' && (
          <ProfileItem label="Poin Loyalitas" value={user.poin ?? '-'} />
        )}
      </div>

      <div className="mt-10 text-right">
        <button className="bg-stone-600 text-white px-6 py-3 rounded-lg hover:bg-stone-700 transition">
          Edit Profil
        </button>
      </div>
    </div>
  );
}

function ProfileItem({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <div className="p-3 border rounded-lg bg-gray-50">{value}</div>
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
    { id: 1, date: '2025-04-15', description: 'Online Purchase', amount: '$129.99', status: 'Completed', paymentMethod: 'Credit Card' },
    { id: 2, date: '2025-04-10', description: 'Subscription Renewal', amount: '$9.99', status: 'Completed', paymentMethod: 'PayPal' },
    { id: 3, date: '2025-04-05', description: 'Mobile Phone Case', amount: '$24.99', status: 'Processing', paymentMethod: 'Credit Card' },
    { id: 4, date: '2025-03-30', description: 'Annual Membership', amount: '$99.00', status: 'Completed', paymentMethod: 'Bank Transfer' },
    { id: 5, date: '2025-03-22', description: 'Wireless Headphones', amount: '$149.99', status: 'Completed', paymentMethod: 'Credit Card' }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Transaction History</h2>
        <div className="flex space-x-2">
          <button className="bg-stone-50 text-stone-600 px-4 py-2 rounded-lg hover:bg-stone-100">Filter</button>
          <button className="bg-stone-50 text-stone-600 px-4 py-2 rounded-lg hover:bg-stone-100">Export</button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="p-4">Tanggal</th>
              <th className="p-4">Deskripsi</th>
              <th className="p-4">Jumlah</th>
              <th className="p-4">Status</th>
              <th className="p-4">Metode</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(tx => (
              <tr key={tx.id} className="border-t hover:bg-gray-50">
                <td className="p-4">{tx.date}</td>
                <td className="p-4">{tx.description}</td>
                <td className="p-4">{tx.amount}</td>
                <td className="p-4">{tx.status}</td>
                <td className="p-4">{tx.paymentMethod}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PlaceholderPage({ title }) {
  return (
    <div className="text-center text-gray-500 mt-20">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p>Fitur ini belum tersedia.</p>
    </div>
  );
}
