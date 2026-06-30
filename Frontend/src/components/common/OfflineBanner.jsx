// src/components/common/OfflineBanner.jsx
import React from "react";
import { WifiOff } from "lucide-react";
import useNetworkStatus from "@/hooks/useNetworkStatus";

export default function OfflineBanner() {
  const isOnline = useNetworkStatus();

  if (isOnline) return null;

  return (
    <div className="bg-red-500 text-white px-4 py-2 flex items-center justify-center gap-2 text-sm font-medium z-50 transition-all duration-300">
      <WifiOff className="w-4 h-4" />
      <span>No Internet Connection. Information may not be up to date.</span>
    </div>
  );
}