// src/features/dashboard/components/ProfileHeader.jsx
import React from "react";
import { LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Card from "@/components/common/Card";

export default function ProfileHeader() {
  const { user, logout } = useAuth();

  return (
    <Card padding="p-4" className="flex items-center justify-between bg-white">
      <div className="flex items-center gap-4">
        {/* Avatar Fallback */}
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-lg font-bold text-gray-700 ring-2 ring-white shadow-sm">
          {user?.name?.charAt(0) || "P"}
        </div>
        <div>
          <h2 className="font-bold text-gray-900 text-lg leading-tight">{user?.name}</h2>
          <p className="text-sm text-gray-500 font-medium">
            {user?.reg} • {user?.district} • {user?.category}
          </p>
        </div>
      </div>
      <button 
        onClick={logout}
        className="p-2 text-gray-400 hover:text-red-600 transition-colors bg-gray-50 hover:bg-red-50 rounded-full"
      >
        <LogOut className="w-5 h-5" />
      </button>
    </Card>
  );
}