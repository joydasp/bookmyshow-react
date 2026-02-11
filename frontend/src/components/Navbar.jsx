import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const userName = localStorage.getItem("userName");

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/");
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <h2 style={styles.logo}>BookMyShow</h2>
      </div>

      <div style={styles.right}>
        {isLoggedIn ? (
          <>
            <span>Hi, {userName}</span>
            <Link to="/my-bookings">My Bookings</Link>
            <button style={styles.logout} onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <button
            style={styles.signIn}
            onClick={() => navigate("/login")}
          >
            Sign In
          </button>
        )}
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
  },
  logout: {
  backgroundColor: "#333",
  color: "#fff",
  border: "none",
  padding: "8px 14px",
  borderRadius: "4px",
  cursor: "pointer"
}

};

export default Navbar;
