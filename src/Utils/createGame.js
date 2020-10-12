import API_URL from "../Constants/urlConstants";
import handleTokens from "./handleTokens";

const createGame = async (decks) => {
  try {
    const game = await fetch(`${API_URL.createGameUrl}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `token ${handleTokens.getToken("token")}`,
      },
      body: JSON.stringify({ decks }),
    });
    if (game.status === 400) {
      return { message: "Please provide valid input" };
    }
    if (game.status === 500) {
      return { message: "Internal Server Error, Please Try Later" };
    }
    const jsonData = await game.json();
    return jsonData;
  } catch {
    return { message: "API Error, Please try Again" };
  }
};

export default createGame;
