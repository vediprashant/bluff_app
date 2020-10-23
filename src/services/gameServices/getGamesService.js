import BaseService from "services/baseService";

/**
 * Get all the games user is part of
 * @param {*} cookies
 */

const getGames = async (cookies, targetUrl) => {
  const games = new BaseService();
  return await games.get(targetUrl, cookies);
};

export default getGames;
