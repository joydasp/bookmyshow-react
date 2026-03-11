import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      ref: "User",
      required: true,
    },
    imdbID: String,
    movieTitle: String,
    theatre: String,
    showTime: String,
    seats: [String],
    totalAmount: Number,
    snackTotal: {
      type: Number,
      default: 0,
    },
    snacks: [
      {
        id: Number,
        name: String,
        price: Number,
        image: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
