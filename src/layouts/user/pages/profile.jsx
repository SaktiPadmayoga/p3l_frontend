import React, { useEffect, useState } from "react";
import { User, Home, ShoppingBag, Bell, Package } from "lucide-react";
import AddressManagement from "../components/ManageAddress";
import HistoryPembelian from "../components/HistoryPembelian";
import HistoryPenitipan from "../components/HistoryPenitipan";
import axios from "axios";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("profile");
  const [userRoles, setUserRoles] = useState([]);
  const [userPermissions, setUserPermissions] = useState([]);
  const [userType, setUserType] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUserData = () => {
      try {
        setIsLoading(true);

        // Get user data from localStorage
        const userData = JSON.parse(localStorage.getItem("userData"));
        const userType = localStorage.getItem("userType");

        if (!userData || !userType) {
          console.error("No user data or userType found in localStorage");
          setError("User data not found. Please log in again.");
          setIsLoading(false);
          return;
        }

        // Set user type
        setUserType(userType);

        // Set roles
        setUserRoles(userData.role || []);

        // Set permissions
        setUserPermissions(userData.permissions || []);

        setIsLoading(false);
      } catch (error) {
        console.error("Failed to load user data:", error);
        setError("Failed to load user data.");
        setIsLoading(false);
      }
    };

    getUserData();
  }, []);

  // Functions to check roles and permissions
  const hasRole = (role) => {
    const result = userRoles.includes(role);
    return result;
  };
  const hasPermission = (permission) => {
    const result = userPermissions.includes(permission);
    return result;
  };

  if (isLoading) {
    return (
      <div className="text-center text-gray-600 mt-10">
        Memuat data profil...
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-600 mt-10">{error}</div>;
  }

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
            active={activeTab === "profile"}
            onClick={() => setActiveTab("profile")}
          />
          <SidebarItem
            icon={<Home size={24} />}
            text="Address"
            active={activeTab === "address"}
            onClick={() => setActiveTab("address")}
          />
          {hasRole("pembeli") && hasPermission("view-history-pembelian") && (
            <SidebarItem
              icon={<ShoppingBag size={24} />}
              text="Transaksi Pembelian"
              active={activeTab === "pembelian"}
              onClick={() => setActiveTab("pembelian")}
            />
          )}
          {hasRole("penitip") && hasPermission("view-history-penitipan") && (
            <SidebarItem
              icon={<Package size={24} />}
              text="Transaksi Penitipan"
              active={activeTab === "penitipan"}
              onClick={() => setActiveTab("penitipan")}
            />
          )}
          <SidebarItem
            icon={<Bell size={24} />}
            text="Notifications"
            active={activeTab === "notifications"}
            onClick={() => setActiveTab("notifications")}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        {activeTab === "profile" && <ProfilePage />}
        {activeTab === "address" && <AddressPage />}
        {activeTab === "pembelian" && <HistoryPembelian />}
        {activeTab === "penitipan" && <HistoryPenitipan />}
        {activeTab === "notifications" && (
          <PlaceholderPage title="Notifications" />
        )}
      </div>
    </div>
  );
}

function SidebarItem({ icon, text, active, onClick }) {
  return (
    <div
      className={`flex items-center text-xl p-3 mb-2 rounded-lg cursor-pointer ${
        active
          ? "bg-stone-50 text-stone-600 font-medium"
          : "text-gray-500 hover:bg-gray-100"
      }`}
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
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No authentication token found.");
        }

        const response = await axios.get(
          "http://localhost:8000/api/auth/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUserData(response.data);

        // Update localStorage with fresh user data
        localStorage.setItem(
          "userData",
          JSON.stringify({
            role: response.data.user.role || [],
            permissions: response.data.user.permissions || [],
          })
        );
        localStorage.setItem("userType", response.data.user_type || "");
      } catch (error) {
        console.error("Gagal mengambil data profil:", error);
        setError("Failed to fetch profile data.");
      }
    };

    fetchProfile();
  }, []);

  if (error) {
    return <div className="text-center text-red-600 mt-10">{error}</div>;
  }

  if (!userData) {
    return (
      <div className="text-center text-gray-600 mt-10">
        Memuat data profil...
      </div>
    );
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
        <ProfileItem label="Poin Loyalitas" value={user.poin ?? "-"} />
        <ProfileItem label="Role" value={user.role.join(", ")} />
        {user_type === "organisasi" && (
          <>
            <ProfileItem label="Alamat" value={user.alamat} />
            <ProfileItem label="Telepon" value={user.telepon} />
            <ProfileItem label="Deskripsi" value={user.deskripsi} />
          </>
        )}
        {user_type !== "organisasi" && (
          <ProfileItem label="Poin Loyalitas" value={user.poin ?? "-"} />
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

function PlaceholderPage({ title }) {
  return (
    <div className="text-center text-gray-500 mt-20">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p>Fitur ini belum tersedia.</p>
    </div>
  );
}
