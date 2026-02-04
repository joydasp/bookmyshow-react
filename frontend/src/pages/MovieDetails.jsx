import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieDetails } from "../services/omdb";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getMovieDetails(id).then(data => setMovie(data));
  }, [id]);

  if (!movie) return <h2 style={{ padding: "20px" }}>Loading...</h2>;

  return (
    <div style={styles.page}>
      {/* LEFT: Poster */}
      <img
        src={movie.Poster}
        alt={movie.Title}
        style={styles.poster}
      />

      {/* RIGHT: Info */}
      <div style={styles.info}>
        <h1>{movie.Title}</h1>

        <p style={styles.meta}>
          {movie.Year} • {movie.Runtime} • {movie.Genre}
        </p>

        <p style={styles.rating}>
          ⭐ IMDb Rating: {movie.imdbRating}
        </p>

        <p style={styles.plot}>{movie.Plot}</p>

        <button
          onClick={() => navigate(`/movie/${movie.imdbID}/shows`)}
        >
          Book Tickets
        </button>

      </div>
    </div>
  );
};

const styles = {
  page: {
    display: "flex",
    gap: "40px",
    padding: "30px"
  },
  poster: {
    width: "260px",
    borderRadius: "8px"
  },
  info: {
    maxWidth: "600px"
  },
  meta: {
    color: "#555",
    margin: "10px 0"
  },
  rating: {
    margin: "10px 0",
    fontWeight: "bold"
  },
  plot: {
    margin: "20px 0",
    lineHeight: "1.6"
  },
  bookBtn: {
    backgroundColor: "#e31c25",
    color: "#fff",
    border: "none",
    padding: "12px 24px",
    fontSize: "16px",
    borderRadius: "6px",
    cursor: "pointer"
  }
};

export default MovieDetails;
