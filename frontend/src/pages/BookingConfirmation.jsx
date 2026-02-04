import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";


const BookingConfirmation = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/bookings/${id}`
    )
      .then(res => res.json())
      .then(setBooking);
  }, [id]);

  if (!booking) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: "30px" }}>
      <h1>Booking Confirmed 🎉</h1>

      <p><strong>Movie:</strong> {booking.movieTitle}</p>
      <p><strong>Theatre:</strong> {booking.theatre}</p>
      <p><strong>Show Time:</strong> {booking.showTime}</p>
      <p>
        <strong>Seats:</strong>{" "}
        {booking.seats ? booking.seats.join(", ") : "N/A"}
      </p>

      <p><strong>Total Paid:</strong> ₹{booking.totalAmount}</p>
    </div>
  );
};

export default BookingConfirmation;
