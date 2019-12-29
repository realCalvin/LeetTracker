import React from "react";

const Pagination = ({ problemsPerPage, totalProblems, paginate }) => {
  const problemNumbers = [];

  // For loop to calculate how many numbers should be displayed on pagiantion
  for (let i = 1; i <= Math.ceil(totalProblems / problemsPerPage); i++) {
    problemNumbers.push(i);
  }

  return (
    <div>
      <nav>
        <ul className="pagination">
          {problemNumbers.map(number => (
            <li key={number} className="page-item">
              <button onClick={() => paginate(number)} className="page-link">
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
