import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center mt-4">
      <button 
        onClick={handlePrevClick} 
        disabled={currentPage === 1} 
        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-l-lg disabled:opacity-50"
      >
        Précédent
      </button>
      <span className="px-4 py-2 bg-gray-200 text-gray-700">{currentPage} / {totalPages}</span>
      <button 
        onClick={handleNextClick} 
        disabled={currentPage === totalPages} 
        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-r-lg disabled:opacity-50"
      >
        Suivant
      </button>
    </div>
  );
};

export default Pagination;
