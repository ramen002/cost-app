import { create } from 'zustand';
import { Recipe } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

type RecipesStore = {
  recipes: Recipe[];
  addRecipe: (data: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateRecipe: (id: string, data: Partial<Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>>) => void;
  deleteRecipe: (id: string) => void;
  getRecipeById: (id: string) => Recipe | undefined;
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
      addRecipe: (data) => {
        const now = Date.now();
        const newRecipe: Recipe = {
          id: uuidv4(),
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
    }),
    {
      name: 'recipes-storage',
      storage: asyncStoragePersistWrapper<RecipesStore>(), // state ラップ済みラッパー
    }
  )
);
