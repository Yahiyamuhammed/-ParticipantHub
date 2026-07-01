// src/components/shared/CompetitionCard.jsx
import React, { useState, useEffect } from "react";
import { Navigation2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { getEventStatus } from "@/utils/time";

export default function CompetitionCard({ competition }) {
  const [status, setStatus] = useState(() =>
    getEventStatus(competition.startTime, competition.endTime)
  );

  useEffect(() => {
    if (status.label === "Completed") return;

    const interval = setInterval(() => {
      setStatus(getEventStatus(competition.startTime, competition.endTime));
    }, 60000); // Recalculate every minute

    return () => clearInterval(interval);
  }, [competition.startTime, competition.endTime, status.label]);

  // NEW: Calculate badge variant based on proximity to start time
  const getBadgeVariant = () => {
    if (status.label === "Completed") return "completed";
    if (status.label === "Live" || status.label === "Happening Now") return "live";

    // Calculate minutes remaining until start
    const now = new Date().getTime();
    const startTime = new Date(competition.startTime).getTime();
    const minutesLeft = Math.floor((startTime - now) / 60000);

    if (minutesLeft <= 30) return "urgent"; // Under 30 mins -> Gold
    if (minutesLeft <= 120) return "soon";  // Under 2 hours -> Light Green
    return "upcoming";                      // Farther away -> Muted Gray
  };

  const handleNavigate = (e) => {
    e.stopPropagation();
    const url = `https://www.google.com/maps/search/?api=1&query=${competition.latitude},${competition.longitude}`;
    window.open(url, "_blank");
  };

  return (
    <div className="flex flex-col gap-3 p-4 bg-brand-cream/50 border border-black/5 rounded-2xl hover:bg-brand-cream transition-colors group">
      
      <div className="flex justify-between items-start gap-3">
        <h3 className="text-[16px] font-bold text-brand-textDark leading-tight tracking-tight pr-2">
          {competition.title}
        </h3>
        
        <div className="shrink-0 mt-0.5">
          {/* Dynamically pass our smart time-priority variant */}
          <Badge variant={getBadgeVariant()}>{status.label}</Badge>
        </div>
      </div>

      <div className="pt-3 mt-1 border-t border-black/5 flex justify-between items-center">
        <span className="text-[13px] font-bold text-brand-textMid leading-none">
          {competition.stage}
        </span>

        {status.label !== "Completed" && (
          <button
            onClick={handleNavigate}
            className="group/btn flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-brand-dark bg-brand-accent/15 hover:bg-brand-accent/25 px-3 py-1.5 rounded-lg transition-all active:scale-95 shrink-0"
          >
            <Navigation2 className="w-3.5 h-3.5 text-brand-dark transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
            Navigate
          </button>
        )}
      </div>
      
    </div>
  );
}