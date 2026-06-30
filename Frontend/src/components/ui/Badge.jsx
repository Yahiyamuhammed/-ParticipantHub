// src/components/ui/Badge.jsx
import React from 'react';
import clsx from 'clsx';

export const Badge = ({ children, variant = 'neutral', className = '' }) => {
  const variants = {
    neutral: "bg-gray-100 text-gray-600",
    live: "bg-green-100 text-green-700",
    warning: "bg-yellow-100 text-yellow-700",
    dark: "bg-gray-900 text-white"
  };

  return (
    <span className={clsx(
      "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wide",
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
};