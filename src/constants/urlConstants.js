const BASE_URL = "http://127.0.0.1:8000";

const API_URL = {
  VALIDATE_URL: `${BASE_URL}/accounts/login/`,
  CREATE_URL: `${BASE_URL}/accounts/users/`,
  CREATE_GAME_URL: `${BASE_URL}/game/create/`,
  INVITE_URL: `${BASE_URL}/game/player/`,
  LIST_INVITED_USERS: `${BASE_URL}/game/`,
};

export default API_URL;
