const handleTokens = {
  addToken: (cookies, key, value) => cookies.set(key, value, { path: "/" }),
  getToken: (cookies, key) => cookies.get(key),
  removeToken: (cookies, key) => cookies.remove(key),
};

export default handleTokens;
