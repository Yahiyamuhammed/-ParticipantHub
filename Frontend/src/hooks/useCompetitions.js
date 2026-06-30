// src/hooks/useCompetitions.js
import { useQuery } from "@tanstack/react-query";
import competitionService from "@/services/competitionService";
import { APP_CONFIG } from "@/config/app";

export default function useCompetitions() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['competitions'],
    queryFn: competitionService.getCompetitions,
    refetchInterval: APP_CONFIG.REFRESH_INTERVAL, // Polls every 60s as required
  });

  return { competitions: data || [], isLoading, isError };
}