import { Link } from "react-router-dom";
import "./MovieCard.css";

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.imdbID}`} state={{ movieTitle: movie.Title }} className="movie-card-link">
      <article className="movie-card">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "https://placehold.co/180x270"}
          alt={movie.Title}
          className="movie-card-image"
        />
        <h4 className="movie-card-title">{movie.Title}</h4>
        <p className="movie-card-year">{movie.Year}</p>
      </article>
    </Link>
  );
};

export default MovieCard;
