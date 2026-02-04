import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import seatLayout from "../data/seatLayout";
import "./Seats.css";

import { createBooking } from "../services/backend";

const Seats = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

   // ✅ Hooks MUST be at top level
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);  

  const [isBooking, setIsBooking] = useState(false);

  // ✅ Guard values (not hooks)
  const imdbID = state?.imdbID;
  const theatre = state?.theatre;
  const time = state?.time;
  const movieTitle = state?.movieTitle;
  
  // ✅ Fetch already booked seats
  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/bookings/seats/booked` +
        `?imdbID=${imdbID}&theatre=${theatre}&showTime=${time}`
    )
      .then((res) => res.json())
      .then(setBookedSeats)
      .catch(console.error);
  }, [imdbID, theatre, time]);

  // Safety check
  if (!state) {
    return <h2>Invalid navigation. Please go back.</h2>;
  }

  const toggleSeat = (seat, price) => {
    setSelectedSeats((prev) =>
      prev.some((s) => s.seat === seat)
        ? prev.filter((s) => s.seat !== seat)
        : [...prev, { seat, price }]
    );
  };

  const total = selectedSeats.reduce((sum, s) => sum + s.price, 0);

  return (
    <div className="seats-page">
      <h2>{theatre}</h2>
      <p>{time}</p>

      {seatLayout.map((section) => (
        <div key={section.category} className="section">
          <p className="price-label">
            ₹{section.price} {section.category}
          </p>

          {section.rows.map((r) => (
            <div key={r.row} className="row">
              <span className="row-label">{r.row}</span>

              {/* LEFT BLOCK */}
              <div className="seat-block">
                {r.left.map((n) => {
                  const seat = `${r.row}${n}`;
                  const isSelected = selectedSeats.some(
                    (s) => s.seat === seat
                  );
                  const isBooked = bookedSeats.includes(seat);

                  return (
                    <button
                      key={seat}
                      disabled={isBooked}
                      className={`seat 
                        ${isSelected ? "selected" : ""} 
                        ${isBooked ? "sold" : ""}`}
                      onClick={() => toggleSeat(seat, section.price)}
                    >
                      {n}
                    </button>
                  );
                })}
              </div>

              <div className="aisle" />

              {/* RIGHT BLOCK */}
              <div className="seat-block">
                {r.right.map((n) => {
                  const seat = `${r.row}${n}`;
                  const isSelected = selectedSeats.some(
                    (s) => s.seat === seat
                  );
                  const isBooked = bookedSeats.includes(seat);

                  return (
                    <button
                      key={seat}
                      disabled={isBooked}
                      className={`seat 
                        ${isSelected ? "selected" : ""} 
                        ${isBooked ? "sold" : ""}`}
                      onClick={() => toggleSeat(seat, section.price)}
                    >
                      {n}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ))}

      {/* Screen */}
      <div className="screen">All eyes this way please</div>

      {/* Summary */}
      <div className="summary">
        <p>
          Seats:{" "}
          {selectedSeats.length
            ? selectedSeats.map((s) => s.seat).join(", ")
            : "None"}
        </p>
        <p>Total: ₹{total}</p>

       <button
        disabled={!selectedSeats.length || isBooking}
        className="proceed"
        onClick={async () => {
          setIsBooking(true);

          try {
            const booking = await createBooking({
              imdbID,
              movieTitle,
              theatre,
              showTime: time,
              seats: selectedSeats.map((s) => s.seat),
              totalAmount: total,
            });

            navigate(`/booking/${booking._id}`);
          } catch (err) {
            alert(err.message);              // 🔔 Show error
            setSelectedSeats([]);            // 🔥 CLEAR SELECTED SEATS HERE
            setIsBooking(false);             // Re-enable button
          }
        }}
      >
        {isBooking ? "Booking..." : "Proceed"}
      </button>

      </div>
    </div>
  );
};

export default Seats;
