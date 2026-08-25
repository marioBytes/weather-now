import { create } from 'zustand';
import axios from '../axios';
import type { WeatherData } from '../types/weather';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

interface WeatherStore {
  data: null | WeatherData;
  loading: boolean;
  error: null | string;
  geolocation: null | string;
  getGeolocation: () => void;
  fetchForecast: () => Promise<void>;
}

const useWeatherStore = create<WeatherStore>((set, get) => ({
  data: null,
  loading: false,
  error: null,
  geolocation: null,
  getGeolocation: () => {
    navigator.geolocation.getCurrentPosition(
      (position) => { set({ geolocation: `${position.coords.latitude},${position.coords.longitude}` }) },
      () => { set({ error: 'Unable to get geolocation', loading: false }) })
  },
  fetchForecast: async () => {
    const { geolocation } = get();

    if (!geolocation) {
      return;
    }

    set({ loading: true, error: null });

    try {
      const response = await axios.get('/forecast.json', {
        params: {
          key: API_KEY,
          q: geolocation,
          days: 7,
        },
      });

      set({ data: response.data, loading: false })
    } catch (error) {
      set({ error: "Unable to get forecast", loading: false })
    }
  },
}));

export default useWeatherStore;
