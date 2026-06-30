// src/mock/competitions.js

// Helper to generate times relative to right now
const now = new Date();
const getRelativeTime = (offsetMinutes) => {
  const date = new Date(now.getTime() + offsetMinutes * 60000);
  return date.toISOString();
};

const competitions = [
  {
    id: "C-101",
    title: "Mapila Song",
    stage: "Stage 4",
    startTime: getRelativeTime(-10), // Started 10 mins ago
    endTime: getRelativeTime(20),    // Ends in 20 mins -> LIVE NOW
    latitude: 11.691,
    longitude: 75.632,
  },
  {
    id: "C-102",
    title: "Essay Writing",
    stage: "Stage 2",
    startTime: getRelativeTime(12),  // Starts in 12 mins -> STARTING SOON
    endTime: getRelativeTime(72),
    latitude: 11.692,
    longitude: 75.633,
  },
  {
    id: "C-103",
    title: "Group Dance",
    stage: "Main Stage",
    startTime: getRelativeTime(120), // Starts in 2 hours -> LATER TODAY
    endTime: getRelativeTime(180),
    latitude: 11.690,
    longitude: 75.630,
  }
];

export default competitions;