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
    { id: "upcoming", label: "Upcoming" },
  ];

  const renderContent = () => {
    if (activeTab === "today") {
      return todayComps.length > 0 ? (
        todayComps.map((comp) => (
          <CompetitionCard key={comp.id} competition={comp} />
        ))
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
    <div className="flex flex-col gap-5 bg-brand-card p-4 rounded-3xl border border-black/5 shadow-sm">
      {" "}
      {/* Premium Segmented Control */}
      <div className="flex bg-brand-dark/5 p-1 rounded-2xl">
        {" "}
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={clsx(
              "flex-1 py-2.5 text-[13px] font-bold uppercase tracking-[0.1em] rounded-xl transition-all duration-300",
              activeTab === tab.id
                ? "bg-brand-dark text-brand-accent shadow-lg"
                : "text-brand-textMuted hover:text-brand-dark",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-3"> {renderContent()}</div>
    </div>
  );
}
