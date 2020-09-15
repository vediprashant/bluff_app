const BASE_URL = "http://127.0.0.1:8000";

const API_URL = {
  validateUrl: `${BASE_URL}/accounts/login/`,
  createUrl: `${BASE_URL}/accounts/users/`,
  inviteUrl: `${BASE_URL}/game/player`,
  logoutUrl: `${BASE_URL}/accounts/logout/`,
};

export default API_URL;
