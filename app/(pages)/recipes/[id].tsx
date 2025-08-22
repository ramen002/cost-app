import { View, Text, ScrollView } from "react-native";
import { useRouter, useNavigation, useLocalSearchParams } from "expo-router";
import { Button } from "@/components/ui/button";
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

  // 画面がフォーカスされた時にレシピデータを再取得
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
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
    });

    return unsubscribe;
  }, [navigation, id, getRecipeById, calculateCost, getIngredientById]);

  // ヘッダーの右側にボタンを設定
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          outline
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

        <View className="bg-accentBlue rounded-2xl py-6 items-center">
          <Text className="text-white mb-1">{recipe.name}</Text>
          <Text className="text-white text-xl font-bold">￥{recipe.price}</Text>
          <Text className="text-white">1人分: ￥36 | 原価率: 30%</Text>
        </View>

        <Button
          outline
          icon="calculator"
          title="このレシピで再計算する"
          pressableClassName="pr-2 mt-4"
          onPress={() => router.push(`/calculator?recipeId=${id}`)}
        />
        
        <View className="bg-white mt-4 rounded-2xl py-6 items-center">
          <Text className="mb-3 font-bold">材料別原価割合</Text>
          {/* todo: 円グラフ表示 */}
        </View>

        <View className="bg-white mt-4 rounded-2xl py-6 items-center">
          <Text className="mb-3 font-bold">材料別コスト比較</Text>
          {/* todo: 棒グラフ表示 */}
        </View>

        {/* 登録内容 */}
        <View className="mt-6">
          <Text className="text-primary font-bold mb-1">登録内容</Text>
          <View className="flex-row border-l-2 border-primary mb-2">
            <Text className="w-20 font-bold ml-2">レシピ名</Text>
            <Text>{recipe.name}</Text>
          </View>
          <View className="flex-row border-l-2 border-primary mb-2">
            <Text className="w-20 font-bold ml-2">材料</Text>
            <View className="flex-col">
            {recipe.ingredients.map((usage, index) => {
              const ingredient = ingredientDetails[index];
              if (!ingredient) return null;
              return (
                <View key={index} className="flex-row rounded-md bg-primary/20 mb-0.5 p-0.5 pl-2">
                  <Text className="w-40">
                    <Text className="text-primary font-bold">{index+1}.</Text>
                    {ingredient.name}
                  </Text>
                  <Text className="w-16">{usage.quantity}{ingredient.unit}</Text>
                  <Text className="mr-2">¥{ingredient.cost}</Text>
                </View>
              );
            })}
            </View>
          </View>
          <View className="flex-row border-l-2 border-primary mb-2">
            <Text className="w-20 font-bold ml-2">提供数</Text>
            <Text>{recipe.servings} 人分 / 個</Text>
          </View>
          <View className="flex-row border-l-2 border-primary mb-2">
            <Text className="w-20 font-bold ml-2">販売価格</Text>
            <Text>¥{recipe.price}</Text>
          </View>
          <View className="flex-row border-l-2 border-primary">
            <Text className="w-20 font-bold ml-2">メモ</Text>
            <Text>{recipe.description ? recipe.description : '-'}</Text>
          </View>
        </View>
      
      </ScrollView>
    </View>
  );
}

