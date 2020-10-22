import API_URL from "constants/urlConstants";
import deserializeErrors from "Utils/deserializeErrors";
import customFetch from "services/customFetch"

/**
 * Creates a new game with given decks
 * @param {*} cookies
 * @param {*} decks
 */
const createGame = async (cookies, decks) => {
  try {
    const game = await customFetch({
      url: `${API_URL.BASE_URL}${API_URL.CREATE_GAME_URL}`,
      body:{decks},
      cookies
    })
    if (game.status === 400) {
      return { message: "Please provide valid input" };
    }
    if (game.status === 500) {
      return { message: "Internal Server Error, Please Try Later" };
    }
    if (game.status === 201) {
      const jsonData = await game.json();
      return jsonData;
    }
    return { message: deserializeErrors(game.status) };
  } catch {
    return { message: "API Error, Please try Again" };
  }
};

export default createGame;
