export function getCompetitionStatus(
  startTime,
  endTime
) {
  const now = new Date();

  const start = new Date(startTime);

  const end = new Date(endTime);

  if (now < start) {
    return "upcoming";
  }

  if (now > end) {
    return "completed";
  }

  return "live";
}

export function minutesUntil(date) {
  const diff =
    new Date(date).getTime() - Date.now();

  return Math.floor(diff / 60000);
}