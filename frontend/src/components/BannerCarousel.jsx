import { useEffect, useState } from "react";
import "./BannerCarousel.css";

const banners = [
  {
    image: "https://image.tmdb.org/t/p/original/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    title: "Avengers: Endgame"
  },
  {
    image: "https://image.tmdb.org/t/p/original/5YZbUmjbMa3ClvSW1Wj3D6XGolb.jpg",
    title: "Dune Part Two"
  },
  {
    image: "https://image.tmdb.org/t/p/original/nDxJJyA5giRhXx96q1sWbOUjMBI.jpg",
    title: "Spider-Man: No Way Home"
  }
];

const BannerCarousel = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="banner-carousel">
      <img src={banners[index].image} alt={banners[index].title} className="banner-image" />
      <div className="banner-overlay">
        <h2>{banners[index].title}</h2>
      </div>
    </div>
  );
};

export default BannerCarousel;
