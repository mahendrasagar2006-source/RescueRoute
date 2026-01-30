export default function TrafficDashboard() {
  return (
    <div style={styles.container}>
      <h2>🚦 Smart Traffic Signal Dashboard</h2>

      <ul>
        <li>Signal A → GREEN</li>
        <li>Signal B → GREEN</li>
        <li>Signal C → GREEN</li>
      </ul>

      <p>
        Traffic signals automatically turn green along the ambulance route using
        API integration.
      </p>
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
  },
};
