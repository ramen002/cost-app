import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useRouter, useNavigation } from "expo-router";
import { useIngredientsStore } from "@/lib/store/ingredientsStore";
import { useRecipesStore } from "@/lib/store/recipesStore";
import { useState, useLayoutEffect, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Ionicons } from "@expo/vector-icons";
import { Ingredient, IngredientUsage } from "@/lib/types";
import { colors } from "@/theme";

export default function SelectIngredientModal() {
  const router = useRouter();
  const navigation = useNavigation();
  const { ingredients } = useIngredientsStore();
  const { setSelectedIngredients } = useRecipesStore();
  const [selectedIngredientIds, setSelectedIngredientIds] = useState<Set<string>>(new Set());

  // 材料新規作成モーダルから戻ってきたときに材料一覧を更新
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // 何もしない - useIngredientsStoreが自動的に状態を更新する
    });

    return unsubscribe;
  }, [navigation]);

  const handleSelect = (id: string) => {
    setSelectedIngredientIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleSave = () => {
    // 選択された材料をIngredientUsageの形式に変換して保存
    const selectedIngredients: IngredientUsage[] = Array.from(selectedIngredientIds).map(id => ({
      ingredientId: id,
      quantity: 0 // 初期値は0、レシピ新規作成画面で数量を入力する
    }));
    setSelectedIngredients(selectedIngredients);
    router.back();
  };

  // ヘッダーの右側に保存ボタンを設定
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          className="bg-accentBlue"
          title="選択"
          icon="checkmark"
          onPress={handleSave}
          pressableClassName="px-3"
        />
      ),
    });
  }, [navigation, handleSave]);

  return (
    <View className="flex-1 bg-background pt-2">
      <ScrollView className="flex-1 p-6">
        {ingredients.map((ingredient) => (
          <TouchableOpacity
            key={ingredient.id}
            className={`flex-row items-center justify-between border border-primary rounded-xl p-4 mb-2 ${selectedIngredientIds.has(ingredient.id) ? 'bg-primary/10' : 'bg-white'}`}
            onPress={() => handleSelect(ingredient.id)}
          >
            <View>
              <Text className="font-medium">{ingredient.name}</Text>
              <Text>{ingredient.cost}円/{ingredient.unit}</Text>
            </View>
            {selectedIngredientIds.has(ingredient.id) && (
              <Ionicons name="checkmark-circle" size={24} color={colors.accentBlue} />
            )}
          </TouchableOpacity>
        ))}
        <Button
          title="新しい材料を追加"
          icon="add"
          outline
          className="bg-white border border-primary mt-4"
          onPress={() => router.push('/(modals)/ingredients/form')}
        />
      </ScrollView>
    </View>
  );
}
