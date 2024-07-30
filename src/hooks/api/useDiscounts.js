import urls from "../../api/urls";
import { useState } from "react";
import useAPI from "./useAPI";
import { toast } from "react-toastify";

function useDiscounts(props) {
  const [codes, setCodes] = useState([]);
  const { get, isLoading, post, patch } = useAPI();

  const getDiscounts = async () => {
    const { data, error } = await get(urls.bookings.discounts);
    if (error) return;
    setCodes(data.data.codes);
  };
  const addDiscountCode = async (fdata) => {
    const { data, error } = await post(urls.bookings.discounts, fdata);
    if (error) return;
    toast.success(data.message);
    getDiscounts();
  };

  return {
    codes,
    isLoading,
    getDiscounts,
    addDiscountCode,
  };
}

export default useDiscounts;
