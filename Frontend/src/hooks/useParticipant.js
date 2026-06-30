// src/hooks/useParticipant.js
import { useQuery } from "@tanstack/react-query";
import participantService from "@/services/participantService";
import { useAuth } from "@/context/AuthContext";

export default function useParticipant() {
  const { user } = useAuth(); // Get the ID from local storage session

  const { data, isLoading, isError } = useQuery({
    // Cache key includes user ID so it automatically invalidates if a different user logs in
    queryKey: ['participant', user?.id], 
    queryFn: () => participantService.getParticipant(user.id),
    enabled: !!user?.id, // Prevents fetching if user is not logged in
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  return { participant: data, isLoading, isError };
}