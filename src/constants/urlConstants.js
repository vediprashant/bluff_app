const BACKEND_DOMAIN = "localhost:8000";

const API_URL = {
  BASE_URL: `http://${BACKEND_DOMAIN}/`,
  VALIDATE_URL: `accounts/login/`,
  LOGOUT_URL: `accounts/logout/`,
  CREATE_URL: `accounts/users/`,
  CREATE_GAME_URL: `game/`,
  INVITE_URL: `game/player/`,
  LIST_INVITED_USERS: `game/`,
  LIST_COMPLETED_GAMES: `game/?filters=completed`,
  LIST_ONGOING_GAMES: `game/`,
  WEB_SOCKET_URL: `ws://${BACKEND_DOMAIN}/ws/game/`,
};

export default API_URL;
