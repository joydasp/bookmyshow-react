import mongoose from "mongoose";

const theatreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: String
});

export default mongoose.model("Theatre", theatreSchema);
