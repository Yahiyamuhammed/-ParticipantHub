// src/pages/Dashboard/index.jsx (Additions)
import React from "react";
import { Bell, Trophy } from "lucide-react"; // Added Trophy icon
import useCompetitions from "@/hooks/useCompetitions";
import Section from "@/components/common/Section";
import Card from "@/components/common/Card";

import ProfileHeader from "@/features/dashboard/components/ProfileHeader";
import NextProgramHero from "@/features/dashboard/components/NextProgramHero";
import ScheduleTabs from "@/features/dashboard/components/ScheduleTabs";
import AlertBox from "@/features/dashboard/components/AlertBox";

// Import the new components and mock data
import ResultCard from "@/components/shared/ResultCard";
import mockResults from "@/mock/results";
import { HeroSkeleton, CardSkeleton } from "@/components/common/Skeleton";

export default function DashboardPage() {
  const { competitions, isLoading } = useCompetitions();

  const nextProgram = competitions?.[5];

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
    <div className="flex flex-col min-h-screen bg-brand-cream pb-12">
      {/* 1. GREEN HERO */}
      <div className="bg-brand-dark px-5 pt-12 pb-8 rounded-b-[2.5rem] shadow-xl text-brand-cream">
        <div className="w-full max-w-md mx-auto">
          <ProfileHeader />
          <div className="h-8 w-full"></div>{" "}
          {/* Space between Profile & Alert */}
          <AlertBox /> {/* Create this small component for your alert */}
        </div>
      </div>

      {/* 2. BODY CONTENT (Grouped) */}
      <div className="px-5 mt-10 max-w-md mx-auto w-full flex flex-col">
        <div className="h-6 w-full"></div>
        {/* GROUP A: The Next Program */}
        <NextProgramHero competition={nextProgram} />
        <div className="h-12 w-full"></div>{" "}
        {/* Spacing between Hero and Schedule Group */}
        {/* GROUP B: Schedule & Tabs */}
        <div className="flex flex-col gap-4">
          <h2 className="text-[20px] font-bold text-brand-textDark ml-1">
            Event Schedule
          </h2>
          <ScheduleTabs competitions={competitions} />
        </div>
        <div className="h-16 w-full"></div>{" "}
        {/* Spacing between Schedule Group & Results Group */}
        {/* GROUP C: Results */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-2 ml-1">
            <Trophy className="w-5 h-5 text-brand-dark" />
            <h2 className="text-[20px] font-bold text-brand-textDark">
              Published Results
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            {mockResults.map((result) => (
              <ResultCard key={result.id} result={result} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
