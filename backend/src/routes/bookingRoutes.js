import express from "express";
import Booking from "../models/Booking.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ===============================
// CREATE BOOKING
// ===============================
router.post("/", protect, async (req, res) => {
  try {
    const { imdbID, theatre, showTime, seats, totalAmount, movieTitle } = req.body;

    const userId = req.user;

    if (!imdbID || !theatre || !showTime || !seats?.length) {
      return res.status(400).json({ message: "Missing required booking data" });
    }

    const existingBookings = await Booking.find({
      imdbID,
      theatre,
      showTime,
    });

    const alreadyBooked = existingBookings.flatMap(b => b.seats);

    const conflict = seats.some(seat => alreadyBooked.includes(seat));

    if (conflict) {
      return res.status(400).json({
        message: "Some seats are already booked",
      });
    }

    const booking = await Booking.create({
      userId,
      imdbID,
      movieTitle,
      theatre,
      showTime,
      seats,
      totalAmount,
    });

    res.status(201).json(booking);

  } catch (err) {
    console.error("Booking error:", err);
    res.status(500).json({ message: err.message || "Internal server error" });
  }
});

// ===============================
// GET MY BOOKINGS
// ===============================
router.get("/my", protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user })
      .sort({ createdAt: -1 });

    res.json(bookings);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ===============================
// GET BOOKED SEATS (SPECIFIC)
// ===============================
router.get("/seats/booked", async (req, res) => {
  try {
    const { imdbID, theatre, showTime } = req.query;

    const bookings = await Booking.find({
      imdbID,
      theatre,
      showTime,
    });

    const bookedSeats = bookings.flatMap(b => b.seats);
    res.json(bookedSeats);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ===============================
// GET BOOKING BY ID (GENERIC — LAST)
// ===============================
router.get("/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json(booking);
  } catch {
    res.status(404).json({ message: "Booking not found" });
  }
});




export default router;
