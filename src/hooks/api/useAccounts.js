import urls from "../../api/urls";
import { useState } from "react";
import useAPI from "./useAPI";
import { toast } from "react-toastify";

function useAccounts(props) {
  const [accounts, setAccounts] = useState([]);
  const { get, isLoading, post, patch } = useAPI();

  const getAccounts = async () => {
    const { data, error } = await get(urls.profile.baseUrl);
    if (error) return;
    setAccounts(data.data.accounts);
  };

  const addAccount = async (fdata) => {
    const { error, data } = await post(urls.profile.baseUrl, fdata);
    if (error) return;
    toast.success(data.message);
    getAccounts();
  };

  const updateAccount = async (id, fdata) => {
    const { error, data } = await patch(urls.profile.baseUrl + `/${id}`, fdata);
    if (error) return;
    toast.success(data.message);
    getAccounts();
  };

  return {
    accounts,
    isLoading,
    getAccounts,
    addAccount,
    updateAccount,
  };
}

export default useAccounts;
