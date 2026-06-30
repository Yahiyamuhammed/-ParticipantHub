import { APP_CONFIG } from "@/config/app";

export function saveParticipant(data) {
  localStorage.setItem(
    APP_CONFIG.STORAGE_KEY,
    JSON.stringify(data)
  );
}

export function getParticipant() {
  const data = localStorage.getItem(
    APP_CONFIG.STORAGE_KEY
  );

  if (!data) return null;

  return JSON.parse(data);
}

export function clearParticipant() {
  localStorage.removeItem(
    APP_CONFIG.STORAGE_KEY
  );
}