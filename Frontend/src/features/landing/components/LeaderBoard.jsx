// src/features/landing/components/Leaderboard.jsx
import React from "react";
import Card from "@/components/common/Card";

// Mock data - eventually move to a service
const mockLeaderboard = [
  { id: 1, district: "Thiruvananthapuram", points: 980, isCurrentUsers: false },
  { id: 2, district: "Kollam", points: 945, isCurrentUsers: false },
  { id: 3, district: "Pathanamthitta", points: 910, isCurrentUsers: false },
  { id: 4, district: "Alappuzha", points: 890, isCurrentUsers: false },
  { id: 5, district: "Kottayam", points: 860, isCurrentUsers: false },
  { id: 6, district: "Idukki", points: 835, isCurrentUsers: false },
  { id: 7, district: "Ernakulam", points: 810, isCurrentUsers: false },
  { id: 8, district: "Thrissur", points: 790, isCurrentUsers: false },
  { id: 9, district: "Palakkad", points: 760, isCurrentUsers: false },
  { id: 10, district: "Malappuram", points: 735, isCurrentUsers: false },
  { id: 11, district: "Kozhikode", points: 710, isCurrentUsers: true },
  { id: 12, district: "Wayanad", points: 685, isCurrentUsers: false },
  { id: 13, district: "Kannur", points: 660, isCurrentUsers: false },
  { id: 14, district: "Kasaragod", points: 640, isCurrentUsers: false },
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