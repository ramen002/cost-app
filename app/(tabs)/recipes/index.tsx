import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { GestureHandlerProvider, SwipeableListItem } from '@/components/layout/GestureHandlerProvider';
import { useRecipesStore } from "@/lib/store/recipesStore";
import { useRouter, useNavigation } from "expo-router";
import { useState, useLayoutEffect } from "react";
import { Button } from "@/components/ui/button";
import { colors } from '@/theme';
import { Fab } from "@/components/ui/fab";
import { SearchBar } from "@/components/ui/SearchBar";

export default function Recipes() {
  const router = useRouter();
  const navigation = useNavigation();
  const { recipes, deleteRecipe, addRecipe } = useRecipesStore();
  const [searchText, setSearchText] = useState<string>('');

  const handleDuplicate = (recipe: any) => {
    const newRecipe = {
      name: `${recipe.name} (コピー)`,
      description: recipe.description,
      ingredients: recipe.ingredients,
      servings: recipe.servings
    };
    addRecipe(newRecipe);
  };

  // 検索テキストに基づいてレシピリストをフィルタリング
  const filteredRecipes = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View className="flex-1 bg-background">
      <GestureHandlerProvider>
        <View className="px-6 py-3">
          <SearchBar
            value={searchText}
            onChangeText={setSearchText}
            placeholder="レシピを検索..."
          />
          <Button
            pressableClassName="mt-3"
            icon="add"
            title="レシピを作成する"
            onPress={() => router.push('/recipes/form')}
          />
          </View>

        <ScrollView className="p-6">
          {filteredRecipes.map((recipe) => (
            <SwipeableListItem
              className="bg-white rounded-2xl"
              key={recipe.id}
              onDuplicate={() => handleDuplicate(recipe)}
              onDelete={() => deleteRecipe(recipe.id)}
            >
              <TouchableOpacity 
                className="rounded-2xl p-4 flex-row justify-between items-center"
                onPress={() => router.push(`/recipes/${recipe.id}`)}
              >
                {/* 左側 */}
                <View>
                  <Text className="text-xl font-bold text-accentBlue">{recipe.name}</Text>
                  <Text className="text-textSub">標準量: {recipe.servings}人分</Text>
                  <Text className="text-textSub">材料数: {recipe.ingredients.length}種類</Text>
                </View>

                {/* 右側 */}
                <Text className="text-2xl font-bold text-primary">{recipe.price ? `¥${recipe.price}` : ''}</Text>
              </TouchableOpacity>
            </SwipeableListItem>
          ))}
        </ScrollView>
      </GestureHandlerProvider>

      {/* <Fab title="新規作成" icon="add" onPress={() => router.push('/recipes/form')} /> */}
    </View>
  );
}
