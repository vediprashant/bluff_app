import { Button } from "semantic-ui-react";

const BASE_URL = "http://127.0.0.1:8000";

const API_URL = {
  validateUrl: `${BASE_URL}/accounts/login/`,
  createUrl: `${BASE_URL}/accounts/users/`,
  createGameUrl: `${BASE_URL}/game/create/`,
  getCompletedGames: `${BASE_URL}/game/list?filter=completed`,
  getOngingGames: `${BASE_URL}/game/list`,
};

export default API_URL;
