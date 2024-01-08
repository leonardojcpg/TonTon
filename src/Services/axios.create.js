import axios from "axios";

export const AxiosApi = axios.create({
  baseURL: "https://tonton-red.vercel.app",
  timeout: 5 * 1000,
});
