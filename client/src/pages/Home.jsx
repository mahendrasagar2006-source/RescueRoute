import MapView from "../components/MapView";

export default function Home() {
  return (
    <div style={styles.container}>
      <h1>🚑 RescueRoute</h1>
      <p>
        A city-wide emergency coordination system that clears ambulance routes,
        guides vehicles safely, prepares hospitals in advance, and saves lives.
      </p>
      <MapView />
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    textAlign: "center",
  },
};
