import { useEffect, useState } from "react";

import participantService from "@/services/participantService";

export default function useParticipant() {
  const [participant, setParticipant] =
    useState(null);

  useEffect(() => {
    participantService
      .getParticipant()
      .then(setParticipant);
  }, []);

  return participant;
}