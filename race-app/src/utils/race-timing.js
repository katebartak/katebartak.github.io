/**
 * Calculate race animation duration based on distance and horse condition
 * @param {number} distance - Race distance in meters
 * @param {number} condition - Horse condition (1-100)
 * @param {number} trackWidth - Track width
 * @returns {number} Animation duration in milliseconds
 */
export function calculateAnimationDuration(distance, condition, trackWidth) {
  const baseSpeed = 150; // Base pixels per second
  const conditionMultiplier = 0.5 + (condition / 100) * 0.5; // 0.5 to 1.0
  const speed = baseSpeed * conditionMultiplier;
  return Math.round((trackWidth / speed) * 1000); // Convert to milliseconds
}
