import React, { useState, useEffect } from "react";

import Games from "../Components/Games";
import Pagination from "../Components/Pagination";
import "./ViewGamePage.css";
import { withCookies } from 'react-cookie'
import handleTokens from '../Utils/handleTokens'

const ViewGamesPage = (props) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage, setGamesPerPage] = useState(10);
  const [startPage, setStartPage] = useState(1);

  useEffect(() => {
    fetchCompletedGames();
  }, []);
  const fetchCompletedGames = async () => {
    const button = document.getElementsByClassName("button");
    for (let btn = 0; btn < button.length; btn++) {
      button[btn].classList.remove("activated");
    }
    button[0].classList.add("activated");
    setLoading(true);
    const games = await fetch("http://127.0.01:8000/game/list/?filters=completed", {
      headers:{
        Authorization: `Token ${handleTokens.getToken(props.cookies, 'token')}`
      }
    });
    const jsonGames = await games.json();
    setGames(jsonGames.results);
    setLoading(false);
  };
  const fetchOngoingGames = async () => {
    const button = document.getElementsByClassName("button");
    for (let btn = 0; btn < button.length; btn++) {
      button[btn].classList.remove("activated");
    }
    button[1].classList.add("activated");
    console.log(button);
    setLoading(true);
    const games = await fetch("http://127.0.01:8000/game/list/", {
      headers:{
        Authorization: `Token ${handleTokens.getToken(props.cookies, 'token')}`
      }
    });
    const jsonGames = await games.json();
    setGames(jsonGames.results);
    setLoading(false);
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
      currentPage !== Math.ceil(games.length / gamesPerPage) &&
      currentPage === endPage
    ) {
      setStartPage(startPage + 1);
    }
    if (currentPage !== Math.ceil(games.length / gamesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentgames = games.slice(indexOfFirstGame, indexOfLastGame);

  return (
    <div class="container">
      <div class="ui top attached buttons">
        <button class="ui button complete" onClick={fetchCompletedGames}>
          Completed Games
        </button>
        <button class="ui button ongoing" onClick={fetchOngoingGames}>
          Ongoing Games
        </button>
      </div>
      <Games games={currentgames} loading={loading} />
      <Pagination
        gamesPerPage={gamesPerPage}
        totalGames={games.length}
        prevPage={prevPage}
        nextPage={nextPage}
        paginate={paginate}
        currentPage={currentPage}
        startPage={startPage}
      />
    </div>
  );
};

export default withCookies(ViewGamesPage);
