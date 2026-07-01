// src/features/dashboard/components/NextProgramHero.jsx
import React from "react";
import { Navigation2, Clock, ArrowUpRight } from "lucide-react";
import { getEventStatus } from "@/utils/time";

export default function NextProgramHero({ competition }) {
  if (!competition) return null;
  const status = getEventStatus(competition.startTime, competition.endTime);

  return (
    <div className="bg-brand-dark text-brand-cream rounded-[2rem] p-7 shadow-lg relative overflow-hidden mx-1">
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-brand-light rounded-full blur-3xl opacity-40 pointer-events-none"></div>

      <div className="relative z-10">
        {/* Header row: leading-zero label + live status, asymmetric */}
        <div className="flex items-start justify-between mb-6">
          <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-brand-accent">
            01 — Next Program
          </span>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-brand-cream/70">
              {status.label}
            </span>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-1 tracking-tight text-white leading-tight">
          {competition.title}
        </h2>
        <p className="text-brand-cream/70 font-medium text-base mb-8">
          {competition.stage}
        </p>

        {/* Divider gives the card structure instead of floating elements */}
        <div className="h-px w-full bg-brand-cream/10 mb-6"></div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-brand-cream/50" />
            <span className="text-xs font-medium text-brand-cream/50">
              {status.isLive ? `Ends in ${status.remaining}` : status.label}
            </span>
          </div>

          <button
            className="group flex items-center gap-2.5 bg-brand-accent text-brand-dark pl-5 pr-4 py-2.5 rounded-xl font-bold text-sm
                       hover:bg-brand-accentLight active:scale-[0.97] transition-all duration-150
                       shadow-[0_4px_14px_rgba(217,181,109,0.25)] hover:shadow-[0_4px_18px_rgba(217,181,109,0.4)]"
          >
            Navigate
            <ArrowUpRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
