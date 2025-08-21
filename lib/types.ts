// 食材（材料）
export type Ingredient = {
  id: string;
  name: string;
  cost: number;       // 単価（円/単位）
  unit: "g" | "ml" | "個" | "袋"  // 必須プリセット
  quantity: number; // 1個あたりの量（g/ml）
  categoryId?: string;  // Category.id と紐付け
  createdAt: number;
  updatedAt: number;
};

// レシピ内の食材使用量
export type IngredientUsage = {
  ingredientId: string; // Ingredient.id
  quantity: number;     // 使用量
  unit?: string;        // 使用単位（省略可：Ingredient.unitを参照）
};

// レシピ
export type Recipe = {
  id: string;
  name: string;
  description?: string;
  ingredients: IngredientUsage[];
  servings: number;   // 標準量（人数や個数）
  price?: number;    // 販売価格
  
  categoryId?: string;  // Category.id と紐付け
  createdAt: number;
  updatedAt: number;
};

export type Category = {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
};

// 原価計算状態
export type CalculatorState = {
  ingredients: Record<string, number>; // ingredientId -> 使用量
  // UI用に順序を保持したい場合
  selectedOrder?: string[];
};

// 原価計算結果
export type CalculatorResult = {
  costTotal: number;      // 総原価
  price?: number;         // 販売価格（入力済みの場合）
  costRate?: number;      // 原価率
  profitRate?: number;    // 利益率
  profit?: number;        // 利益額
};

// 計算履歴
export type HistoryItem = {
  id: string;
  recipe: Recipe;
  result: CalculatorResult;
  createdAt: number;      // 計算日時
};
