// src/components/shared/ResultCard.jsx
import React, { useState } from "react";
import { ChevronDown, FileText, Medal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ResultCard({ result }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Helper function to render a unified leaderboard row
  const renderRow = (rank, name, grade, marks, isUser = false) => {
    // 1st place gets the Gold accent
    const isFirst = rank === 1;

    return (
      <div 
        key={`rank-${rank}-${name}`}
        className={`flex items-center justify-between p-3 rounded-xl border transition-colors ${
          isUser 
            ? "bg-brand-accent/15 border-brand-accent/30" // The user's row highlighted in light gold theme
            : "bg-transparent border-transparent hover:bg-brand-dark/5"
        }`}
      >
        <div className="flex items-center gap-4">
          <span className={`w-4 text-center font-black text-[14px] ${isFirst ? 'text-brand-accent' : 'text-brand-textMuted/70'}`}>
            {rank}
          </span>
          <span className={`font-bold text-[14px] ${isUser ? 'text-brand-dark' : 'text-brand-textDark'}`}>
            {name}
          </span>
        </div>
        
        <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-wider">
          <span className="text-brand-textMuted">{marks} pts</span>
          {/* Grade gets the dark green pop */}
          <span className="text-brand-dark bg-brand-dark/5 px-2 py-0.5 rounded">
            {grade}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="overflow-hidden bg-brand-card border border-black/5 rounded-2xl shadow-sm">
      
      {/* Clickable Header */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-4 cursor-pointer hover:bg-brand-cream/50 transition-colors flex items-center justify-between"
      >
        <div>
          <h3 className="font-bold text-brand-textDark text-[16px] leading-tight pr-4">
            {result.competitionTitle}
          </h3>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-[12px] font-bold uppercase tracking-wider text-brand-textMid">
              Rank {result.userResult.rank} • Grade {result.userResult.grade}
            </span>
          </div>
        </div>
        
        {/* Replaced the "Published" badge with a sleek expand button */}
        <div className="shrink-0 flex items-center justify-center w-9 h-9 rounded-full bg-brand-dark/5">
          <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="w-5 h-5 text-brand-dark" />
          </motion.div>
        </div>
      </div>

      {/* Expandable Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-4 pt-1 border-t border-black/5">
              
              <div className="flex flex-col gap-1 mb-4">
                {/* Render the Top 3 Winners */}
                {result.topWinners.map((winner) => 
                  renderRow(
                    winner.rank, 
                    winner.name, 
                    winner.grade || "-", // Added fallback in case mock data is missing this
                    winner.marks || "0", 
                    result.userResult.rank === winner.rank // Highlight if user is in top 3
                  )
                )}

                {/* If the user is NOT in the top 3, show a divider and their rank at the bottom */}
                {result.userResult.rank > 3 && (
                  <>
                    <div className="flex items-center gap-3 py-1 px-4">
                      <div className="w-1 h-1 rounded-full bg-black/10"></div>
                      <div className="w-1 h-1 rounded-full bg-black/10"></div>
                      <div className="w-1 h-1 rounded-full bg-black/10"></div>
                    </div>
                    {renderRow(
                      result.userResult.rank, 
                      "Yahiya Muhammed", // Replace with dynamic user name if passed down
                      result.userResult.grade, 
                      result.userResult.marks, 
                      true // Always highlight this row
                    )}
                  </>
                )}
              </div>

              {/* Thematic PDF Button */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(result.pdfLink, "_blank");
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-brand-dark/10 text-[12px] font-bold uppercase tracking-wider text-brand-dark hover:bg-brand-dark/5 active:scale-[0.98] transition-all"
              >
                <FileText className="w-4 h-4" />
                View Full Result PDF
              </button>
              
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}