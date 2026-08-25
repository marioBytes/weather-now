import axios from 'axios';

const BASE_URL = "http://api.weatherapi.com/v1";

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

export default instance;
