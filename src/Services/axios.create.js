import axios from "axios";

export const AxiosApi = axios.create({
  baseURL: "https://tonton-backend.vercel.app",
  timeout: 5 * 1000,
});
