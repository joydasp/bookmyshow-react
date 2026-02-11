import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Showtimes from "./pages/Showtimes";
import Seats from "./pages/Seats";
import BookingConfirmation from "./pages/BookingConfirmation";
import MyBookings from "./pages/MyBookings";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/movie/:imdbID/shows" element={<Showtimes />} />        
        <Route path="/movie/:imdbID/seats" element={<Seats />} />
        <Route path="/booking/:id" element={<BookingConfirmation />} />
        <Route path="/my-bookings" element={<MyBookings />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
