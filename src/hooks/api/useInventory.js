import { toast } from "react-toastify";
import urls from "../../api/urls";
import { useState } from "react";
import useAPI from "./useAPI";

function useInventory(props) {
  const [inventory, setInventory] = useState([]);
  const { get, isLoading, post, patch } = useAPI();

  const getInventory = async () => {
    const { data, error } = await get(urls.inventory.baseUrl);
    if (error) return;
    setInventory(data.data.inventory);
  };

  const addToInventory = async (fdata) => {
    const { data, error } = await post(urls.inventory.baseUrl, fdata);
    if (error) return;
    toast.success(data.message);
    getInventory();
  };

  const updateInventory = async (id, fdata) => {
    const { data, error } = await patch(
      urls.inventory.baseUrl + `/${id}`,
      fdata
    );
    if (error) return;
    toast.success(data.message);
    getInventory();
  };

  return {
    isLoading,
    inventory,
    getInventory,
    addToInventory,
    updateInventory,
  };
}

export default useInventory;
