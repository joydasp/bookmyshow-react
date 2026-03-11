import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { searchMovies } from "../services/omdb";
import MovieCard from "../components/MovieCard";
import "./SearchResults.css";

const SearchResults = () => {
  const { query } = useParams();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    searchMovies(query).then((data) => {
      if (data.Search) {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }
    });
  }, [query]);

  return (
    <div className="search-page">
      <h2>Search Results for "{query}"</h2>

      <div className="movies-grid">
        {movies.map((movie, index) => (
          <MovieCard key={`${movie.imdbID}-${index}`} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
