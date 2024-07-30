const getItem = (key) => localStorage.getItem(key) || null;
const setItem = (key, value) => {
  localStorage.setItem(key, value);
};
const removeItem = (key) => localStorage.removeItem(key);

const accessTokenKey = "accessToken";
const refreshTokenKey = "refreshToken";
const accessExpiry = "accessTokenExpiry";
const refreshExpiry = "refreshTokenExpiry";

const getAccessToken = () => getItem(accessTokenKey);
const getRefreshToken = () => getItem(refreshTokenKey);
const setAccessToken = (token) => setItem(accessTokenKey, token);
const setRefreshToken = (token) => setItem(refreshTokenKey, token);
const removeTokens = () => {
  removeItem(accessTokenKey);
  removeItem(refreshTokenKey);
  removeItem(accessExpiry);
  removeItem(refreshExpiry);
};

const setTokens = (tokens) => {
  setAccessToken(tokens.accessToken);
  setRefreshToken(tokens.refreshToken);
  setItem(accessExpiry, tokens.accessExpiry);
  setItem(refreshExpiry, tokens.refreshExpiry);
};

const store = {
  getItem,
  setItem,
  removeItem,
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
  removeTokens,
  setTokens,
};
export default store;
