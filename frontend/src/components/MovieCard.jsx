import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.imdbID}`} style={{ textDecoration: "none" }}>
      <div style={styles.card}>
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "https://placehold.co/180x270"}
          alt={movie.Title}
          style={styles.image}
        />
        <h4 style={styles.title}>{movie.Title}</h4>
        <p style={styles.year}>{movie.Year}</p>
      </div>
    </Link>
  );
};

const styles = {
  card: {
    width: "180px",
    cursor: "pointer"
  },
  image: {
    width: "100%",
    borderRadius: "8px"
  },
  title: {
    marginTop: "8px",
    fontSize: "14px",
    color: "#000"
  },
  year: {
    fontSize: "12px",
    color: "#666"
  }
};

export default MovieCard;
