// src/pages/Dashboard/index.jsx
import React from "react";
import { Bell } from "lucide-react";
import useCompetitions from "@/hooks/useCompetitions";
import Section from "@/components/common/Section";
import Card from "@/components/common/Card";

import ProfileHeader from "@/features/dashboard/components/ProfileHeader";
import NextProgramHero from "@/features/dashboard/components/NextProgramHero";
import ScheduleTabs from "@/features/dashboard/components/ScheduleTabs";

export default function DashboardPage() {
  const { competitions, isLoading } = useCompetitions();

  // For the mock, we assume the first competition is the "Next" one.
  const nextProgram = competitions?.[0]; 

  if (isLoading) {
    return <div className="p-5 text-center text-gray-500 mt-10">Loading dashboard...</div>;
  }

  return (
    <div className="flex flex-col gap-6 pb-12 pt-6">
      
      {/* 1. Profile */}
      <ProfileHeader />

      {/* Announcements (Only shows if there is an important update) */}
      <Card padding="p-3" className="bg-yellow-50 border border-yellow-100 shadow-none flex items-start gap-3">
        <Bell className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-bold text-yellow-800">Stage 4 Relocated</h4>
          <p className="text-xs text-yellow-700 mt-0.5">Due to weather, all Stage 4 events are moved to the Main Indoor Hall.</p>
        </div>
      </Card>

      {/* 2. Next Program Hero */}
      <NextProgramHero competition={nextProgram} />

      {/* 3. Event Progress Context */}
      <div className="flex items-center justify-between px-2">
        <span className="text-sm font-bold text-gray-900">Event Progress</span>
        <span className="text-sm font-medium text-gray-500">Day 3 of 6</span>
      </div>

      {/* 4. Full Schedule */}
      <Section>
        <ScheduleTabs competitions={competitions} />
      </Section>
      
    </div>
  );
}