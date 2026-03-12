import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Showtimes from "./pages/Showtimes";
import Seats from "./pages/Seats";
import BookingConfirmation from "./pages/BookingConfirmation";
import MyBookings from "./pages/MyBookings";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Payment from "./pages/Payment";
import SearchResults from "./pages/SearchResults";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>

  <Navbar />

  <Routes>

    <Route path="/" element={<Home />} />

    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/search/:query" element={<SearchResults />} />

    <Route path="/movie/:id" element={<MovieDetails />} />
    <Route path="/movie/:imdbID/shows" element={<Showtimes />} />

    <Route
      path="/movie/:imdbID/seats"
      element={
        <ProtectedRoute>
          <Seats />
        </ProtectedRoute>
      }
    />

    <Route
      path="/payment"
      element={
        <ProtectedRoute>
          <Payment />
        </ProtectedRoute>
      }
    />

    <Route
      path="/booking/:id"
      element={
        <ProtectedRoute>
          <BookingConfirmation />
        </ProtectedRoute>
      }
    />

    <Route
      path="/my-bookings"
      element={
        <ProtectedRoute>
          <MyBookings />
        </ProtectedRoute>
      }
    />

  </Routes>

</BrowserRouter>
  );
}

export default App;
