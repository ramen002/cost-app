import { View, Text, TextInput, ScrollView, Alert } from "react-native";
import { useRouter, useLocalSearchParams, useNavigation } from "expo-router";
import { InputWithLabel } from "@/components/ui/inputWithLabel";
import { useRecipesStore } from "@/lib/store/recipesStore";
import { useState, useEffect, useLayoutEffect } from "react";
import { Button } from "@/components/ui/button";

export default function RecipeEdit() {
  const router = useRouter();
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();
  const { getRecipeById, updateRecipe, deleteRecipe } = useRecipesStore();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [servings, setServings] = useState("1");
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (id) {
      const recipe = getRecipeById(id as string);
      if (recipe) {
        setName(recipe.name);
        setDescription(recipe.description || "");
        setServings(recipe.servings.toString());
        setPrice(recipe.price?.toString() || "");
      }
    }
  }, [id]);

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert("エラー", "レシピ名を入力してください");
      return;
    }

    const servingsNumber = parseFloat(servings) || 1;
    if (servingsNumber <= 0) {
      Alert.alert("エラー", "標準量は正の数値を入力してください");
      return;
    }

    const priceNumber = price.trim() ? parseFloat(price) : undefined;
    if (priceNumber !== undefined && priceNumber <= 0) {
      Alert.alert("エラー", "販売価格は正の数値を入力してください");
      return;
    }

    try {
      updateRecipe(id as string, {
        name: name.trim(),
        description: description.trim(),
        servings: servingsNumber,
        price: priceNumber
      });
      router.back();
    } catch (error) {
      console.error("レシピ更新エラー:", error);
      Alert.alert("エラー", "レシピの更新に失敗しました。");
    }
  };

  const handleDelete = () => {
    Alert.alert(
      "レシピを削除",
      "このレシピを削除してもよろしいですか？",
      [
        { text: "キャンセル", style: "cancel" },
        { text: "削除", style: "destructive", onPress: () => {
          deleteRecipe(id as string);
          router.back();
        }}
      ]
    );
  };

  // ヘッダーの右側に保存ボタンを設定
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          className="bg-accentBlue"
          title="保存"
          icon="checkmark"
          onPress={handleSave}
          pressableClassName="px-3"
        />
      ),
    });
  }, [navigation, handleSave]);

  return (
    <View className="flex-1 bg-background p-4">
      <ScrollView className="flex-1 p-4">

        <InputWithLabel
          label="レシピ名 *"
          placeholder="例: カレーライス"
          value={name}
          onChangeText={setName}
          showClearButton
        />

        <InputWithLabel
          label="メモ"
          placeholder="例: レシピのポイントやメモ"
          value={description}
          onChangeText={setDescription}
        />

        <InputWithLabel
          label="標準量"
          placeholder="例: 4"
          value={servings}
          onChangeText={setServings}
          keyboardType="numeric"
        />

        <InputWithLabel
          label="販売価格"
          placeholder="例: 400"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />
      </ScrollView>
    </View>
  );
}
