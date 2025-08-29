import { useState, useEffect } from "react";
import { Navbar } from "./Navbar";
import CardSlider from "./CardSlider";
import { MovieCard } from "./MovieCard";
import axios from "axios";

export function Bodycontent() {
  const [movieData, setMovieData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apikey = "7ab644ee";

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://www.omdbapi.com/?s=action&apikey=${apikey}`
        );
        if (response.data.Search) {
          setMovieData(response.data.Search);
        } else {
          setMovieData([]);
        }
        setError(null);
      } catch (error) {
        setError(error);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, []);

  // Handle search results from navbar
  const handleSearchResults = (results) => {
    setMovieData(results);
  };

  return (
    <div>
      <Navbar onSearchResults={handleSearchResults} />
      
      <div className="container-fluid">
        <CardSlider />
      </div>
      
      <div className="container mt-5 bg-dark text-white fs-3 p-3">
        <h2>Movies {movieData.length > 0 && `(${movieData.length})`}</h2>
      </div>

      <div className="container mt-4">
        <div className="row">
          {movieData.length > 0 ? (
            movieData.map((movie) => (
              <MovieCard 
                key={movie.imdbID}
                Title={movie.Title}
                Year={movie.Year}
                Poster={movie.Poster}
                Type={movie.Type}
                imdbID={movie.imdbID}
              />
            ))
          ) : (
            <div className="col-12 text-center py-5">
              {loading ? (
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                <p>No movies found. Try searching for something else!</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}