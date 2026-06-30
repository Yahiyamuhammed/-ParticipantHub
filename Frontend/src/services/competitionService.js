// src/services/competitionService.js
import competitions from "@/mock/competitions"; // Adjust path if your mock file is named differently

// Helper function to simulate a slow network (1.5 seconds)
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const competitionService = {
  getCompetitions: async () => {
    await delay(1500); // Forces the app to wait 1.5s, showing the skeletons
    return competitions;
  }
};

export default competitionService;