import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={styles.nav}>
      <h3 style={styles.logo}>🚑 RescueRoute</h3>
      <div style={styles.links}>
        <Link to="/">Home</Link>
        <Link to="/emergency">Emergency</Link>
        <Link to="/vehicles">Vehicles</Link>
        <Link to="/hospital">Hospital</Link>
        <Link to="/demo">Demo</Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 20px",
    backgroundColor: "#d90429",
    color: "#fff",
  },
  logo: {
    margin: 0,
  },
  links: {
    display: "flex",
    gap: "15px",
  },
};
