import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getShowtimesByMovie } from "../services/backend";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";


const Showtimes = () => {
  const { imdbID } = useParams();
  const [theatres, setTheatres] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const movieTitle = location.state?.movieTitle;

  useEffect(() => {
    getShowtimesByMovie(imdbID)
      .then((data) => {
        setTheatres(data.theatres);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [imdbID]);

  if (loading) return <h2 style={{ padding: "20px" }}>Loading showtimes...</h2>;

  return (
    <div style={{ padding: "30px" }}>
      <h1>Select Theatre & Show Time</h1>

      {theatres.map((theatre) => (
        <div key={theatre.theatreId} style={styles.theatreCard}>
          <h3>{theatre.theatreName}</h3>
          <p style={{ color: "#666" }}>{theatre.location}</p>

          <div style={styles.showsRow}>
            {theatre.shows.map((show) => (
              <button
                key={show.time}
                style={styles.timeBtn}
                onClick={() =>
                 navigate(`/movie/${imdbID}/seats`, {
                  state: {
                    imdbID,
                    movieTitle,   // ✅ REAL title now
                    theatre: theatre.theatreName,
                    time: show.time,
                    price: show.price,
                  },
                })
                }
              >
                {show.time} — ₹{show.price}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const styles = {
  theatreCard: {
    marginTop: "25px",
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "6px",
  },
  showsRow: {
    display: "flex",
    gap: "12px",
    marginTop: "10px",
    flexWrap: "wrap",
  },
  timeBtn: {
    padding: "8px 14px",
    border: "1px solid #4caf50",
    background: "#fff",
    color: "#4caf50",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Showtimes;
