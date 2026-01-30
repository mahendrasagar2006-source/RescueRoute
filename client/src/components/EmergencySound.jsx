import rescueSound from "../assets/sounds/rescue-alert.mp3";
import { vibrate } from "../utils/vibrationPatterns";

let audioInstance = null;

/**
 * Plays RescueRoute emergency alert sound
 * + triggers unique vibration pattern
 */
export function playRescueAlert() {
  try {
    // Create audio instance only once
    if (!audioInstance) {
      audioInstance = new Audio(rescueSound);
      audioInstance.volume = 0.85;
    }

    // Restart sound if already playing
    audioInstance.currentTime = 0;
    audioInstance.play().catch(() => {
      console.warn("Sound playback requires user interaction");
    });

    // Trigger vibration pattern
    vibrate("AMBULANCE_APPROACH");
  } catch (error) {
    console.error("Emergency sound error:", error);
  }
}

/**
 * Stop emergency sound (optional use)
 */
export function stopRescueAlert() {
  if (audioInstance) {
    audioInstance.pause();
    audioInstance.currentTime = 0;
  }
}
