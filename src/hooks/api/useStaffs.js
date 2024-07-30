import urls from "../../api/urls";
import { useState } from "react";
import useAPI from "./useAPI";
import { toast } from "react-toastify";

function useStaffs(props) {
  const [staffs, setStaffs] = useState([]);
  const { get, isLoading, post, patch } = useAPI();

  const getStaff = async () => {
    const { data, error } = await get(urls.staffs.baseUrl);
    if (error) return;
    setStaffs(data.data.staffs);
  };

  const addStaff = async (fdata) => {
    const { error, data } = await post(urls.staffs.baseUrl, fdata);
    if (error) return;
    toast.success(data.message);
    getStaff();
  };

  const updateStaff = async (id, fdata) => {
    const { error, data } = await patch(urls.staffs.baseUrl + `/${id}`, fdata);
    if (error) return;
    toast.success(data.message);
    getStaff();
  };

  return {
    staffs,
    isLoading,
    getStaff,
    addStaff,
    updateStaff,
  };
}

export default useStaffs;
