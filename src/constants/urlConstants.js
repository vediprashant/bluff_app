const BACKEND_DOMAIN = '127.0.0.1'
const BASE_URL = `https://${BACKEND_DOMAIN}`;

const API_URL = {
  VALIDATE_URL: `${BASE_URL}/accounts/login/`,
  CREATE_URL: `${BASE_URL}/accounts/users/`,
  CREATE_GAME_URL: `${BASE_URL}/game/`,
  INVITE_URL: `${BASE_URL}/game/player/`,
  LIST_INVITED_USERS: `${BASE_URL}/game/`,
  LIST_GAMES: `${BASE_URL}/game/`,
  WEB_SOCKET_URL: `wss://${BACKEND_DOMAIN}/ws/game/`,
};

export default API_URL;
