import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function CardSlider() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const apikey = "7ab644ee";

  useEffect(() => {
    const fetchSliderMovies = async () => {
      try {
        const response = await axios.get(
          `https://www.omdbapi.com/?s=action&apikey=${apikey}`
        );
        if (response.data.Search) {
          // Take first 6 movies for the slider
          setMovies(response.data.Search.slice(0, 6));
        }
      } catch (error) {
        console.error("Error fetching slider movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSliderMovies();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    fade: true,
    arrows: true,
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid pt-2">
      <Slider {...settings}>
        {movies.map((movie) => (
          <div key={movie.imdbID} className="slider-item">
            <div
              className="position-relative"
              style={{ height: "250px", overflow: "hidden" }}
            >
              <img
                src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/800x500/333/fff?text=No+Image'}
                alt={movie.Title}
                className="w-100 h-100"
                style={{ objectFit: "cover", height: "50px" }}
              />
              <div
                className="position-absolute bottom-0 start-0 end-0 text-white p-4"
                style={{
                  background:
                    "linear-gradient(transparent, rgba(0,0,0,0.8))",
                }}
              >
                <h2 className="mb-1">{movie.Title}</h2>
                <p className="mb-0">
                  {movie.Year} • {movie.Type}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}