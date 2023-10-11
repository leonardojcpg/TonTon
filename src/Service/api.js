import axios from "axios";

const Api = axios.create({
  baseURL: "https://localhost:3333",
  timeout: 5000,
/*   headers: {
    "Content-Type": "application/json",
  }, */
});

export { Api };
