// src/components/shared/LiveTicker.jsx
import React from "react";
import { Bell } from "lucide-react";

export default function LiveTicker({ updates = [] }) {
  if (!updates || updates.length === 0) return null;

  return (
    <div className="bg-brand-dark border border-brand-mid rounded-2xl overflow-hidden relative flex items-center shadow-lg h-[56px]">
      
      {/* Left Icon Area - Wider padding and stronger shadow to block text seamlessly */}
      <div className="absolute left-0 z-20 bg-brand-dark px-5 h-full flex items-center border-r border-brand-light/30 shadow-[6px_0_16px_rgba(15,61,48,1)]">
        <Bell className="w-5 h-5 text-brand-accent animate-pulse" />
      </div>

      {/* Right Edge Fade Mask - Makes text fade out smoothly instead of cutting off */}
      <div className="absolute right-0 z-20 w-16 h-full bg-gradient-to-l from-brand-dark to-transparent pointer-events-none"></div>
      
      {/* Scrolling Content - Increased left padding to clear the larger icon area */}
      <div className="flex whitespace-nowrap animate-marquee pl-[72px] pr-8 text-[14.5px] font-medium text-brand-cream tracking-wide">
        {updates.map((update, idx) => (
          <React.Fragment key={idx}>
            <span className="mx-4">{update}</span>
            <span className="text-brand-accent mx-2 text-lg leading-none">•</span>
          </React.Fragment>
        ))}
        {updates.map((update, idx) => (
          <React.Fragment key={`dup-${idx}`}>
            <span className="mx-4">{update}</span>
            <span className="text-brand-accent mx-2 text-lg leading-none">•</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}