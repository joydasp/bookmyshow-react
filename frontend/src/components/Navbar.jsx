const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <h2 style={styles.logo}>BookMyShow</h2>
        <input
          type="text"
          placeholder="Search for Movies, Events, Plays..."
          style={styles.search}
        />
      </div>

      <div style={styles.right}>
        <span style={styles.city}>Hyderabad</span>
        <button style={styles.signIn}>Sign In</button>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 24px",
    backgroundColor: "#fff",
    alignItems: "center",
    borderBottom: "1px solid #eee"
  },
  left: {
    display: "flex",
    alignItems: "center",
    gap: "20px"
  },
  logo: {
    color: "#e31c25",
    margin: 0
  },
  search: {
    width: "300px",
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc"
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "20px"
  },
  city: {
    fontSize: "14px"
  },
  signIn: {
    backgroundColor: "#e31c25",
    color: "#fff",
    border: "none",
    padding: "8px 14px",
    borderRadius: "4px",
    cursor: "pointer"
  }
};

export default Navbar;
