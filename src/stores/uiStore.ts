import { create } from "zustand";

interface Units {
  temp: "f" | "c";
  windSpeed: "mph" | "km";
  precipitation: "in" | "mm";
}

type UnitSystem = "metric" | "imperial" | "mixed";

const SYSTEM_UNITS: Record<"metric" | "imperial", Units> = {
  metric: { temp: "c", windSpeed: "km", precipitation: "mm" },
  imperial: { temp: "f", windSpeed: "mph", precipitation: "in" },
};

interface UiStore {
  units: Units;
  selectedDay: string;
  setSelectedDay: (value: string) => void;
  setUnitSystem: (system: "metric" | "imperial") => void;
  setUnit: <K extends keyof Units>(key: K, value: Units[K]) => void;
}

const useUiStore = create<UiStore>((set) => ({
  units: SYSTEM_UNITS.imperial,
  selectedDay: "",
  setSelectedDay: (value: string) => set({ selectedDay: value }),
  setUnitSystem: (system: "metric" | "imperial") => set({ units: SYSTEM_UNITS[system] }),
  setUnit: <K extends keyof Units>(key: K, value: Units[K]) => set((state) => ({ units: { ...state.units, [key]: value } })),
}));

export function getUnitSystem(units: Units): UnitSystem {
  if (units.temp === "c" && units.windSpeed === "km" && units.precipitation === "mm") {
    return "metric";
  } else if (units.temp === "f" && units.windSpeed === "mph" && units.precipitation === "in") {
    return "imperial";
  } else {
    return "mixed";
  }
}

export default useUiStore;
