import { useEffect, useState } from "react";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/bookings/my`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      setBookings(data);
    };

    fetchBookings();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h1>My Bookings</h1>

      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        bookings.map((booking) => (
          <div key={booking._id} style={styles.card}>
            <h3>{booking.movieTitle}</h3>
            <p>Theatre: {booking.theatre}</p>
            <p>Time: {booking.showTime}</p>
            <p>Seats: {booking.seats.join(", ")}</p>
            <p>Total: ₹{booking.totalAmount}</p>
          </div>
        ))
      )}
    </div>
  );
};

const styles = {
  card: {
    marginTop: "20px",
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "6px",
  },
};

export default MyBookings;
