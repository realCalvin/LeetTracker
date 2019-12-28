import React from "react";
import { Row, Col } from "react-bootstrap";

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
              <a onClick={() => paginate(number)} className="page-link">
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
