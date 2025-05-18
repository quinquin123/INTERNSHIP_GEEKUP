import React from 'react';

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  return (
    <div className="flex justify-center mt-8">
      <div className="flex space-x-2">
        <button 
          onClick={() => onPageChange(currentPage - 1)} 
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600 cursor-pointer'}`}
        >
          Previous
        </button>
        
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter(p => p === 1 || p === totalPages || (p >= currentPage - 2 && p <= currentPage + 2))
          .map((p, index, array) => (
            <React.Fragment key={p}>
              {index > 0 && array[index - 1] !== p - 1 && (
                <span className="px-4 py-2">...</span>
              )}
              <button
                onClick={() => onPageChange(p)}
                className={`px-4 py-2 rounded ${currentPage === p ? 'bg-blue-700 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
              >
                {p}
              </button>
            </React.Fragment>
          ))}
        
        <button 
          onClick={() => onPageChange(currentPage + 1)} 
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600 cursor-pointer'}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;