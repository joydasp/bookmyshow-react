import { useEffect, useState } from "react";
import "./MyBookings.css";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/bookings/my`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();
      setBookings(data);
    };

    fetchBookings();
  }, []);

  return (
    <div className="my-bookings-page">
      <h1>My Bookings</h1>

      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        bookings.map((booking) => (
          <article key={booking._id} className="my-booking-card">
            <h3>{booking.movieTitle}</h3>
            <p>Theatre: {booking.theatre}</p>
            <p>Time: {booking.showTime}</p>
            <p>Seats: {booking.seats.join(", ")}</p>
            <p>Total: {booking.totalAmount}</p>
          </article>
        ))
      )}
    </div>
  );
};

export default MyBookings;
