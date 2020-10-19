const BACKEND_DOMAIN = "localhost:8000";
const BASE_URL = `http://${BACKEND_DOMAIN}/`

const API_URL = {
  BASE_URL: BASE_URL,
  VALIDATE_URL: `accounts/login/`,
  LOGOUT_URL: `accounts/logout/`,
  CREATE_URL: `accounts/users/`,
  CREATE_GAME_URL: `game/`,
  INVITE_URL: `game/player/`,
  LIST_INVITED_USERS: `game/`,
  LIST_COMPLETED_GAMES: `${BASE_URL}game/?filters=completed`,
  LIST_ONGOING_GAMES: `${BASE_URL}game/`,
  WEB_SOCKET_URL: `ws://${BACKEND_DOMAIN}/ws/game/`,
};

export default API_URL;
