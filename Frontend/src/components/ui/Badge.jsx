// src/components/ui/Badge.jsx
import React from "react";
import clsx from "clsx";

export function Badge({ children, variant = "upcoming", className }) {
  const baseStyle = "inline-flex items-center justify-center px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.15em] rounded-md transition-colors";
  
  const variants = {
    // Live: Solid forest green (Calmed down from flashing gold)
    live: "bg-brand-dark text-brand-cream",
    
    // Urgent (< 30 mins): Striking Gold to demand immediate focus
    urgent: "bg-brand-accent/25 text-brand-textDark font-black border border-brand-accent/40",
    
    // Soon (30m - 2h): Fresh Light Green text
    soon: "bg-brand-light/10 text-brand-light border border-brand-light/20",
    
    // Upcoming (> 2h): Quiet, low-contrast grayscale
    upcoming: "bg-brand-dark/5 text-brand-textMuted",
    
    // Completed: Visually dropped out completely
    completed: "bg-transparent border border-black/10 text-brand-textMuted"
  };

  return (
    <span className={clsx(baseStyle, variants[variant], className)}>
      {children}
    </span>
  );
}