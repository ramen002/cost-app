// lib/types.ts

// 食材（材料）
export type Ingredient = {
  id: string;
  name: string;
  unit: string;       // g, ml, 個 など
  cost: number;       // 単価（円/単位）
  stock: number;      // 在庫数量
  category?: string;  // 調味料・野菜・肉 など
  createdAt: number;
  updatedAt: number;
};

// レシピに紐づく食材使用量
export type IngredientUsage = {
  ingredientId: string; // Ingredient.id
  quantity: number;     // 使用量
  unit: string;         // 使用単位（g, ml, 個など）
};

// レシピ
export type Recipe = {
  id: string;
  name: string;
  description?: string;
  ingredients: IngredientUsage[];
  servings: number;   // 何人分か
  createdAt: number;
  updatedAt: number;
};

// 計算状態
export type CalculatorState = {
  selectedIngredients: string[];
  quantities: Record<string, number>;
};

// 計算結果
export type CalculatorResult = {
  costTotal: number;
  price?: number;
  costRate?: number;    // 原価率
  profitRate?: number;  // 利益率
};

// 計算履歴
export type HistoryItem = {
  id: string;
  recipe: Recipe;
  timestamp: number;
};


