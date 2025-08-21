import { create } from 'zustand';
import { Recipe, IngredientUsage } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist } from 'zustand/middleware';
import { generateId } from '../utils';

type RecipesStore = {
  recipes: Recipe[];
  selectedIngredients: IngredientUsage[];
  addRecipe: (data: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateRecipe: (id: string, data: Partial<Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>>) => void;
  deleteRecipe: (id: string) => void;
  getRecipeById: (id: string) => Recipe | undefined;
  setSelectedIngredients: (ingredients: IngredientUsage[]) => void;
  resetSelectedIngredients: () => void;
};

// AsyncStorage を PersistStorage 用にラップ
const asyncStoragePersistWrapper = <T>() => ({
  getItem: async (name: string): Promise<{ state: T } | null> => {
    const json = await AsyncStorage.getItem(name);
    if (!json) return null;
    try {
      const data = JSON.parse(json);
      return { state: data } as { state: T };
    } catch {
      return null;
    }
  },
  setItem: async (name: string, value: { state: T }) => {
    await AsyncStorage.setItem(name, JSON.stringify(value.state));
  },
  removeItem: async (name: string) => {
    await AsyncStorage.removeItem(name);
  },
});

export const useRecipesStore = create<RecipesStore>()(
  persist(
    (set, get) => ({
      recipes: [],
      selectedIngredients: [],
      addRecipe: (data) => {
        const now = Date.now();
        const newRecipe: Recipe = {
          id: generateId(),
          createdAt: now,
          updatedAt: now,
          ...data,
        };
        set({ recipes: [...get().recipes, newRecipe] });
      },
      updateRecipe: (id, data) => {
        set({
          recipes: get().recipes.map((r) =>
            r.id === id ? { ...r, ...data, updatedAt: Date.now() } : r
          ),
        });
      },
      deleteRecipe: (id) => {
        set({ recipes: get().recipes.filter((r) => r.id !== id) });
      },
      getRecipeById: (id) => get().recipes.find((r) => r.id === id),
      setSelectedIngredients: (ingredients) => set({ selectedIngredients: ingredients }),
      resetSelectedIngredients: () => set({ selectedIngredients: [] }),
    }),
    {
      name: 'recipes-storage',
      storage: asyncStoragePersistWrapper<RecipesStore>(), // state ラップ済みラッパー
    }
  )
);
