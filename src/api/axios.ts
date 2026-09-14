import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:1200/api/v1",
});

export default api;