import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    imdbID: String,
    theatre: String,
    showTime: String,
    seats: [String], // e.g. ["A1", "A2"]
    totalAmount: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
