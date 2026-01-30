import CountdownTimer from "../components/CountdownTimer";

export default function VehicleAlerts() {
  return (
    <div style={styles.container}>
      <h2>Vehicle Alert System</h2>
      <p>
        Drivers receive vibration + unique sound alerts so they don’t need to
        look at their phones while driving.
      </p>

      <CountdownTimer seconds={90} />
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
  },
};
