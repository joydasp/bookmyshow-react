import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js"; // ✅ ADD THIS LINE
import showRoutes from  "./routes/showRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";


dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// ✅ Call DB connection
connectDB();

app.use("/api/bookings", bookingRoutes);
app.use("/api/shows", showRoutes);

// Test route
app.get("/api/health", (req, res) => {
  res.json({ status: "Backend is running 🚀" });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
