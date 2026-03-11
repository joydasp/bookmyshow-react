import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieDetails } from "../services/omdb";
import "./MovieDetails.css";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getMovieDetails(id).then(setMovie);
  }, [id]);

  if (!movie) return <h2 className="movie-details-loading">Loading...</h2>;

  return (
    <div className="movie-details-page">
      <img src={movie.Poster} alt={movie.Title} className="movie-details-poster" />

      <div className="movie-details-info">
        <h1>{movie.Title}</h1>
        <p>
          <b>IMDb Rating:</b>  {movie.imdbRating}
        </p>
        <p>
          <b>Genre:</b> {movie.Genre}
        </p>
        <p>
          <b>Runtime:</b> {movie.Runtime}
        </p>
        <p>
          <b>Director:</b> {movie.Director}
        </p>
        <p>
          <b>Actors:</b> {movie.Actors}
        </p>

        <p className="movie-details-plot">{movie.Plot}</p>

        <button
          className="movie-details-book-btn"
          onClick={() =>
            navigate(`/movie/${id}/shows`, {
              state: { movieTitle: movie.Title }
            })
          }
        >
          Book Tickets
        </button>
      </div>
    </div>
  );
};

export default MovieDetails;
