// src/components/shared/CompetitionCard.jsx
import React, { useState, useEffect } from "react";
import { Navigation2 } from "lucide-react";
import Card from "@/components/common/Card";
import { Badge } from "@/components/ui/Badge"; // Assuming we moved Badge here
import { getEventStatus } from "@/utils/time";

export default function CompetitionCard({ competition }) {
  const [status, setStatus] = useState(() => 
    getEventStatus(competition.startTime, competition.endTime)
  );

  // Force time recalculation every minute
  useEffect(() => {
    // If it's already completed, no need to keep checking
    if (status.label === "Completed") return;

    const interval = setInterval(() => {
      setStatus(getEventStatus(competition.startTime, competition.endTime));
    }, 60000); // 1 minute

    return () => clearInterval(interval);
  }, [competition.startTime, competition.endTime, status.label]);

  const handleNavigate = (e) => {
    e.stopPropagation();
    // In v1, we open Google Maps intents. 
    // Format: geo:lat,lng or a direct google maps link.
    const url = `https://www.google.com/maps/search/?api=1&query=${competition.latitude},${competition.longitude}`;
    window.open(url, '_blank');
  };

  return (
    <Card padding="p-4" className="flex flex-col gap-3">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{competition.title}</h3>
          <p className="text-sm text-gray-500 mt-0.5">{competition.stage}</p>
        </div>
        <Badge variant={status.variant}>
          {status.label}
        </Badge>
      </div>

      {/* Action Row */}
      <div className="pt-3 mt-1 border-t border-gray-100 flex justify-between items-center">
        <span className="text-xs text-gray-400 font-medium">
          ID: {competition.id}
        </span>
        
        {status.label !== "Completed" && (
          <button 
            onClick={handleNavigate}
            className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
          >
            <Navigation2 className="w-4 h-4" />
            Navigate
          </button>
        )}
      </div>
    </Card>
  );
}