import mongoose from "mongoose";

const showSchema = new mongoose.Schema(
  {
    movieTitle: {
      type: String,
      required: true,
    },
    poster: {
      type: String,
      required: true,
    },
    theatre: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Show = mongoose.model("Show", showSchema);
export default Show;
