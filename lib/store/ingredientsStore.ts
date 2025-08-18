import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { Ingredient } from "../types";

type IngredientsStore = {
  ingredients: Ingredient[];
  addIngredient: (i: Omit<Ingredient, "id" | "createdAt" | "updatedAt">) => void;
  updateIngredient: (i: Ingredient) => void;
  deleteIngredient: (id: string) => void;
};

export const useIngredientsStore = create<IngredientsStore>((set) => ({
  ingredients: [],
  addIngredient: (i) =>
    set((state) => ({
      ingredients: [
        ...state.ingredients,
        { ...i, id: uuidv4(), createdAt: Date.now(), updatedAt: Date.now() },
      ],
    })),
  updateIngredient: (i) =>
    set((state) => ({
      ingredients: state.ingredients.map((ing) =>
        ing.id === i.id ? { ...i, updatedAt: Date.now() } : ing
      ),
    })),
  deleteIngredient: (id) =>
    set((state) => ({
      ingredients: state.ingredients.filter((ing) => ing.id !== id),
    })),
}));
