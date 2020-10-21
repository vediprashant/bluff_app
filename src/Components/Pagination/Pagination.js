import React from "react";

import PropTypes from "prop-types";

import "./pagination.css";

/**
 * Pagination module for games list
 * @param {*} param0 
 */
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
      aria-label="Pagination Navigation"
      role="navigation"
      className="ui pagination menu"
    >
      <a
        className={currentPage === 1 ? "disabled item" : "item"}
        onClick={() => prevPage(startPage)}
        href="#prevPage"
      >
        Prev
      </a>
      {pageNumbers.map((num) => (
        <a
          onClick={() => paginate(num)}
          href="#pages"
          className={currentPage === num ? "activated item" : "item"}
          key={num}
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
        href="#nextPage"
      >
        Next
      </a>
    </nav>
  );
};

Pagination.propTypes = {
  gamesPerPage: PropTypes.number,
  totalGames: PropTypes.number,
  paginate: PropTypes.func,
  prevPage: PropTypes.func,
  nextPage: PropTypes.func,
  currentPage: PropTypes.number,
  startPage: PropTypes.number,
  endPage: PropTypes.number,
};

export default Pagination;
