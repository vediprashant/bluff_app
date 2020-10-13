const BACKEND_IP = 'localhost:8000'
const BASE_URL = `http://${BACKEND_IP}`;

const API_URL = {
  VALIDATE_URL: `${BASE_URL}/accounts/login/`,
  CREATE_URL: `${BASE_URL}/accounts/users/`,
  CREATE_GAME_URL: `${BASE_URL}/game/create/`,
  INVITE_URL: `${BASE_URL}/game/player/`,
  LIST_INVITED_USERS: `${BASE_URL}/game/`,
  WEB_SOCKET_URL: `ws://${BACKEND_IP}/ws/game/`,
};

export default API_URL;
