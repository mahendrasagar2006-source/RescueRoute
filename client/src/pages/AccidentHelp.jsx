export default function AccidentHelp() {
  return (
    <div style={styles.container}>
      <h2>🚑 Accident Assistance</h2>

      <p>
        If the victim is unconscious, any bystander can trigger emergency help
        from the lock screen or their own phone.
      </p>

      <ul>
        <li>📍 Location shared instantly</li>
        <li>🚑 Ambulance dispatched</li>
        <li>🏥 Hospital alerted</li>
      </ul>
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
  },
};
