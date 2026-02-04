import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import BannerCarousel from "../components/BannerCarousel";
import MovieCard from "../components/MovieCard";
import { searchMovies } from "../services/omdb";
import { checkBackendHealth } from "../services/backend";

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    searchMovies("Batman").then(data => {
      if (data.Search) {
        setMovies(data.Search);
      }
    });
  }, []);
 
  useEffect(() => {
  checkBackendHealth()
    .then(data => {
      console.log("Backend says:", data.status);
    })
    .catch(err => {
      console.error("Backend not reachable", err);
    });
}, []);

  return (
    <>
      <Navbar />
      <div style={{ padding: "20px" }}>
       <BannerCarousel /> 


        <h2 style={{ margin: "30px 0 20px" }}>Recommended Movies</h2>

        <div style={styles.grid}>
          {movies.map((movie, index) => (
            <MovieCard
              key={`${movie.imdbID}-${movie.Type}-${index}`}
              movie={movie}
            />
          ))}

        </div>
      </div>
    </>
  );
};

const styles = {
  grid: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap"
  }
};

export default Home;
