import urls from "../../api/urls";
import { useState } from "react";
import useAPI from "./useAPI";
import { toast } from "react-toastify";

function useTakss(props) {
  const [tasks, setTasks] = useState([]);
  const { get, isLoading, post, patch } = useAPI();

  const getTasks = async (filter) => {
    const { data, error } = await get(
      urls.staffs.tasks +
        (filter
          ? filter === "today"
            ? "today=true"
            : `completed=${filter === "completed" ? true : false}`
          : "")
    );
    if (error) return;
    setTasks(data.data.tasks);
  };

  const addTasks = async (fdata) => {
    const { error, data } = await post(urls.staffs.tasks, fdata);
    if (error) return;
    toast.success(data.message);
    getTasks("today");
  };

  const completeTask = async (id) => {
    const { error, data } = await patch(
      urls.staffs.tasks.replace("?", "/") + `${id}`
    );
    if (error) return;
    toast.success(data.message);
    getTasks("today");
  };

  return {
    tasks,
    isLoading,
    getTasks,
    addTasks,
    completeTask,
  };
}

export default useTakss;
