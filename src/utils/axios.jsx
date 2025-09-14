import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_TMDB_BASE_URL, // .env se aaya
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER}`, // .env se aaya
  },
});

export default instance;
