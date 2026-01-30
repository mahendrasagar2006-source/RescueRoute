import CountdownTimer from "../components/CountdownTimer";

export default function Demo() {
  return (
    <div style={styles.container}>
      <h2>🚀 Live Emergency Demo</h2>

      <p>
        Emergency → Ambulance dispatched → Vehicles alerted →
        Traffic cleared → Hospital ready
      </p>

      <CountdownTimer seconds={60} />
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    textAlign: "center",
  },
};
