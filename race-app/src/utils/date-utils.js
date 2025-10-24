/**
 * Format a date as YYYY-MM-DD
 * @param {Date|null} date - Date object or null/invalid
 * @returns {string} Formatted date string or empty string
 */
export function formatDate(date) {
  if (!(date instanceof Date) || isNaN(date.getTime())) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
/**
 * Date and time formatting utilities
 * @module utils/date-utils
 */

/**
 * Format completion timestamp for display
 * @param {Date} date - Completion date
 * @returns {string} Formatted time string
 */
export function formatCompletionTime(date) {
  return new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

/**
 * Format race time for display
 * @param {number} time - Time in seconds
 * @returns {string} Formatted time string
 */
export function formatRaceTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = (time % 60).toFixed(2);
  return minutes > 0 ? `${minutes}:${seconds.padStart(5, "0")}` : `${seconds}s`;
}
