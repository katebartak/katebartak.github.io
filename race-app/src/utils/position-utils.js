/**
 * Position utilities for race results
 * @module utils/position-utils
 */

/**
 * Get position icon for top 3 finishers
 * @param {number} position - Horse position
 * @returns {string} Icon name
 */
export function getPositionIcon(position) {
  switch (position) {
    case 1:
      return 'mdi-trophy';
    case 2:
      return 'mdi-medal';
    case 3:
      return 'mdi-medal-outline';
    default:
      return '';
  }
}

/**
 * Get position icon color for top 3 finishers
 * @param {number} position - Horse position
 * @returns {string} Color name
 */
export function getPositionIconColor(position) {
  switch (position) {
    case 1:
      return 'amber';
    case 2:
      return 'grey';
    case 3:
      return 'orange';
    default:
      return 'grey';
  }
}

/**
 * Get CSS class for position-based styling
 * @param {number} position - Horse position
 * @returns {string} CSS class name
 */
export function getPositionClass(position) {
  switch (position) {
    case 1:
      return 'position-first';
    case 2:
      return 'position-second';
    case 3:
      return 'position-third';
    default:
      return 'position-other';
  }
}
