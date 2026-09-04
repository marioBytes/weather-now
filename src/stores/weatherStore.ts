import { create } from "zustand";
import moment from "moment";

import axios from "../axios";
import useUiStore from "./uiStore";
import type { WeatherData } from "../types/weather";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

interface WeatherStore {
  data: null | WeatherData;
  loading: boolean;
  error: null | string;
  geolocation: null | string;
  getGeolocation: () => void;
  fetchForecast: () => Promise<void>;
  location: any;
  searchLocation: (value) => Promise<void>;
}

const useWeatherStore = create<WeatherStore>((set, get) => ({
  data: null,
  loading: false,
  error: null,
  geolocation: null,
  getGeolocation: () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        set({ geolocation: `${position.coords.latitude},${position.coords.longitude}` });
      },
      () => {
        set({ error: "Unable to get geolocation", loading: false });
      },
    );
  },
  fetchForecast: async () => {
    set({ loading: true, error: null });

    const { geolocation } = get();

    if (!geolocation) {
      return;
    }

    try {
      const response = await axios.get("/forecast.json", {
        params: {
          key: API_KEY,
          q: geolocation,
          days: 7,
        },
      });

      set({ data: response.data, loading: false });
      useUiStore.setState({ selectedDay: moment().format("YYYY-MM-DD") });
    } catch (error) {
      set({ error: "Unable to get forecast", loading: false });
    }
  },
  location: null,
  searchLocation: async (value: string) => {
    try {
      const response = await axios.get("/search.json", {
        params: {
          key: API_KEY,
          q: value,
        },
      });

      set({ location: response.data });
      console.log(get().location);
    } catch (error) {
      set({ error: "Unable to find location", location: null });
    }
  },
}));

export default useWeatherStore;
