/**
 * Calculate ETA based on distance and average speed
 * distanceKm: number
 * speedKmph: number (default ambulance speed)
 */

function calculateETA(distanceKm, speedKmph = 40) {
  if (!distanceKm || distanceKm <= 0) return "Unknown";

  const timeInHours = distanceKm / speedKmph;
  const timeInMinutes = Math.ceil(timeInHours * 60);

  return `${timeInMinutes} minutes`;
}

module.exports = { calculateETA };
