import { create } from "zustand";

type CalculatorStore = {
  current?: {
    selectedMaterials: string[];
    quantities?: Record<string, number>;
  };
  setCurrent: (c: CalculatorStore["current"]) => void;
};

export const useCalculatorStore = create<CalculatorStore>((set) => ({
  current: undefined,
  setCurrent: (c) => set({ current: c }),
}));
