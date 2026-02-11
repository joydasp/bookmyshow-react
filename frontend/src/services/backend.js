const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const getShowtimesByMovie = async (imdbID) => {
  const res = await fetch(`${BASE_URL}/api/shows/${imdbID}`);
  return res.json();
};


export const getShows = async () => {
  const res = await fetch(`${BASE_URL}/api/shows`);
  return res.json();
};

export const checkBackendHealth = async () => {
  const res = await fetch(`${BASE_URL}/api/health`);
  return res.json();
};


export const createBooking = async (data) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) throw new Error(result.message);

  return result;
};


