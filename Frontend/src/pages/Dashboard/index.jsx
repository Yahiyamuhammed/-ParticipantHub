// src/pages/Dashboard/index.jsx (Additions)
import React from "react";
import { Bell, Trophy } from "lucide-react"; // Added Trophy icon
import useCompetitions from "@/hooks/useCompetitions";
import Section from "@/components/common/Section";
import Card from "@/components/common/Card";

import ProfileHeader from "@/features/dashboard/components/ProfileHeader";
import NextProgramHero from "@/features/dashboard/components/NextProgramHero";
import ScheduleTabs from "@/features/dashboard/components/ScheduleTabs";

// Import the new components and mock data
import ResultCard from "@/components/shared/ResultCard";
import mockResults from "@/mock/results"; 
import { HeroSkeleton, CardSkeleton } from "@/components/common/Skeleton";

export default function DashboardPage() {
  const { competitions, isLoading } = useCompetitions();

  const nextProgram = competitions?.[0]; 

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 pb-12 pt-6 px-1">
        {/* Profile Skeleton */}
        <div className="bg-white p-4 rounded-3xl border border-gray-100 flex gap-4 items-center">
          <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse" />
          <div className="space-y-2 flex-1">
            <div className="h-5 w-1/2 bg-gray-200 rounded-md animate-pulse" />
            <div className="h-4 w-2/3 bg-gray-200 rounded-md animate-pulse" />
          </div>
        </div>
        <HeroSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 pb-12 pt-6">
      <ProfileHeader />

      <Card padding="p-3" className="bg-yellow-50 border border-yellow-100 shadow-none flex items-start gap-3">
        <Bell className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-bold text-yellow-800">Stage 4 Relocated</h4>
          <p className="text-xs text-yellow-700 mt-0.5">Due to weather, all Stage 4 events are moved to the Main Indoor Hall.</p>
        </div>
      </Card>

      <NextProgramHero competition={nextProgram} />

      <div className="flex items-center justify-between px-2">
        <span className="text-sm font-bold text-gray-900">Event Progress</span>
        <span className="text-sm font-medium text-gray-500">Day 3 of 6</span>
      </div>

      <Section>
        <ScheduleTabs competitions={competitions} />
      </Section>
      
      {/* NEW: Published Results Section */}
      <Section>
        <div className="flex items-center gap-2 mb-3 ml-2">
          <Trophy className="w-5 h-5 text-gray-900" />
          <h2 className="text-lg font-bold text-gray-900">Published Results</h2>
        </div>
        
        <div className="flex flex-col gap-3">
          {mockResults.map(result => (
            <ResultCard key={result.id} result={result} />
          ))}
        </div>
      </Section>

    </div>
  );
}