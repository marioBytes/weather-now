import { create } from "zustand";

interface UiStore {
  changeUnitSystem: (unitType: "metric" | "imperial") => void;
  unitSystem: "metric" | "imperial";
}

const useUiStore = create<UiStore>((set) => ({
  unitSystem: "imperial",
  changeUnitSystem: (unitType: "metric" | "imperial") => set({ unitSystem: unitType }),
}));

export default useUiStore;
