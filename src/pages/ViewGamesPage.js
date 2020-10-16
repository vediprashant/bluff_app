import React, { useState, useEffect, useRef } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";

import Games from "../Components/Games";
import Pagination from "../Components/Pagination";
import viewGames from "../actionCreators/viewGames";
import "./ViewGamePage.css";

const ViewGamesPage = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage, setGamesPerPage] = useState(4);
  const [startPage, setStartPage] = useState(1);
  const [activeButton, setActiveButton] = useState("completed");

  useEffect(() => {
    fetchCompletedGames();
  }, []);

  const fetchCompletedGames = async () => {
    props.viewGames(props.cookies, "completed");
    if (activeButton !== "completed") {
      setActiveButton("completed");
    }
  };

  const fetchOngoingGames = async () => {
    props.viewGames(props.cookies);
    if (activeButton !== "ongoing") {
      setActiveButton("ongoing");
    }
  };

  const paginate = (pageNum, elem) => {
    setCurrentPage(pageNum);
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
  };

  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentgames = props.games.slice(indexOfFirstGame, indexOfLastGame);

  return (
    <div class="container">
      <div class="ui top attached buttons">
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
          <Games games={currentgames} />
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
  isGamesLoading: state.viewGames.isGamesLoading,
  gameMessage: state.viewGames.gameMessage,
  games: state.viewGames.games,
  cookies: ownProps.cookies,
});
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      viewGames: (cookies, filters) => viewGames(cookies, filters),
    },
    dispatch
  );
};
export default withCookies(
  connect(mapStateToProps, mapDispatchToProps)(ViewGamesPage)
);
