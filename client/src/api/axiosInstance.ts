import axios from "axios";

  const API = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL  || "http://localhost:3000",
    withCredentials: true, 
  });
export default API;