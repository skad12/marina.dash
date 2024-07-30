import store from "../../utils/store";
import urls from "../../api/urls";
import useAPI from "./useAPI";

function useAuth(props) {
  const { get, isLoading, post } = useAPI();

  const login = async (fdata) => {
    try {
      const { error, data } = await post(urls.auth.login, fdata);
      if (error) return;
      store.setTokens(data.data.tokens);
      window.location = "/";
    } catch (error) {
      console.log(error);
    }
  };

  const restoreUser = async (cb) => {
    const token = store.getAccessToken();
    if (!token) {
      if (typeof cb === "function") return cb(null);
      return null;
    }
    const response = await get(urls.profile.me);
    if (typeof cb === "function") {
      return cb(
        response.error || !response.data ? null : response.data.data.profile
      );
    }
    if (response.error || !response.data) return null;
    return response.data.data.profile;
  };

  const createAccount = async (details) => {
    const { data, error } = await post(urls.auth.register, details);
    if (error) return;
    store.setTokens(data.data.tokens);
    window.location = "/";
  };

  const logout = () => {
    store.removeTokens();
    window.location = "/";
  };

  return { login, isLoading, restoreUser, logout, createAccount };
}

export default useAuth;
