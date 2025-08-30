import { useState, useEffect } from "react";
import { Navbar } from "./Navbar";
import CardSlider from "./CardSlider";
import { MovieCard } from "./MovieCard";
import { Pagination } from "./Pagination";
import axios from "axios";

export function Bodycontent() {
  const [movieData, setMovieData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(4); // 4 cards per page
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
    setCurrentPage(1); // Reset to first page on new search
  };

  // Get current movies for the current page
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movieData.slice(indexOfFirstMovie, indexOfLastMovie);

  // Calculate total pages
  const totalPages = Math.ceil(movieData.length / moviesPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <Navbar onSearchResults={handleSearchResults} />

      <div className="container-fluid">
        <CardSlider />
      </div>

      <div className="container mt-5 bg-dark text-white fs-5 p-3 rounded">
        <h2>Movies ({movieData.length})</h2>
      </div>
      <div className="container mt-2">
        {" "}
        {/* Separated container for page info */}
        <small className="fs-6 text-dark">
          Page {currentPage} of {totalPages} | Showing {currentMovies.length} of{" "}
          {movieData.length} movies
        </small>
      </div>

      <div className="container mt-4">
        <div className="row">
          {currentMovies.length > 0 ? (
            currentMovies.map((movie) => (
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

        {/* Pagination - Only show if there are multiple pages */}
        {totalPages > 1 && (
          <div className="row mt-4">
            <div className="col-12">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                paginate={paginate}
                prevPage={prevPage}
                nextPage={nextPage}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
