import store from "../utils/store";
import axios from "axios";

const client = axios.create({
  // baseURL: "http://localhost:1212/api",
  baseURL: "https://test-api-tiptopapts-com-3hbx.onrender.com/api",
  // baseURL: "https://live-api-tiptopapts-com.onrender.com/api",
  headers: {
    "x-access-token": store.getAccessToken(),
  },
});

export default client;
