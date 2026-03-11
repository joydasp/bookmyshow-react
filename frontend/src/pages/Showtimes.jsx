import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getShowtimesByMovie } from "../services/backend";
import { getMovieDetails } from "../services/omdb";
import "./Showtimes.css";

const Showtimes = () => {
  const { imdbID } = useParams();
  const location = useLocation();
  const [theatres, setTheatres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resolvedMovieTitle, setResolvedMovieTitle] = useState(
    location.state?.movieTitle || ""
  );
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        const data = await getShowtimesByMovie(imdbID);
        if (isMounted) {
          setTheatres(data.theatres || []);
        }

        if (!location.state?.movieTitle) {
          const movie = await getMovieDetails(imdbID);
          if (isMounted) {
            setResolvedMovieTitle(movie?.Title || "");
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [imdbID, location.state?.movieTitle]);

  if (loading) return <h2 className="showtimes-loading">Loading showtimes...</h2>;

  return (
    <div className="showtimes-page">
      <h1>Select Theatre & Show Time</h1>

      {theatres.map((theatre) => (
        <article key={theatre.theatreId} className="showtimes-card">
          <h3>{theatre.theatreName}</h3>
          <p className="showtimes-location">{theatre.location}</p>

          <div className="showtimes-row">
            {theatre.shows.map((show) => (
              <button
                key={show.time}
                className="showtime-btn"
                onClick={() =>
                  navigate(`/movie/${imdbID}/seats`, {
                    state: {
                      imdbID,
                      movieTitle: resolvedMovieTitle,
                      theatre: theatre.theatreName,
                      time: show.time,
                      price: show.price
                    }
                  })
                }
              >
                {show.time} - {show.price}
              </button>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
};

export default Showtimes;
