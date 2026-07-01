// src/features/dashboard/components/ScheduleTabs.jsx
import React, { useState, useMemo } from "react";
import CompetitionCard from "@/components/shared/CompetitionCard";
import clsx from "clsx";

export default function ScheduleTabs({ competitions }) {
  const [activeTab, setActiveTab] = useState("today");

  // 1. Sort the entire competitions array chronologically and intelligently
  const sortedCompetitions = useMemo(() => {
    if (!competitions) return [];

    const now = new Date().getTime();

    return [...competitions].sort((a, b) => {
      const aStart = new Date(a.startTime).getTime();
      const aEnd = new Date(a.endTime).getTime();
      const bStart = new Date(b.startTime).getTime();
      const bEnd = new Date(b.endTime).getTime();

      const aIsCompleted = aEnd < now;
      const bIsCompleted = bEnd < now;

      // Push completed events to the bottom of whatever day they belong to
      if (aIsCompleted && !bIsCompleted) return 1;
      if (!aIsCompleted && bIsCompleted) return -1;

      // Chronological sort
      return aStart - bStart;
    });
  }, [competitions]);

  // 2. Filter the sorted array into the three time buckets
  const { previousComps, todayComps, upcomingComps } = useMemo(() => {
    const now = new Date();
    // Get the absolute start (00:00:00) and end (23:59:59) of today
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const endOfToday = startOfToday + (24 * 60 * 60 * 1000) - 1;

    const previous = [];
    const today = [];
    const upcoming = [];

    sortedCompetitions.forEach((comp) => {
      const compStart = new Date(comp.startTime).getTime();

      if (compStart < startOfToday) {
        previous.push(comp);
      } else if (compStart > endOfToday) {
        upcoming.push(comp);
      } else {
        today.push(comp);
      }
    });

    return { previousComps: previous, todayComps: today, upcomingComps: upcoming };
  }, [sortedCompetitions]);

  const tabs = [
    { id: "previous", label: "Previous" },
    { id: "today", label: "Today" },
    { id: "upcoming", label: "Upcoming" },
  ];

  const renderContent = () => {
    // Determine which array to map based on the active tab
    let activeData = [];
    if (activeTab === "previous") activeData = previousComps;
    if (activeTab === "today") activeData = todayComps;
    if (activeTab === "upcoming") activeData = upcomingComps;

    return activeData.length > 0 ? (
      activeData.map((comp) => (
        <CompetitionCard key={comp.id} competition={comp} />
      ))
    ) : (
      <div className="text-center py-10 text-brand-textMuted bg-brand-cream/30 rounded-2xl border border-black/5 text-[13px] font-medium">
        No competitions scheduled for {activeTab}.
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-5 bg-brand-card p-4 rounded-3xl border border-black/5 shadow-sm">
      
      {/* Mobile-Optimized Segmented Control */}
      <div className="flex bg-brand-dark/5 p-1 rounded-2xl">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={clsx(
              "flex-1 py-2 px-1 text-[11px] font-bold uppercase tracking-wider rounded-lg transition-all duration-300 whitespace-nowrap",
              activeTab === tab.id
                ? "bg-brand-dark text-brand-accent shadow-md"
                : "text-brand-textMuted hover:text-brand-dark"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Render the dynamically selected and sorted array */}
      <div className="flex flex-col gap-3">
        {renderContent()}
      </div>

    </div>
  );
}