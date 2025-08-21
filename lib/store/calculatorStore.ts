import { create } from 'zustand';
import { CalculatorState, CalculatorResult, IngredientUsage } from '../types';
import { useIngredientsStore } from './ingredientsStore';

type CalculatorStore = {
  state: CalculatorState;
  result?: CalculatorResult;
  setIngredientQuantity: (ingredientId: string, quantity: number) => void;
  removeIngredient: (ingredientId: string) => void;
  setResult: (result: CalculatorResult) => void;
  reset: () => void;
  calculateCost: (ingredients: IngredientUsage[]) => { totalCost: number; costPerServing: number };
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
  calculateCost: (ingredients) => {
    const { getIngredientById } = useIngredientsStore.getState();
    let totalCost = 0;
    ingredients.forEach((usage) => {
      const ingredient = getIngredientById(usage.ingredientId);
      if (ingredient) {
        // ingredient.cost は単位あたりのコスト
        // usage.quantity は使用量
        totalCost += ingredient.cost * usage.quantity;
      }
    });
    // 1人分/1個あたりの原価を計算するための servings はレシピから取得する必要があるため、
    // ここでは総原価のみを返す。1人分/1個あたりの原価は呼び出し元で計算する。
    return { totalCost, costPerServing: 0 }; // costPerServing は仮の値
  },
}));
