// src/features/dashboard/components/AlertBox.jsx
import React from "react";
import { Bell } from "lucide-react";

export default function AlertBox() {
  return (
    <div className="bg-brand-accent/20 border border-brand-accent/40 rounded-2xl p-4 flex items-start gap-4">
      <div className="bg-brand-accent p-2 rounded-xl shrink-0">
        <Bell className="w-5 h-5 text-brand-dark" />
      </div>
      <div>
        <h4 className="text-[14px] font-bold text-brand-accent uppercase tracking-wider mb-0.5">
          Urgent Update
        </h4>
        <p className="text-[13px] text-brand-cream/90 leading-snug">
          Stage 4 events moved to Main Hall due to weather.
        </p>
      </div>
    </div>
  );
}