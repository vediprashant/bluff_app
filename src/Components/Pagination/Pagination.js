import React from "react";

import PropTypes from "prop-types";

import "./pagination.css";

const Pagination = ({
  gamesPerPage,
  totalGames,
  paginate,
  prevPage,
  nextPage,
  currentPage,
  startPage,
  endPage,
}) => {
  const pageNumbers = [];
  endPage = Math.min(startPage + 4, Math.ceil(totalGames / gamesPerPage));
  for (let page = startPage; page <= endPage; page++) {
    pageNumbers.push(page);
  }
  return (
    <nav
      className="pagination"
      aria-label="Pagination Navigation"
      role="navigation"
      class="ui pagination menu"
    >
      <a
        className={currentPage === 1 ? "disabled item" : "item"}
        onClick={() => prevPage(startPage)}
      >
        Prev
      </a>
      {pageNumbers.map((num) => (
        <a
          onClick={() => paginate(num)}
          href="#"
          className={currentPage === num ? "activated item" : "item"}
        >
          {num}
        </a>
      ))}
      <a
        className={
          currentPage === Math.ceil(totalGames / gamesPerPage)
            ? "disabled item"
            : "item"
        }
        onClick={() => nextPage(endPage)}
      >
        Next
      </a>
    </nav>
  );
};

Pagination.propTypes = {
  gamesPerPage: PropTypes.number.isRequired,
  totalGames: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired,
  prevPage: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  startPage: PropTypes.number.isRequired,
  endPage: PropTypes.number.isRequired,
};
export default Pagination;
