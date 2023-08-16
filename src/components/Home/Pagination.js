import React from 'react'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const visiblePages = 5; // Number of page numbers visible at a time
    const halfVisible = Math.floor(visiblePages / 2);
    let startPage = Math.max(currentPage - halfVisible, 0);
    let endPage = Math.min(startPage + visiblePages - 1, totalPages - 1);
  
    if (totalPages > visiblePages && currentPage > totalPages - halfVisible) {
      startPage = totalPages - visiblePages;
      endPage = totalPages - 1;
    }
  
    const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i + 1);
  return (
<>

<div className="flex justify-center mt-4">
        <div
          className={`border px-2 py-1 rounded ${
            currentPage === 0 ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
          onClick={() => onPageChange(0)}
        >
          First
        </div>
        <div
          className={`border px-2 py-1 rounded ${
            currentPage === 0 ? "opacity-50 pointer-events-none" : "cursor-pointer"
          }`}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </div>
        {pageNumbers.map((pageNumber) => (
          <div
            key={pageNumber}
            className={`border px-2 py-1 rounded mx-1 ${
              pageNumber === currentPage + 1 ? "font-bold" : "cursor-pointer"
            }`}
            onClick={() => onPageChange(pageNumber - 1)}
          >
            {pageNumber}
          </div>
        ))}
        <div
          className={`border px-2 py-1 rounded ${
            currentPage === totalPages - 1 ? "opacity-50 pointer-events-none" : "cursor-pointer"
          }`}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </div>
        <div
          className={`border px-2 py-1 rounded ${
            currentPage === totalPages - 1 ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
          onClick={() => onPageChange(totalPages - 1)}
        >
          Last
        </div>
      </div>

</>  )
}

export default Pagination