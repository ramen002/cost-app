import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { GestureHandlerProvider, SwipeableListItem } from '@/components/layout/GestureHandlerProvider';
import { useRecipesStore } from "@/lib/store/recipesStore";
import { useRouter, useNavigation } from "expo-router";
import { useState, useLayoutEffect } from "react";
import { Button } from "@/components/ui/button";
import { colors } from '@/theme';

export default function Recipes() {
  const router = useRouter();
  const navigation = useNavigation();
  const { recipes, deleteRecipe, addRecipe } = useRecipesStore();

  const handleDelete = (id: string, name: string) => {
    Alert.alert(
      "レシピを削除",
      `「${name}」を削除してもよろしいですか？`,
      [
        { text: "キャンセル", style: "cancel" },
        { text: "削除", style: "destructive", onPress: () => deleteRecipe(id) }
      ]
    );
  };

  const handleDuplicate = (recipe: any) => {
    const newRecipe = {
      name: `${recipe.name} (コピー)`,
      description: recipe.description,
      ingredients: recipe.ingredients,
      servings: recipe.servings
    };
    addRecipe(newRecipe);
  };

  // ヘッダーの右側にボタンを設定
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          className="bg-accentOrange"
          icon="add"
          title="追加"
          pressableClassName="pr-6"
          onPress={() => router.push('/recipes/form')}
        />
      ),
    });
  }, [navigation]);

  return (
    <View className="flex-1 bg-background">
      <GestureHandlerProvider>

        {/* todo: ここに検索とソートおきたい */}

        <ScrollView className="p-6">
          {recipes.map((recipe) => (
            <SwipeableListItem
              className="bg-white rounded-2xl"
              key={recipe.id}
              onDuplicate={() => handleDuplicate(recipe)}
              onDelete={() => handleDelete(recipe.id, recipe.name)}
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
                <Text className="text-2xl font-bold text-primary">{recipe.price ? `￥${recipe.price}` : ''}</Text>
              </TouchableOpacity>
            </SwipeableListItem>
          ))}
        </ScrollView>
      </GestureHandlerProvider>
    </View>
  );
}
