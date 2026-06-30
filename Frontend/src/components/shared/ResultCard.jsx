// src/components/shared/ResultCard.jsx
import React, { useState } from "react";
import { ChevronDown, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "@/components/common/Card";
import { Badge } from "@/components/ui/Badge";
import Button from "@/components/common/Button";

export default function ResultCard({ result }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card 
      padding="p-0" 
      className="overflow-hidden bg-white border border-gray-100"
    >
      {/* Clickable Header */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-4 cursor-pointer hover:bg-gray-50 transition-colors flex items-center justify-between"
      >
        <div>
          <h3 className="font-bold text-gray-900">{result.competitionTitle}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-semibold text-gray-600">
              Grade {result.userResult.grade} • Rank {result.userResult.rank}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Badge variant="live">Published</Badge>
          <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="w-5 h-5 text-gray-400" />
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
            <div className="px-4 pb-4 pt-2 border-t border-gray-100">
              {/* Top 3 Leaderboard ... */}
              <div className="space-y-2 mb-4">
                {result.topWinners.map((winner) => (
                  <div key={winner.rank} className="flex justify-between items-center text-sm">
                    <div className="flex gap-3 text-gray-600">
                      <span className="font-bold text-gray-400 w-4">{winner.rank}</span>
                      <span>{winner.name}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* User's Specific Result row */}
              <div className="bg-gray-50 rounded-xl p-3 flex justify-between items-center mb-4 border border-gray-100">
                <span className="font-bold text-gray-900">You</span>
                <div className="flex gap-4 text-sm font-semibold">
                  <span className="text-gray-600">Rank {result.userResult.rank}</span>
                  <span className="text-green-600">Grade {result.userResult.grade}</span>
                  <span className="text-gray-600">{result.userResult.marks} pts</span>
                </div>
              </div>

              <Button 
                variant="outline" 
                fullWidth 
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(result.pdfLink, "_blank");
                }}
              >
                <FileText className="w-4 h-4 mr-2" />
                View Full Result PDF
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}