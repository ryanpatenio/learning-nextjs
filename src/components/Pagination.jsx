'use client';

const Pagination = ({ currentPage, totalPages, goToPage }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-4 space-x-1">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => goToPage(page)}
          className={`px-3 py-1 border rounded cursor-pointer ${
            page === currentPage
              ? 'bg-blue-500 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
