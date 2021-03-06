import React, { useState, useEffect } from "react";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";
import PropTypes from "prop-types";

import Games from "Components/Games";
import Pagination from "Components/Pagination";
import viewGames from "actionCreators/gameActions/viewGames";
import API_URL from "constants/urlConstants";
import "./ViewGamePage.css";

/**
 * Page to view all your completed and ongoing games
 */
const ViewGamesPage = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage, setGamesPerPage] = useState(4);
  const [startPage, setStartPage] = useState(1);
  const [activeButton, setActiveButton] = useState("completed");

  useEffect(() => {
    props.viewGames(
      props.cookies,
      "completed",
      "completed",
      `${API_URL.BASE_URL}${API_URL.LIST_COMPLETED_GAMES}`,
      true
    );
  }, []);

  const fetchCompletedGames = async () => {
    if (activeButton !== "completed") {
      setCurrentPage(1);
      setStartPage(1);
      props.viewGames(
        props.cookies,
        activeButton,
        "completed",
        `${API_URL.BASE_URL}${API_URL.LIST_COMPLETED_GAMES}`,
        true
      );
      setActiveButton("completed");
    }
  };

  const fetchOngoingGames = async () => {
    if (activeButton !== "ongoing") {
      setCurrentPage(1);
      setStartPage(1);
      props.viewGames(
        props.cookies,
        activeButton,
        "ongoing",
        `${API_URL.BASE_URL}${API_URL.LIST_ONGOING_GAMES}`,
        true
      );
      setActiveButton("ongoing");
    }
  };

  const paginate = (pageNum, elem) => {
    setCurrentPage(pageNum);
    if (pageNum === Math.ceil(props.games.length / gamesPerPage)) {
      if (props.nextCompletedGames !== null && activeButton === "completed")
        props.viewGames(
          props.cookies,
          activeButton,
          "completed",
          props.nextCompletedGames
        );
      if (props.nextOngoingGames !== null && activeButton === "ongoing") {
        props.viewGames(
          props.cookies,
          activeButton,
          "ongoing",
          props.nextOngoingGames
        );
      }
    }
  };

  const prevPage = (startPage) => {
    if (currentPage !== 1 && currentPage === startPage) {
      setStartPage(startPage - 1);
    }
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = (endPage) => {
    if (
      currentPage !== Math.ceil(props.games.length / gamesPerPage) &&
      currentPage === endPage
    ) {
      setStartPage(startPage + 1);
    }
    if (currentPage !== Math.ceil(props.games.length / gamesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
    if (currentPage + 1 === Math.ceil(props.games.length / gamesPerPage)) {
      if (props.nextCompletedGames !== null && activeButton === "completed")
        props.viewGames(
          props.cookies,
          activeButton,
          "completed",
          props.nextCompletedGames
        );
      if (props.nextOngoingGames !== null && activeButton === "ongoing") {
        props.viewGames(
          props.cookies,
          activeButton,
          "ongoing",
          props.nextOngoingGames
        );
      }
    }
  };

  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentgames = props.games.slice(indexOfFirstGame, indexOfLastGame);

  return (
    <div className="container">
      <div className="ui top attached buttons">
        <button
          className={
            activeButton === "completed"
              ? "ui button complete activated"
              : "ui button complete"
          }
          onClick={fetchCompletedGames}
        >
          Completed Games
        </button>
        <button
          className={
            activeButton === "ongoing"
              ? "ui button ongoing activated"
              : "ui button ongoing"
          }
          onClick={fetchOngoingGames}
        >
          Ongoing Games
        </button>
      </div>
      {props.isGamesLoading ? (
        <div className="loading-container">
          <div className="load"></div>
        </div>
      ) : props.gameMessage ? (
        <div className="emptyList"> {props.gameMessage} </div>
      ) : (
        <div>
          {/* It shows the list of the games */}
          <Games games={currentgames} />
          {/* Dnamic Pagination button list based on the pages */}
          <Pagination
            gamesPerPage={gamesPerPage}
            totalGames={props.games.length}
            prevPage={prevPage}
            nextPage={nextPage}
            paginate={paginate}
            currentPage={currentPage}
            startPage={startPage}
          />
        </div>
      )}
    </div>
  );
};
const mapStateToProps = (state, ownProps) => ({
  isGamesLoading: state.game.viewGames.isGamesLoading,
  gameMessage: state.game.viewGames.gameMessage,
  games: state.game.viewGames.games,
  nextCompletedGames: state.game.viewGames.nextCompletedGames,
  nextOngoingGames: state.game.viewGames.nextOngoingGames,
  cookies: ownProps.cookies,
});
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      viewGames: (cookies, activeButton, currentButton, url, reset) =>
        viewGames(cookies, activeButton, currentButton, url, reset),
    },
    dispatch
  );
};

ViewGamesPage.propTypes = {
  isGamesLoading: PropTypes.bool.isRequired,
  gameMessage: PropTypes.string,
  games: PropTypes.array.isRequired,
  nextCompletedGames: PropTypes.string,
  nextOngoingGames: PropTypes.string,
  cookies: PropTypes.object.isRequired,
};

export default withCookies(
  connect(mapStateToProps, mapDispatchToProps)(ViewGamesPage)
);
