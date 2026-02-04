import express from "express";
import Booking from "../models/Booking.js";

const router = express.Router();

// Create booking
router.post("/", async (req, res) => {
  const { imdbID, theatre, showTime, seats } = req.body;

  // Find already booked seats
  const existingBookings = await Booking.find({
    imdbID,
    theatre,
    showTime,
  });

  const alreadyBooked = existingBookings.flatMap(b => b.seats);

  // Check conflict
  const conflict = seats.some(seat => alreadyBooked.includes(seat));

  if (conflict) {
    return res.status(400).json({
      error: "Some seats are already booked",
    });
  }

  const booking = await Booking.create(req.body);
  res.status(201).json(booking);
});


// Get booking by ID
router.get("/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    res.json(booking);
  } catch {
    res.status(404).json({ error: "Booking not found" });
  }
});

// Get booked seats for a show
router.get("/seats/booked", async (req, res) => {
  const { imdbID, theatre, showTime } = req.query;

  const bookings = await Booking.find({
    imdbID,
    theatre,
    showTime,
  });

  // Flatten all booked seats
  const bookedSeats = bookings.flatMap(b => b.seats);

  res.json(bookedSeats);
});

export default router;
