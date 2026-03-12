import { useEffect, useState } from "react";
import BannerCarousel from "../components/BannerCarousel";
import MovieCard from "../components/MovieCard";
import { searchMovies } from "../services/omdb";
import "./Home.css";
import Footer from "../components/Footer";

const Home = () => {
  const [recommended, setRecommended] = useState([]);
  const [trending, setTrending] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);

  useEffect(() => {
    searchMovies("Batman").then((data) => {
      if (data.Search) setRecommended(data.Search);
    });

    searchMovies("Avengers").then((data) => {
      if (data.Search) setTrending(data.Search);
    });

    searchMovies("Action").then((data) => {
      if (data.Search) setActionMovies(data.Search);
    });
  }, []);

  return (
    <div className="home-page">
      <div className="home-layout">
        <aside className="home-brand-rail left" aria-hidden="true">
          <span>JustTicketIT</span>
        </aside>

        <div className="home-content">
          <BannerCarousel />

          <section className="home-section">
            <h2>Recommended Movies</h2>
            <div className="movies-grid">
              {recommended.map((movie, index) => (
                <MovieCard key={`${movie.imdbID}-rec-${index}`} movie={movie} />
              ))}
            </div>
          </section>

          <section className="home-section">
            <h2>Trending Movies</h2>
            <div className="movies-grid">
              {trending.map((movie, index) => (
                <MovieCard key={`${movie.imdbID}-trend-${index}`} movie={movie} />
              ))}
            </div>
          </section>

          <section className="home-section">
            <h2>Action Movies</h2>
            <div className="movies-grid">
              {actionMovies.map((movie, index) => (
                <MovieCard key={`${movie.imdbID}-action-${index}`} movie={movie} />
              ))}
            </div>
          </section>
        </div>

        <aside className="home-brand-rail right" aria-hidden="true">
          <span>JustTicketIT</span>
        </aside>
      </div>
      
    </div>
    
  );
};

export default Home;
