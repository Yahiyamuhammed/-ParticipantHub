// src/features/dashboard/components/ScheduleTabs.jsx
import React, { useState, useMemo } from "react";
import CompetitionCard from "@/components/shared/CompetitionCard";
import clsx from "clsx";

export default function ScheduleTabs({ competitions }) {
  const [activeTab, setActiveTab] = useState("today");

  // NEW: Smart sorting logic
  const sortedCompetitions = useMemo(() => {
    if (!competitions) return [];
    
    const now = new Date().getTime();

    return [...competitions].sort((a, b) => {
      // Safely parse dates
      const aStart = new Date(a.startTime).getTime();
      const aEnd = new Date(a.endTime).getTime();
      const bStart = new Date(b.startTime).getTime();
      const bEnd = new Date(b.endTime).getTime();

      // Check if events are strictly in the past
      const aIsCompleted = aEnd < now;
      const bIsCompleted = bEnd < now;

      // 1. If 'A' is completed but 'B' is not, push 'A' down the list
      if (aIsCompleted && !bIsCompleted) return 1;
      
      // 2. If 'B' is completed but 'A' is not, push 'B' down the list
      if (!aIsCompleted && bIsCompleted) return -1;

      // 3. Otherwise (both completed, or both upcoming/live), sort chronologically by start time
      return aStart - bStart;
    });
  }, [competitions]);

  // Apply the sorted array to the tabs
  const todayComps = sortedCompetitions;
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
        <div className="text-center py-10 text-brand-textMuted bg-brand-cream/30 rounded-2xl border border-black/5 text-[13px] font-medium">
          No competitions scheduled for today.
        </div>
      );
    }
    return (
      <div className="text-center py-10 text-brand-textMuted bg-brand-cream/30 rounded-2xl border border-black/5 text-[13px] font-medium">
        No data available for {activeTab}.
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-5 bg-brand-card p-4 rounded-3xl border border-black/5 shadow-sm">
      <div className="flex bg-brand-dark/5 p-1 rounded-2xl">
       {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={clsx(
              // Changed: py-2 (instead of 2.5), text-[11px] (instead of 13), tracking-wider (instead of 0.1em), rounded-lg
              "flex-1 py-2 px-1 text-[11px] font-bold uppercase tracking-wider rounded-lg transition-all duration-300 whitespace-nowrap",
              activeTab === tab.id
                ? "bg-brand-dark text-brand-accent shadow-md"
                : "text-brand-textMuted hover:text-brand-dark",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-3">{renderContent()}</div>
    </div>
  );
}