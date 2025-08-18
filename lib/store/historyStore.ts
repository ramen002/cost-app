import { create } from "zustand";
import { Recipe } from "./recipesStore";
import { v4 as uuidv4 } from "uuid";

type HistoryItem = {
  id: string;
  recipe: Recipe;
  timestamp: number;
};

type HistoryStore = {
  history: HistoryItem[];
  addHistory: (recipe: Recipe) => void;
};

export const useHistoryStore = create<HistoryStore>((set) => ({
  history: [],
  addHistory: (recipe) =>
    set((state) => ({
      history: [
        ...state.history,
        { id: uuidv4(), recipe, timestamp: Date.now() },
      ],
    })),
}));
