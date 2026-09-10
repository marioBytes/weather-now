import { create } from "zustand";
import moment from "moment";

import axios from "../axios";
import useUiStore from "./uiStore";
import type { WeatherData, SearchLocation } from "../types/weather";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

interface Coordinates {
  lat: number;
  lon: number;
}

interface WeatherStore {
  data: null | WeatherData;
  loading: boolean;
  searchLoading: boolean;
  error: null | string;
  geolocation: { lat: number; lon: number } | null;
  getGeolocation: () => void;
  fetchForecast: (coordinates: Coordinates) => Promise<void>;
  locations: SearchLocation[] | [];
  searchLocation: (value: string) => Promise<void>;
}

const useWeatherStore = create<WeatherStore>((set, get) => ({
  data: null,
  loading: false,
  searchLoading: false,
  error: null,
  geolocation: null,
  getGeolocation: () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        set({ geolocation: { lat: position.coords.latitude, lon: position.coords.longitude } });
      },
      () => {
        set({ error: "Unable to get geolocation", loading: false });
      },
    );
  },
  fetchForecast: async (coordinates: Coordinates) => {
    set({ loading: true, error: null });

    try {
      const response = await axios.get("/forecast.json", {
        params: {
          key: API_KEY,
          q: `${coordinates.lat},${coordinates.lon}`,
          days: 7,
        },
      });

      set({ data: response.data });

      useUiStore.setState({ selectedDay: moment(get().data?.location.localtime).format("YYYY-MM-DD") });

      if (get().locations) {
        set({ locations: [] });
      }

      set({ loading: false });
    } catch (error) {
      set({ error: "Unable to get forecast", loading: false });
    }
  },
  locations: [],
  searchLocation: async (value: string) => {
    set({ searchLoading: true, error: null });

    try {
      const response = await axios.get("/search.json", {
        params: {
          key: API_KEY,
          q: value,
        },
      });

      set({ locations: response.data, searchLoading: false });
    } catch (error) {
      set({ error: "Unable to find location", locations: [], searchLoading: false });
    }
  },
}));

export default useWeatherStore;
