/**
 * Rescue score logic for driver behavior
 */

function getScoreForAction(action) {
  switch (action) {
    case "EARLY_YIELD":
      return 10;
    case "ON_TIME_YIELD":
      return 7;
    case "LATE_YIELD":
      return 3;
    case "BLOCKED_AMBULANCE":
      return -15;
    case "REPORTED_BLOCK":
      return 5;
    default:
      return 0;
  }
}

function getRescueLevel(totalScore) {
  if (totalScore >= 100) return "PLATINUM";
  if (totalScore >= 60) return "GOLD";
  if (totalScore >= 30) return "SILVER";
  if (totalScore >= 10) return "BRONZE";
  return "NEW";
}

module.exports = { getScoreForAction, getRescueLevel };
