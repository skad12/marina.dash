import urls from "../../api/urls";
import { useContext, useState } from "react";
import useAPI from "./useAPI";
import { toast } from "react-toastify";
import DataContext from "../../contexts/DataContext";

function useApartments(props) {
  const [apartments, setApartments] = useState([]);
  const { get, post, isLoading, patch } = useAPI();
  const AppContextData = useContext(DataContext);

  const addApartment = async (fdata) => {
    const { data, error } = await post(urls.apartments.baseUrl + "/new", fdata);
    if (error) return;
    toast.success(data.message);
    AppContextData.getApartments();
  };

  const updatepartment = async (id, fdata) => {
    const { data, error } = await patch(
      urls.apartments.baseUrl + `/${id}`,
      fdata
    );
    if (error) return;
    toast.success(data.message);
    AppContextData.getApartments();
  };

  const getApartments = async () => {
    const { data, error } = await get(urls.apartments.baseUrl);
    if (error) return;
    setApartments(data.data.appartments);
  };
  return {
    isLoading,
    addApartment,
    apartments,
    getApartments,
    updatepartment,
  };
}

export default useApartments;
