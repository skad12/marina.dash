import { RequestTypes, responseTypes } from "../../api/request";
import { toast } from "react-toastify";
import { useState } from "react";
import client from "../../api";

function useAPI() {
  const [isLoading, setIsLoading] = useState(false);

  const Request = async (type, ...args) => {
    const response = { error: null, data: null };
    if (!Object.values(RequestTypes).includes(type)) {
      response.error = { message: { message: "Invalid Request Type" } };
      return response;
    }
    try {
      setIsLoading(true);
      const res = await client[type](...args);
      if (res.data.type === responseTypes.error) {
        response.error = res.data;
        return response;
      }
      response.data = res.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
      response["error"] = error?.response?.data;
    } finally {
      setIsLoading(false);
    }
    return response;
  };

  const get = (...args) => {
    return Request(RequestTypes.GET, ...args);
  };
  const post = (...args) => {
    return Request(RequestTypes.POST, ...args);
  };
  const put = (...args) => {
    return Request(RequestTypes.PUT, ...args);
  };
  const fdelete = (...args) => {
    return Request(RequestTypes.DELETE, ...args);
  };
  const patch = (...args) => {
    return Request(RequestTypes.PATCH, ...args);
  };

  return {
    isLoading,
    get,
    post,
    put,
    fdelete,
    patch,
    Request,
  };
}

export default useAPI;
