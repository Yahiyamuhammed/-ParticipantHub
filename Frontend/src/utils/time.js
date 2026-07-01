// src/utils/time.js

/**
 * Calculates the dynamic status of an event based on current time.
 * @param {string} startTime - ISO string
 * @param {string} endTime - ISO string
 * @returns {Object} { label: string, variant: string, isLive: boolean }
 */
export function getEventStatus(startTime, endTime) {
  const now = new Date();
  const start = new Date(startTime);
  const end = new Date(endTime);

  // 1. Completed
  if (now > end) {
    return { label: "Completed", variant: "neutral", isLive: false };
  }

  // 2. Live Now
  if (now >= start && now <= end) {
    const remainingMinutes = Math.ceil((end - now) / (1000 * 60));

    return {
      label: "Happening Now",
      remaining: `${remainingMinutes} min left`,
      variant: "live",
      isLive: true,
    };
  }

  // 3. Upcoming
  const diffInMinutes = Math.floor((start - now) / (1000 * 60));

  if (diffInMinutes <= 60 && diffInMinutes > 0) {
    return {
      label: `Starts in ${diffInMinutes} min`,
      variant: diffInMinutes <= 15 ? "warning" : "dark", // Amber if very close, Black otherwise
      isLive: false,
    };
  }

  // Format standard time if more than an hour away (e.g., "10:30 AM")
  const formattedTime = start.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return {
    label: `Starts at ${formattedTime}`,
    variant: "neutral",
    isLive: false,
  };
}

/**
 * Formats a date for the Schedule Tabs (e.g., "Day 3")
 */
export function formatEventDay(dateString, eventStartDate) {
  // Logic to calculate "Day X" relative to the start of the 6-day event
  // For now, return standard date format
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}
