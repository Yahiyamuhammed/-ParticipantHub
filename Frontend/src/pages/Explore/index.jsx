// src/pages/Explore/index.jsx
import React, { useState, useMemo, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Search as SearchIcon } from "lucide-react";
import useCompetitions from "@/hooks/useCompetitions";
import CompetitionCard from "@/components/shared/CompetitionCard";
import { getEventStatus } from "@/utils/time";
import { CardSkeleton } from "@/components/common/Skeleton";

export default function ExplorePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { competitions, isLoading } = useCompetitions();
  const [searchQuery, setSearchQuery] = useState("");
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

      if (status.isLive || status.label === "Happening Now") {
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
    <div className="flex flex-col min-h-screen pb-12 bg-brand-cream px-5 pt-6">
      
      {/* Premium Header */}
      <header className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 text-brand-textMuted hover:text-brand-dark transition-colors rounded-full hover:bg-brand-dark/5 active:scale-95"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-[24px] font-bold text-brand-textDark tracking-tight">Explore Events</h1>
      </header>

      {/* Elevated Search Bar */}
      <div className="relative mb-8">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-brand-textMuted/70" />
        </div>
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search competitions or stages..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-3.5 bg-brand-card border border-black/5 rounded-2xl shadow-sm text-brand-textDark placeholder-brand-textMuted/60 focus:ring-2 focus:ring-brand-accent/50 focus:border-brand-accent transition-all outline-none text-[15px]"
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
          
          {/* 1. Live Now Section (With dynamic top spacing) */}
          {live.length > 0 && (
            <section>
              {/* Force Space: This only renders if there are active live events */}
              <div className="h-4 w-full shrink-0"></div>
              
              <h2 className="text-[12px] font-bold uppercase tracking-[0.15em] text-brand-dark mb-3 ml-1">
                Happening Now
              </h2>
              <div className="flex flex-col gap-3">
                {live.map((comp) => (
                  <CompetitionCard key={comp.id} competition={comp} />
                ))}
              </div>
            </section>
          )}

          {/* 2. Starting Soon Section */}
          {soon.length > 0 && (
            <section>
              <h2 className="text-[12px] font-bold uppercase tracking-[0.15em] text-brand-accent mb-3 ml-1">
                Starting Soon
              </h2>
              <div className="flex flex-col gap-3">
                {soon.map((comp) => (
                  <CompetitionCard key={comp.id} competition={comp} />
                ))}
              </div>
            </section>
          )}

          {/* 3. Upcoming (Later) Section */}
          {upcoming.length > 0 && (
            <section>
              <h2 className="text-[12px] font-bold uppercase tracking-[0.15em] text-brand-textMuted mb-3 ml-1">
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
            <div className="text-center py-12 px-4 bg-brand-cream/50 rounded-3xl border border-black/5">
              <h3 className="text-brand-textDark font-bold mb-1 text-[16px]">No events found</h3>
              <p className="text-[13px] text-brand-textMuted">
                We couldn't find any upcoming events matching "{searchQuery}".
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}