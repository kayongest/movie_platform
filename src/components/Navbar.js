import { useState } from "react";
import axios from "axios";

export function Navbar({ onSearchResults }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const apikey = "7ab644ee";

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchTerm.trim()) return;

    setIsLoading(true);

    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?s=${encodeURIComponent(
          searchTerm
        )}&apikey=${apikey}`
      );

      if (response.data.Search) {
        onSearchResults(response.data.Search);
      } else {
        onSearchResults([]);
        console.log("No movies found");
      }
    } catch (error) {
      console.error("Search error:", error);
      onSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand ms-3 ms-md-5 text-success fw-bold" href="#">
          Movie DB
        </a>

        {/* Toggler button - make sure it matches the target ID */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSearch" // Changed to match the ID below
          aria-controls="navbarSearch"
          aria-expanded="false"
          aria-label="Toggle search"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible content */}
        <div className="collapse navbar-collapse" id="navbarSearch">
          <form
            className="d-flex ms-lg-auto mt-3 mt-lg-0"
            onSubmit={handleSearch}
          >
            <div className="input-group">
              <input
                className="form-control"
                type="search"
                placeholder="Search movies..."
                aria-label="Search"
                value={searchTerm}
                onChange={handleInputChange}
                disabled={isLoading}
              />
              <button
                className="btn btn-success"
                type="submit"
                disabled={isLoading || !searchTerm.trim()}
              >
                {isLoading ? "..." : "Search"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </nav>
  );
}
