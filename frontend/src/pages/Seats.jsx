import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import seatLayout from "../data/seatLayout";
import "./Seats.css";

const Seats = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [isBooking, setIsBooking] = useState(false);

  const imdbID = state?.imdbID;
  const theatre = state?.theatre || state?.theatreName;
  const showTime = state?.time;
  const movieTitle = state?.movieTitle;

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/bookings/seats/booked` +
        `?imdbID=${imdbID}&theatre=${theatre}&showTime=${showTime}`
    )
      .then((res) => res.json())
      .then(setBookedSeats)
      .catch(console.error);
  }, [imdbID, theatre, showTime]);

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
      <p>{showTime}</p>

      <div className="seat-legend" aria-label="Seat status legend">
        <span className="legend-item">
          <span className="legend-dot available" />
          Available
        </span>
        <span className="legend-item">
          <span className="legend-dot selected" />
          Selected
        </span>
        <span className="legend-item">
          <span className="legend-dot sold" />
          Sold
        </span>
      </div>

      {seatLayout.map((section) => (
        <div key={section.category} className="section">
          <p className="price-label">Rs. {section.price} {section.category}</p>

          <div className="rows-wrap">
            {section.rows.map((r) => (
              <div key={r.row} className="row">
                <span className="row-label">{r.row}</span>

                <div className="seat-block">
                  {r.left.map((n) => {
                    const seat = `${r.row}${n}`;
                    const isSelected = selectedSeats.some((s) => s.seat === seat);
                    const isBooked = bookedSeats.includes(seat);

                    return (
                      <button
                        key={seat}
                        disabled={isBooked}
                        className={`seat ${isSelected ? "selected" : ""} ${
                          isBooked ? "sold" : ""
                        }`}
                        onClick={() => toggleSeat(seat, section.price)}
                      >
                        {n}
                      </button>
                    );
                  })}
                </div>

                <div className="aisle" />

                <div className="seat-block">
                  {r.right.map((n) => {
                    const seat = `${r.row}${n}`;
                    const isSelected = selectedSeats.some((s) => s.seat === seat);
                    const isBooked = bookedSeats.includes(seat);

                    return (
                      <button
                        key={seat}
                        disabled={isBooked}
                        className={`seat ${isSelected ? "selected" : ""} ${
                          isBooked ? "sold" : ""
                        }`}
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
        </div>
      ))}

      <div className="screen">All eyes this way please</div>

      <div className="summary">
        <p>
          Seats:{" "}
          {selectedSeats.length
            ? selectedSeats.map((s) => s.seat).join(", ")
            : "None"}
        </p>
        <p>Total: Rs. {total}</p>

        <button
          disabled={!selectedSeats.length || isBooking}
          className="proceed"
          onClick={async () => {
            setIsBooking(true);
            console.log({
              userId,
              imdbID,
              movieTitle,
              theatre,
              showTime,
              seats: selectedSeats.map((s) => s.seat),
              total,
            });

            try {
              navigate("/payment", {
                state: {
                  imdbID,
                  movieTitle,
                  theatre,
                  showTime,
                  seats: selectedSeats.map((s) => s.seat),
                  totalAmount: total,
                },
              });
            } catch (err) {
              alert(err.message);
              setSelectedSeats([]);
              setIsBooking(false);
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
