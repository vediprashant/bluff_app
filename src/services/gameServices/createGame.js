import API_URL from "constants/urlConstants";
import BaseService from "services/baseService";

/**
 * Creates a new game with given decks
 * @param {*} cookies
 * @param {*} decks
 */
const createGame = async (cookies, decks) => {
  const game = new BaseService();
  return await game.post(
    `${API_URL.BASE_URL}${API_URL.CREATE_GAME_URL}`,
    cookies,
    {
      decks,
    }
  );
};

export default createGame;
