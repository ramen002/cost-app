import { create } from 'zustand';
import { CalculatorState, CalculatorResult } from '../types';

type CalculatorStore = {
  state: CalculatorState;
  result?: CalculatorResult;
  setIngredientQuantity: (ingredientId: string, quantity: number) => void;
  removeIngredient: (ingredientId: string) => void;
  setResult: (result: CalculatorResult) => void;
  reset: () => void;
};

export const useCalculatorStore = create<CalculatorStore>((set) => ({
  state: { ingredients: {} },
  result: undefined,
  setIngredientQuantity: (ingredientId, quantity) =>
    set((s) => ({
      state: { ...s.state, ingredients: { ...s.state.ingredients, [ingredientId]: quantity } },
    })),
  removeIngredient: (ingredientId) =>
    set((s) => {
      const newIngredients = { ...s.state.ingredients };
      delete newIngredients[ingredientId];
      return { state: { ...s.state, ingredients: newIngredients } };
    }),
  setResult: (result) => set({ result }),
  reset: () => set({ state: { ingredients: {} }, result: undefined }),
}));
