import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

export type Recipe = {
  id: string;
  name: string;
  description?: string;
  ingredients: { id: string; quantity: number; unit: string }[];
  servings: number;
  createdAt: number;
  updatedAt: number;
};

type RecipesStore = {
  recipes: Recipe[];
  addRecipe: (r: Omit<Recipe, "id" | "createdAt" | "updatedAt">) => void;
  updateRecipe: (r: Recipe) => void;
  duplicateRecipe: (id: string) => void;
};

export const useRecipesStore = create<RecipesStore>((set, get) => ({
  recipes: [],
  addRecipe: (r) =>
    set((state) => ({
      recipes: [
        ...state.recipes,
        { ...r, id: uuidv4(), createdAt: Date.now(), updatedAt: Date.now() },
      ],
    })),
  updateRecipe: (r) =>
    set((state) => ({
      recipes: state.recipes.map((rec) => (rec.id === r.id ? { ...r, updatedAt: Date.now() } : rec)),
    })),
  duplicateRecipe: (id) => {
    const original = get().recipes.find((r) => r.id === id);
    if (original) {
      set((state) => ({
        recipes: [
          ...state.recipes,
          { ...original, id: uuidv4(), name: original.name + " コピー", createdAt: Date.now(), updatedAt: Date.now() },
        ],
      }));
    }
  },
}));
