// components/Pagination.js
export function Pagination({
  currentPage,
  totalPages,
  paginate,
  prevPage,
  nextPage,
}) {
  const maxVisiblePages = 5; // Maximum pages to show in pagination

  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  // Adjust if we're near the end
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav aria-label="Movie pagination" className="mt-5">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            &laquo; Previous
          </button>
        </li>

        {startPage > 1 && (
          <>
            <li className="page-item">
              <button className="page-link" onClick={() => paginate(1)}>
                1
              </button>
            </li>
            {startPage > 2 && (
              <li className="page-item disabled">
                <span className="page-link">...</span>
              </li>
            )}
          </>
        )}

        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${currentPage === number ? "active" : ""}`}
          >
            <button className="page-link" onClick={() => paginate(number)}>
              {number}
            </button>
          </li>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <li className="page-item disabled">
                <span className="page-link">...</span>
              </li>
            )}
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => paginate(totalPages)}
              >
                {totalPages}
              </button>
            </li>
          </>
        )}

        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <button
            className="page-link"
            onClick={nextPage}
            disabled={currentPage === totalPages}
          >
            Next &raquo;
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
