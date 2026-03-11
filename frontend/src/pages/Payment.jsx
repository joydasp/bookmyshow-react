import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createBooking } from "../services/backend";
import snacks from "../data/snacks";
import "./Payment.css";

const Payment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [selectedSnacks, setSelectedSnacks] = useState([]);

  const toggleSnack = (snack) => {
    setSelectedSnacks((prev) =>
      prev.some((s) => s.id === snack.id)
        ? prev.filter((s) => s.id !== snack.id)
        : [...prev, snack]
    );
  };

  if (!state) {
    return <h2 className="payment-invalid">Invalid payment request</h2>;
  }

  const { imdbID, movieTitle, theatre, showTime, seats, totalAmount } = state;
  const seatsTotal = Number(totalAmount) || 0;
  const snackTotal = selectedSnacks.reduce((sum, s) => sum + s.price, 0);
  const finalTotal = seatsTotal + snackTotal;

  const handlePayment = async () => {
    try {
      const booking = await createBooking({
        imdbID,
        movieTitle,
        theatre,
        showTime,
        seats,
        totalAmount: finalTotal,
        snacks: selectedSnacks,
        snackTotal
      });

      navigate(`/booking/${booking._id}`, {
        state: {
          snacks: selectedSnacks,
          snackTotal
        }
      });
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="payment-page">
      <div className="payment-card">
        <h1>Payment</h1>
        <h3>{movieTitle}</h3>
        <p>Theatre: {theatre}</p>
        <p>Show Time: {showTime}</p>
        <p>Seats: {seats.join(", ")}</p>
        <p>Seats Total: Rs. {seatsTotal}</p>
        <p>Snacks Total: Rs. {snackTotal}</p>
        <h2>Total Payable: Rs. {finalTotal}</h2>

        <button className="payment-btn" onClick={handlePayment}>
          Pay Now
        </button>
      </div>

      <h2>Add Snacks</h2>

      <div className="snacks-grid">
        {snacks.map((snack) => {
          const selected = selectedSnacks.some((s) => s.id === snack.id);

          return (
            <div
              key={snack.id}
              className={`snack-card ${selected ? "selected-snack" : ""}`}
              onClick={() => toggleSnack(snack)}
            >
              <img src={snack.image} alt={snack.name} />
              <h4>{snack.name}</h4>
              <p>Rs. {snack.price}</p>
            </div>
          );
        })}
      </div>

      <p>Seats Total: Rs. {seatsTotal}</p>
      <p>Snacks Total: Rs. {snackTotal}</p>
      <h3>Total Payable: Rs. {finalTotal}</h3>
    </div>
  );
};

export default Payment;
