import { useEffect, useState } from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const generatePages = () => {
      const maxVisible = 5; // Number of visible page buttons
      let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
      let end = Math.min(totalPages, start + maxVisible - 1);

      if (end - start + 1 < maxVisible) {
        start = Math.max(1, end - maxVisible + 1);
      }

      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    setPages(generatePages());
  }, [currentPage, totalPages]);

  return (
    <div className="flex justify-center items-center mt-8 space-x-2">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-md ${
          currentPage === 1
            ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
            : 'bg-gray-800 text-white hover:bg-gray-700'
        }`}
      >
        &larr; Prev
      </button>

      {/* First Page */}
      {pages[0] > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className={`px-4 py-2 rounded-md ${
              1 === currentPage
                ? 'bg-red-600 text-white'
                : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
          >
            1
          </button>
          {pages[0] > 2 && <span className="px-2">...</span>}
        </>
      )}

      {/* Page Numbers */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 rounded-md ${
            page === currentPage
              ? 'bg-red-600 text-white'
              : 'bg-gray-800 text-white hover:bg-gray-700'
          }`}
        >
          {page}
        </button>
      ))}

      {/* Last Page */}
      {pages[pages.length - 1] < totalPages && (
        <>
          {pages[pages.length - 1] < totalPages - 1 && (
            <span className="px-2">...</span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            className={`px-4 py-2 rounded-md ${
              totalPages === currentPage
                ? 'bg-red-600 text-white'
                : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-md ${
          currentPage === totalPages
            ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
            : 'bg-gray-800 text-white hover:bg-gray-700'
        }`}
      >
        Next &rarr;
      </button>
    </div>
  );
};

export default Pagination;