// src/features/landing/components/Leaderboard.jsx
import React from "react";
import Card from "@/components/common/Card";

// Mock data - eventually move to a service
const mockLeaderboard = [
  { id: 1, district: "Malappuram", points: 450, isCurrentUsers: false },
  { id: 2, district: "Kozhikode", points: 420, isCurrentUsers: false },
  { id: 3, district: "Kannur", points: 380, isCurrentUsers: false },
];

export default function Leaderboard() {
  return (
    <Card padding="p-0">
      <div className="divide-y divide-gray-100">
        {mockLeaderboard.map((item, index) => (
          <div 
            key={item.id} 
            className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <span className={`
                w-6 h-6 flex items-center justify-center rounded-full text-sm font-bold
                ${index === 0 ? "bg-yellow-100 text-yellow-700" : 
                  index === 1 ? "bg-gray-100 text-gray-600" : 
                  index === 2 ? "bg-orange-50 text-orange-700" : "text-gray-400"}
              `}>
                {index + 1}
              </span>
              <span className="font-medium text-gray-900">{item.district}</span>
            </div>
            <span className="font-bold text-gray-900">{item.points} <span className="text-xs text-gray-500 font-normal">pts</span></span>
          </div>
        ))}
      </div>
    </Card>
  );
}