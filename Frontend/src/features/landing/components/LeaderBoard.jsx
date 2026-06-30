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
        const rankNumber = (index + 1).toString().padStart(2, '0');

        return (
          <div 
            key={item.id} 
            className={clsx(
              "relative overflow-hidden flex items-center justify-between p-5 rounded-2xl transition-all duration-300 bg-white",
              isFirst 
                ? "border-2 border-brand-accent/60 shadow-[0_8px_24px_rgba(217,181,109,0.15)]" 
                : "border border-black/5 shadow-sm hover:border-brand-dark/20 hover:shadow-md"
            )}
          >
            {/* Left side: Rank + Name */}
            <div className="flex items-center gap-5">
              <div className={clsx(
                "font-black text-3xl tracking-tighter w-9 text-right",
                isFirst ? "text-brand-accent" : "text-brand-textMuted/40"
              )}>
                {rankNumber}.
              </div>
              
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-2">
                  <span className={clsx(
                    "font-bold text-[17px] tracking-tight",
                    isFirst ? "text-brand-dark" : "text-brand-textMid"
                  )}>
                    {item.district}
                  </span>
                  {isFirst && <Trophy className="w-4 h-4 text-brand-accent fill-brand-accent/20" />}
                </div>
                {isFirst && (
                  <span className="text-[10px] text-brand-dark/60 font-black uppercase tracking-[0.2em] mt-0.5">
                    Current Leader
                  </span>
                )}
              </div>
            </div>
            
            {/* Right side: Points */}
            <div className="flex flex-col items-end justify-center text-right">
              <span className={clsx(
                "font-black text-[22px] leading-none",
                isFirst ? "text-brand-dark" : "text-brand-textMid"
              )}>
                {item.points}
              </span>
              <span className="text-[10px] text-brand-textMuted font-bold uppercase tracking-[0.2em] mt-1">
                Pts
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}