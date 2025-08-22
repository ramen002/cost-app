import { create } from 'zustand';
import { Ingredient } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist } from 'zustand/middleware';
import { generateId } from '../utils';

type IngredientsStore = {
  ingredients: Ingredient[];
  addIngredient: (data: Omit<Ingredient, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateIngredient: (id: string, data: Partial<Omit<Ingredient, 'id' | 'createdAt' | 'updatedAt'>>) => void;
  deleteIngredient: (id: string) => void;
  duplicateIngredient: (id: string) => void;
  getIngredientById: (id: string) => Ingredient | undefined;
};

// PersistStorage<T> 用のラッパー
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

export const useIngredientsStore = create<IngredientsStore>()(
  persist(
    (set, get) => ({
      ingredients: [],
      addIngredient: (data) => {
        const now = Date.now();
        const newIngredient: Ingredient = {
          id: generateId(),
          createdAt: now,
          updatedAt: now,
          ...data,
        };
        set({ ingredients: [...get().ingredients, newIngredient] });
      },
      updateIngredient: (id, data) => {
        set({
          ingredients: get().ingredients.map((ing) =>
            ing.id === id ? { ...ing, ...data, updatedAt: Date.now() } : ing
          ),
        });
      },
      deleteIngredient: (id) => {
        set({ ingredients: get().ingredients.filter((ing) => ing.id !== id) });
      },
      duplicateIngredient: (id) => {
        const ingredient = get().ingredients.find((ing) => ing.id === id);
        if (ingredient) {
          const now = Date.now();
          const newIngredient: Ingredient = {
            ...ingredient,
            id: generateId(),
            name: `${ingredient.name} (コピー)`,
            createdAt: now,
            updatedAt: now,
          };
          set({ ingredients: [...get().ingredients, newIngredient] });
        }
      },
      getIngredientById: (id) => get().ingredients.find((ing) => ing.id === id),
    }),
    {
      name: 'ingredients-storage',
      storage: asyncStoragePersistWrapper<IngredientsStore>(), // state ラップ済みラッパー
    }
  )
);
