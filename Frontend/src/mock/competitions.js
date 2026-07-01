// src/mock/competitions.js

// Helper to generate times relative to right now so the UI is always testable
const now = new Date();
const getRelativeTime = (offsetMinutes) => {
  const date = new Date(now.getTime() + offsetMinutes * 60000);
  return date.toISOString();
};

const competitions = [
  // --- HAPPENING NOW (LIVE) ---
  {
    id: "C-101",
    title: "Mapila Song",
    stage: "Stage 4",
    startTime: getRelativeTime(15), // Started 15 mins ago
    endTime: getRelativeTime(30),    // Ends in 30 mins
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

  // --- STARTING SOON (Warning colors) ---
  {
    id: "C-102",
    title: "Essay Writing (English)",
    stage: "Stage 2",
    startTime: getRelativeTime(12),  // Starts in 12 mins
    endTime: getRelativeTime(72),
    latitude: 11.692,
    longitude: 75.633,
  },
  {
    id: "C-105",
    title: "Elocution (Malayalam)",
    stage: "Stage 1",
    startTime: getRelativeTime(45),  // Starts in 45 mins
    endTime: getRelativeTime(90),
    latitude: 11.694,
    longitude: 75.631,
  },

  // --- LATER TODAY / UPCOMING ---
  {
    id: "C-103",
    title: "Group Dance (Oppana)",
    stage: "Main Stage",
    startTime: getRelativeTime(120), // Starts in 2 hours
    endTime: getRelativeTime(180),
    latitude: 11.690,
    longitude: 75.630,
  },
  {
    id: "C-106",
    title: "Quiz Competition Finals",
    stage: "Main Stage",
    startTime: getRelativeTime(240), // Starts in 4 hours
    endTime: getRelativeTime(300),
    latitude: 11.690,
    longitude: 75.630,
  },

  // --- COMPLETED ---
  {
    id: "C-099",
    title: "Water Color Painting",
    stage: "Art Gallery",
    startTime: getRelativeTime(-180), // Started 3 hours ago
    endTime: getRelativeTime(-120),   // Ended 2 hours ago
    latitude: 11.695,
    longitude: 75.628,
  },
  {
    id: "C-100",
    title: "Pencil Drawing",
    stage: "Art Gallery",
    startTime: getRelativeTime(-240), 
    endTime: getRelativeTime(-180),   
    latitude: 11.695,
    longitude: 75.628,
  }
];

export default competitions;