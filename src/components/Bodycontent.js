import { useState, useEffect } from "react";
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
      console.log("loading data");

      try {
        setLoading(true);
        const response = await axios.get(
          `https://www.omdbapi.com/?s=action&apikey=${apikey}`
        );
        if (response.data.Search) {
          console.log("Movie data:", response.data.Search);
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

  if (loading) return <div className="text-center py-5">Loading movie data...</div>;
  if (error) return <div className="text-center py-5">Error loading movies: {error.message}</div>;

  return (
    <div>
      <div className="container-fluid">
        <CardSlider />
      </div>
      
      <div className="container mt-5 bg-dark text-white fs-3 p-3 rounded">
        <h2>Movies ({movieData.length})</h2>
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
            <div className="col-6 text-center py-5">
              <p>Sorry, no movies to show</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}