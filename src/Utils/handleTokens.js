const handleTokens = {
  addToken: (key, value) => localStorage.setItem(key, value),
  getToken: (key) => localStorage.getItem(key),
  removeToken: (key) => localStorage.removeItem(key),
};

export default handleTokens;
