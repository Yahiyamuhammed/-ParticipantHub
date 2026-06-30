// src/pages/Explore/index.jsx
import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search as SearchIcon } from "lucide-react";
import useCompetitions from "@/hooks/useCompetitions";
import CompetitionCard from "@/components/shared/CompetitionCard";
import { getEventStatus } from "@/utils/time";
import { CardSkeleton } from "@/components/common/Skeleton";
import { useLocation } from "react-router-dom";
import { useRef, useEffect } from "react";

export default function ExplorePage() {
  const navigate = useNavigate();
  const { competitions, isLoading } = useCompetitions();
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const searchInputRef = useRef(null);

  useEffect(() => {
    // If navigated from the Landing page's Search button, focus immediately
    if (location.state?.autoFocusSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [location.state]);

  // Group and filter competitions based on time and search query
  const { live, soon, upcoming } = useMemo(() => {
    const filtered = (competitions || []).filter(
      (comp) =>
        comp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comp.stage.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    const grouped = { live: [], soon: [], upcoming: [] };

    filtered.forEach((comp) => {
      const status = getEventStatus(comp.startTime, comp.endTime);

      if (status.label === "Completed") return; // Hide completed from explore

      if (status.isLive) {
        grouped.live.push(comp);
      } else if (status.label.includes("Starts in")) {
        grouped.soon.push(comp);
      } else {
        grouped.upcoming.push(comp);
      }
    });

    return grouped;
  }, [competitions, searchQuery]);

  return (
    <div className="flex flex-col min-h-screen pb-12 bg-gray-50 -mx-5 px-5 pt-6">
      {/* Header with Back Button */}
      <header className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 text-gray-500 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-200/50"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Explore Events</h1>
      </header>

      {/* Search Bar */}
      <div className="relative mb-8">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search competitions or stages..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-3.5 bg-white border-none rounded-2xl shadow-sm ring-1 ring-gray-900/5 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-gray-900 transition-all outline-none"
        />
      </div>

      {isLoading ? (
        <div className="flex flex-col gap-4 mt-4">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          {/* Starting Soon Section */}
          {soon.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-wider text-yellow-600 mb-3 ml-1">
                Starting Soon
              </h2>
              <div className="flex flex-col gap-3">
                {soon.map((comp) => (
                  <CompetitionCard key={comp.id} competition={comp} />
                ))}
              </div>
            </section>
          )}

          {/* Live Now Section */}
          {live.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-wider text-green-600 mb-3 ml-1">
                Happening Now
              </h2>
              <div className="flex flex-col gap-3">
                {live.map((comp) => (
                  <CompetitionCard key={comp.id} competition={comp} />
                ))}
              </div>
            </section>
          )}

          {/* Upcoming (Later) Section */}
          {upcoming.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3 ml-1">
                Later Today
              </h2>
              <div className="flex flex-col gap-3">
                {upcoming.map((comp) => (
                  <CompetitionCard key={comp.id} competition={comp} />
                ))}
              </div>
            </section>
          )}

          {/* Empty State when searching */}
          {live.length === 0 && soon.length === 0 && upcoming.length === 0 && (
            <div className="text-center py-12 px-4 bg-white rounded-3xl border border-gray-100">
              <h3 className="text-gray-900 font-bold mb-1">No events found</h3>
              <p className="text-sm text-gray-500">
                We couldn't find any upcoming events matching your search.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
