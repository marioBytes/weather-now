import axios from "axios";

const BASE_URL = import.meta.env.DEV ? import.meta.env.VITE_BASE_URL_DEV : import.meta.env.VITE_BASE_URL_PROD;

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

export default instance;
