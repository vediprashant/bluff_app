import API_URL from "../constants/urlConstants";
import handleTokens from "../Utils/handleTokens";
import deserializeErrors from "../Utils/deserializeErrors";

/**
 * Creates a new game with given decks
 * @param {*} cookies 
 * @param {*} decks 
 */
const createGame = async (cookies, decks) => {
  try {
    const game = await fetch(API_URL.CREATE_GAME_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `token ${handleTokens.getToken(cookies, "token")}`,
      },
      body: JSON.stringify({ decks }),
    });
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
