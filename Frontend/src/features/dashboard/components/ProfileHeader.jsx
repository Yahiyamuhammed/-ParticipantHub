// src/features/dashboard/components/ProfileHeader.jsx
import React from "react";
import { LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Card from "@/components/common/Card";

export default function ProfileHeader() {
  const { user, logout } = useAuth();

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* Avatar with White Ring */}
        <div className="w-14 h-14 rounded-full bg-brand-light flex items-center justify-center text-[20px] font-bold text-brand-cream ring-4 ring-brand-dark shadow-lg">
          {user?.name?.charAt(0) || "P"}
        </div>
        <div>
          <h2 className="font-semibold text-[18px] text-brand-cream">{user?.name}</h2>
          <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-brand-accent">
            {user?.reg} • {user?.district}
          </p>
        </div>
      </div>
      <button 
        onClick={logout}
        className="p-2.5 text-brand-cream/50 hover:text-brand-accent transition-colors"
      >
        <LogOut className="w-5 h-5" />
      </button>
    </div>
  );
}