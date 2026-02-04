import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Showtimes from "./pages/Showtimes";
import Seats from "./pages/Seats";
import BookingConfirmation from "./pages/BookingConfirmation";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/movie/:imdbID/shows" element={<Showtimes />} />        
        <Route path="/movie/:imdbID/seats" element={<Seats />} />
        <Route path="/booking/:id" element={<BookingConfirmation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
