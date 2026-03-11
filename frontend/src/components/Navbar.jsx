import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { searchMovies } from "../services/omdb";
import "./Navbar.css";

const Navbar = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const navigate = useNavigate();
  const searchRef = useRef(null);
  const userName = localStorage.getItem("userName");

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/");
  };

  useEffect(() => {
    const handleStorageChange = () => setIsLoggedIn(!!localStorage.getItem("token"));
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    const trimmedQuery = query.trim();
    if (trimmedQuery.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      setActiveSuggestionIndex(-1);
      return;
    }

    const debounceTimer = setTimeout(async () => {
      setIsLoadingSuggestions(true);
      try {
        const data = await searchMovies(trimmedQuery);
        if (data?.Search) {
          setSuggestions(data.Search.slice(0, 5));
          setShowSuggestions(true);
        } else {
          setSuggestions([]);
          setShowSuggestions(false);
        }
        setActiveSuggestionIndex(-1);
      } catch {
        setSuggestions([]);
        setShowSuggestions(false);
      } finally {
        setIsLoadingSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = () => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;
    setShowSuggestions(false);
    navigate(`/search/${trimmedQuery}`);
  };

  const handleSuggestionSelect = (movie) => {
    setQuery(movie.Title);
    setShowSuggestions(false);
    navigate(`/movie/${movie.imdbID}`);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!suggestions.length) return;
      setActiveSuggestionIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
      setShowSuggestions(true);
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!suggestions.length) return;
      setActiveSuggestionIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
      setShowSuggestions(true);
      return;
    }

    if (e.key === "Enter") {
      if (activeSuggestionIndex >= 0 && showSuggestions) {
        e.preventDefault();
        handleSuggestionSelect(suggestions[activeSuggestionIndex]);
        return;
      }
      handleSearchSubmit();
    }

    if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo-link">
          <h2 className="navbar-logo">JustTicketIT</h2>
        </Link>
      </div>

      <div className="navbar-search-wrap" ref={searchRef}>
        <input
          type="text"
          placeholder="Search for movies..."
          className="navbar-search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!showSuggestions) setShowSuggestions(true);
          }}
          onFocus={() => {
            if (suggestions.length) setShowSuggestions(true);
          }}
          onKeyDown={handleInputKeyDown}
        />

        {showSuggestions && (
          <div className="navbar-suggestions">
            {isLoadingSuggestions && <div className="navbar-suggestion-item">Searching...</div>}
            {!isLoadingSuggestions &&
              suggestions.map((movie, index) => (
                <div
                  key={movie.imdbID}
                  className={`navbar-suggestion-item ${
                    index === activeSuggestionIndex ? "active" : ""
                  }`}
                  onMouseDown={() => handleSuggestionSelect(movie)}
                >
                  {movie.Title} ({movie.Year})
                </div>
              ))}
          </div>
        )}
      </div>

      <div className="navbar-right">
        {isLoggedIn ? (
          <>
            <span className="navbar-user">Hi, {userName}</span>
            <Link className="navbar-link" to="/my-bookings">
              My Bookings
            </Link>
            <button className="navbar-btn navbar-btn-dark" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <button className="navbar-btn navbar-btn-primary" onClick={() => navigate("/login")}>
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
