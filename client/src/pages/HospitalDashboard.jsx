export default function HospitalDashboard() {
  return (
    <div style={styles.container}>
      <h2>🏥 Hospital ER Readiness</h2>

      <div style={styles.card}>
        <p><strong>Patient:</strong> Incoming Emergency</p>
        <p><strong>ETA:</strong> 6 minutes</p>
        <p><strong>Blood Group:</strong> O+</p>
        <p><strong>Allergies:</strong> None</p>
        <p><strong>Status:</strong> ICU Prepared</p>
      </div>

      <p>
        Hospital receives patient details and prepares ICU / OT before arrival.
      </p>
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
  },
  card: {
    backgroundColor: "#f8f9fa",
    padding: "20px",
    borderRadius: "10px",
    maxWidth: "400px",
    marginBottom: "20px",
  },
};
