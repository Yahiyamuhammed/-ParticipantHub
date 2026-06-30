import { useEffect, useState } from "react";

import competitionService from "@/services/competitionService";

export default function useCompetitions() {
  const [competitions, setCompetitions] =
    useState([]);

  useEffect(() => {
    competitionService
      .getCompetitions()
      .then(setCompetitions);
  }, []);

  return competitions;
}