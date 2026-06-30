// src/components/ui/Badge.jsx
import React from 'react';
import clsx from 'clsx';

export const Badge = ({ children, variant = 'neutral', className = '' }) => {
  const variants = {
    // Neutral uses our cream/gray
    neutral: "bg-black/5 text-brand-textMid",
    // Live stays semantic (Emerald green) for UI clarity, but tweaked
    live: "bg-emerald-100 text-emerald-800 ring-1 ring-emerald-500/20",
    // Warning uses our Gold accent
    warning: "bg-brand-accent/20 text-brand-dark ring-1 ring-brand-accent/40",
    // Dark uses our Forest Green
    dark: "bg-brand-dark text-brand-accent"
  };

  return (
    <span className={clsx(
      "inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider",
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
};