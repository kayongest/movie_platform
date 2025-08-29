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
        `https://www.omdbapi.com/?s=${encodeURIComponent(searchTerm)}&apikey=${apikey}`
      );
      
      if (response.data.Search) {
        onSearchResults(response.data.Search);
      } else {
        onSearchResults([]);
        // Optional: Show message for no results
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

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form className="d-flex ms-auto" onSubmit={handleSearch}>
            <div className="input-group">
              <input
                className="form-control me-2"
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
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Searching...
                  </>
                ) : (
                  "Search"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </nav>
  );
}