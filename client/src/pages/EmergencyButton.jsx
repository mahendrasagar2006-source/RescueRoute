import { playRescueAlert } from "../components/EmergencySound";
import { getCurrentLocation } from "../services/location";
import { triggerEmergency } from "../services/api";

export default function EmergencyButton() {
  const triggerEmergencyAction = async () => {
    playRescueAlert();

    try {
      const location = await getCurrentLocation();

      await triggerEmergency({
        location,
        bloodGroup: "O+",
        allergies: "None",
      });

      alert("🚨 Emergency sent to ambulance & hospital");
    } catch (err) {
      alert("Emergency triggered (location unavailable)");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Family Emergency Button</h2>

      <button style={styles.button} onClick={triggerEmergencyAction}>
        🚨 TRIGGER EMERGENCY
      </button>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "60px",
  },
  button: {
    padding: "22px 45px",
    fontSize: "18px",
    backgroundColor: "#d90429",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
  },
};
