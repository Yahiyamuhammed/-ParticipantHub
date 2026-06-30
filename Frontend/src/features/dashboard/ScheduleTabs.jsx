// src/features/dashboard/components/ScheduleTabs.jsx
import React, { useState } from "react";
import CompetitionCard from "@/components/shared/CompetitionCard";
import clsx from "clsx";

export default function ScheduleTabs({ competitions }) {
  const [activeTab, setActiveTab] = useState("today");

  // In a real scenario, you'd filter these based on actual dates.
  // For the mock, we will just split the array to simulate it.
  const todayComps = competitions; 
  const previousComps = []; 
  const upcomingComps = [];

  const tabs = [
    { id: "previous", label: "Previous" },
    { id: "today", label: "Today" },
    { id: "upcoming", label: "Upcoming" }
  ];

  const renderContent = () => {
    if (activeTab === "today") {
      return todayComps.length > 0 ? (
        todayComps.map(comp => <CompetitionCard key={comp.id} competition={comp} />)
      ) : (
        <div className="text-center py-10 text-gray-500 bg-white rounded-3xl border border-gray-100">
          No competitions scheduled for today.
        </div>
      );
    }
    return (
      <div className="text-center py-10 text-gray-500 bg-white rounded-3xl border border-gray-100">
        No data available for {activeTab}.
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Segmented Control / Tabs */}
      <div className="flex bg-gray-100 p-1 rounded-2xl">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={clsx(
              "flex-1 py-2 px-3 text-sm font-semibold rounded-xl transition-all duration-200",
              activeTab === tab.id 
                ? "bg-white text-gray-900 shadow-sm" 
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* List Container */}
      <div className="flex flex-col gap-3">
        {renderContent()}
      </div>
    </div>
  );
}