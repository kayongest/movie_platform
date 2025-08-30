import myImage from "../assets/bg.png";

export function MovieCard({ Title, Year, Poster, Type, imdbID }) {
  return (
    <div className="col-sm-6 col-md-4 col-lg-3 mb-4">
      <div className="card h-80">
        <img
          className="card-img-top"
          src={Poster !== "N/A" ? Poster : myImage}
          alt={Title}
          style={{ height: "240px", objectFit: "cover", width: "100%"}}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{Title}</h5>
          <p className="card-text">
            <strong>Year:</strong> {Year}
            <br />
            <strong>Type:</strong> {Type}
          </p>
          <div className="mt-auto">
            <a
              href={`https://www.imdb.com/title/${imdbID}`}
              className="btn btn-outline-success btn-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on IMDB
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
