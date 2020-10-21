import handleTokens from "../../Utils/handleTokens";
import deserializeErrors from "../../Utils/deserializeErrors";

/**
 * Get all the games user is part of
 * @param {*} cookies
 */

const getGames = async (cookies, targetUrl) => {
  try {
    const games = await fetch(targetUrl, {
      headers: {
        Authorization: `Token ${handleTokens.getToken(cookies, "token")}`,
      },
    });
    if (games.status === 200) {
      const jsonGames = await games.json();
      return jsonGames;
    }
    return { message: deserializeErrors(games.status) };
  } catch {
    return { message: "API Error, Please try Again" };
  }
};

export default getGames;
