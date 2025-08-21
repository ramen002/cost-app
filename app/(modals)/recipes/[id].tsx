import { View, Text, ScrollView } from "react-native";
import { useRouter, useNavigation, useLocalSearchParams } from "expo-router";
import { Button } from "@/components/ui/button";
import { Fab } from "@/components/ui/fab";
import { useRecipesStore } from "@/lib/store/recipesStore";
import { useCalculatorStore } from "@/lib/store/calculatorStore";
import { useIngredientsStore } from "@/lib/store/ingredientsStore";
import { useEffect, useState, useLayoutEffect } from "react";
import { Recipe, Ingredient } from "@/lib/types";

export default function RecipeDetail() {
  const router = useRouter();
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();
  const { getRecipeById } = useRecipesStore();
  const { calculateCost } = useCalculatorStore();
  const { getIngredientById } = useIngredientsStore();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [totalCost, setTotalCost] = useState<number>(0);
  const [costPerServing, setCostPerServing] = useState<number>(0);
  const [ingredientDetails, setIngredientDetails] = useState<Ingredient[]>([]);

  useEffect(() => {
    if (id) {
      const fetchedRecipe = getRecipeById(id as string);
      if (fetchedRecipe) {
        setRecipe(fetchedRecipe);
        // 原価計算
        const { totalCost } = calculateCost(fetchedRecipe.ingredients);
        const costPerServing = totalCost / fetchedRecipe.servings;
        setTotalCost(totalCost);
        setCostPerServing(costPerServing);
        
        // 材料の詳細情報を取得
        const details = fetchedRecipe.ingredients.map(usage => 
          getIngredientById(usage.ingredientId)
        ).filter((ingredient): ingredient is Ingredient => ingredient !== undefined);
        setIngredientDetails(details);
      }
    }
  }, [id]);

  // ヘッダーの右側にボタンを設定
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          className="bg-accentBlue"
          icon="create"
          title="編集"
          pressableClassName="pr-2"
          onPress={() => router.push(`/recipes/form?id=${id}`)}
        />
      ),
    });
  }, [navigation]);

  if (!recipe) {
    return (
      <View className="flex-1 bg-background justify-center items-center">
        <Text>レシピが見つかりません</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="px-6 pt-4">
        <View className="bg-secondary rounded-lg">
          <Text className="font-bold p-3">{recipe.name}</Text>
        </View>
        
        
        {recipe.description ? (
          <View className="mb-4">
            <Text className="text-lg font-semibold mb-2">メモ</Text>
            <Text className="border border-gray-300 rounded-lg p-3 bg-white">
              {recipe.description}
            </Text>
          </View>
        ) : null}

        <View className="mb-4">
          <Text className="text-lg font-semibold mb-2">標準量</Text>
          <Text className="border border-gray-300 rounded-lg p-3 bg-white">
            {recipe.servings} 人分 / 個
          </Text>
        </View>

        {recipe.price !== undefined ? (
          <View className="mb-4">
            <Text className="text-lg font-semibold mb-2">販売価格</Text>
            <Text className="border border-gray-300 rounded-lg p-3 bg-white">
              ¥{recipe.price}
            </Text>
          </View>
        ) : null}

        <View className="mb-4">
          <Text className="text-lg font-semibold mb-2">原価</Text>
          <Text className="border border-gray-300 rounded-lg p-3 bg-white">
            ¥{totalCost.toFixed(2)}
          </Text>
        </View>

        <View className="mb-4">
          <Text className="text-lg font-semibold mb-2">1人分 / 1個あたりの原価</Text>
          <Text className="border border-gray-300 rounded-lg p-3 bg-white">
            ¥{costPerServing.toFixed(2)}
          </Text>
        </View>

        <View className="mb-6">
          <Text className="text-lg font-semibold mb-2">材料一覧</Text>
          {recipe.ingredients.map((usage, index) => {
            const ingredient = ingredientDetails[index];
            if (!ingredient) return null;
            return (
              <View key={index} className="border border-gray-300 rounded-lg p-3 bg-white mb-2">
                <Text className="font-medium">{ingredient.name}</Text>
                <Text>{usage.quantity} {ingredient.unit}</Text>
              </View>
            );
          })}
        </View>
      </ScrollView>

      <Fab 
        title="計算機"
        icon="calculator"
        onPress={() => router.push(`/calculator?recipeId=${id}`)}
      />
    </View>
  );
}
