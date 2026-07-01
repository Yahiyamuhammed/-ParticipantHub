// src/mock/competitions.js

const now = new Date();

// Helper to generate times relative to right now.
// offsetDays allows us to push events to yesterday (-1) or tomorrow (1).
const getRelativeTime = (offsetMinutes, offsetDays = 0) => {
  const date = new Date(now.getTime() + (offsetMinutes * 60000) + (offsetDays * 24 * 60 * 60 * 1000));
  return date.toISOString();
};

const competitions = [
  // --- PREVIOUS DAYS (Past) ---
  {
    id: "C-080",
    title: "Poetry Writing (Malayalam)",
    stage: "Hall C",
    startTime: getRelativeTime(0, -2), // 2 days ago
    endTime: getRelativeTime(60, -2),
    latitude: 11.691,
    longitude: 75.632,
  },
  {
    id: "C-090",
    title: "Digital Painting",
    stage: "Art Gallery",
    startTime: getRelativeTime(120, -1), // 1 day ago
    endTime: getRelativeTime(240, -1),
    latitude: 11.695,
    longitude: 75.628,
  },

  // --- TODAY: COMPLETED ---
  {
    id: "C-099",
    title: "Water Color Painting",
    stage: "Art Gallery",
    startTime: getRelativeTime(-180), // Started 3 hours ago today
    endTime: getRelativeTime(-120),   
    latitude: 11.695,
    longitude: 75.628,
  },

  // --- TODAY: HAPPENING NOW (LIVE) ---
  {
    id: "C-101",
    title: "Mapila Song",
    stage: "Stage 4",
    startTime: getRelativeTime(-15), // Started 15 mins ago
    endTime: getRelativeTime(30),    
    latitude: 11.691,
    longitude: 75.632,
  },
  {
    id: "C-104",
    title: "Arabic Calligraphy",
    stage: "Indoor Hall B",
    startTime: getRelativeTime(-5),  
    endTime: getRelativeTime(55),    
    latitude: 11.693,
    longitude: 75.630,
  },

  // --- TODAY: STARTING SOON ---
  {
    id: "C-102",
    title: "Essay Writing (English)",
    stage: "Stage 2",
    startTime: getRelativeTime(12),  // Starts in 12 mins
    endTime: getRelativeTime(72),
    latitude: 11.692,
    longitude: 75.633,
  },

  // --- TODAY: LATER ---
  {
    id: "C-103",
    title: "Group Dance (Oppana)",
    stage: "Main Stage",
    startTime: getRelativeTime(120), // Starts in 2 hours
    endTime: getRelativeTime(180),
    latitude: 11.690,
    longitude: 75.630,
  },

  // --- UPCOMING DAYS (Future) ---
  {
    id: "C-110",
    title: "Daffmuttu",
    stage: "Main Stage",
    startTime: getRelativeTime(60, 1), // Tomorrow
    endTime: getRelativeTime(120, 1),
    latitude: 11.690,
    longitude: 75.630,
  },
  {
    id: "C-115",
    title: "Debate (English)",
    stage: "Stage 2",
    startTime: getRelativeTime(0, 2), // 2 days from now
    endTime: getRelativeTime(120, 2),
    latitude: 11.692,
    longitude: 75.633,
  },
  {
    id: "C-120",
    title: "Grand Finale Showcase",
    stage: "Main Stage",
    startTime: getRelativeTime(180, 3), // 3 days from now
    endTime: getRelativeTime(300, 3),
    latitude: 11.690,
    longitude: 75.630,
  }
];

export default competitions;