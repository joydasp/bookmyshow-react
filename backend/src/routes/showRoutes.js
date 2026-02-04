import express from "express";
import { mockShowtimes } from "../data/showtimes.js";

const router = express.Router();

/**
 * GET /api/shows/:imdbID
 * Returns showtimes for a movie (mocked theatres)
 */
router.get("/:imdbID", (req, res) => {
  const { imdbID } = req.params;

  res.json({
    movieId: imdbID,
    theatres: mockShowtimes
  });
});

export default router;
