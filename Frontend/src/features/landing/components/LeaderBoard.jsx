// src/features/landing/components/Leaderboard.jsx
import React from "react";
import { Trophy } from "lucide-react";
import clsx from "clsx";

const mockLeaderboard = [
  { id: 1, district: "Malappuram", points: 450 },
  { id: 2, district: "Kozhikode", points: 420 },
  { id: 3, district: "Kannur", points: 380 },
  { id: 4, district: "Wayanad", points: 310 },
];

export default function Leaderboard() {
  return (
    <div className="flex flex-col gap-3">
      {mockLeaderboard.map((item, index) => {
        const isFirst = index === 0;
        const rankNumber = (index + 1).toString().padStart(2, '0'); // Creates "01", "02", etc.

        return (
          <div 
            key={item.id} 
            className={clsx(
              "relative overflow-hidden flex items-center justify-between p-5 rounded-2xl border transition-all duration-300",
              isFirst 
                ? "bg-brand-card border-brand-accent/40 shadow-md" 
                : "bg-brand-card border-black/5 shadow-sm hover:border-brand-dark/20"
            )}
          >
            {/* Subtle Gold Accent Line for the Leader */}
            {isFirst && (
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-brand-accent"></div>
            )}

            <div className="flex items-center gap-5">
              {/* Editorial Typography instead of generic circles */}
              <div className={clsx(
                "font-bold text-3xl tracking-tighter w-8 text-center",
                isFirst ? "text-brand-accent" : "text-brand-textMuted/30"
              )}>
                {rankNumber}.
              </div>
              
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-brand-textDark text-[17px]">
                    {item.district}
                  </span>
                  {isFirst && <Trophy className="w-4 h-4 text-brand-accent" />}
                </div>
                {isFirst && (
                  <span className="text-[11px] text-brand-light font-bold uppercase tracking-widest mt-0.5">
                    Current Leader
                  </span>
                )}
              </div>
            </div>
            
            {/* Points block */}
            <div className="flex flex-col items-end">
              <span className={clsx(
                "font-bold text-xl",
                isFirst ? "text-brand-dark" : "text-brand-textMid"
              )}>
                {item.points}
              </span>
              <span className="text-[10px] text-brand-textMuted font-bold uppercase tracking-[0.15em]">
                Points
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}