import { create } from "zustand";

interface UiStore {
  changeUnitSystem: (unitType: "metric" | "imperial") => void;
  unitSystem: "metric" | "imperial";
  selectedDay: string;
  setSelectedDay: (value: string) => void;
}

const useUiStore = create<UiStore>((set) => ({
  unitSystem: "imperial",
  selectedDay: "",
  setSelectedDay: (value: string) => set({ selectedDay: value }),
  changeUnitSystem: (unitType: "metric" | "imperial") => set({ unitSystem: unitType }),
}));

export default useUiStore;
