import { View, Text, TextInput, ScrollView, Alert } from "react-native";
import { useRouter, useNavigation } from "expo-router";
import { InputWithLabel } from "@/components/ui/inputWithLabel";
import { useRecipesStore } from "@/lib/store/recipesStore";
import { useState, useLayoutEffect } from "react";
import { Button } from "@/components/ui/button";

export default function NewRecipeModal() {
  const router = useRouter();
  const navigation = useNavigation();
  const { addRecipe } = useRecipesStore();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [servings, setServings] = useState("1");

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

    try {
      addRecipe({
        name: name.trim(),
        description: description.trim(),
        ingredients: [],
        servings: servingsNumber
      });
      router.back();
    } catch (error) {
      console.error("レシピ保存エラー:", error);
      Alert.alert("エラー", "レシピの保存に失敗しました。");
    }
  };

  // ヘッダーの右側に保存ボタンを設定
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button title="保存" onPress={handleSave} pressableClassName="px-3" />
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
      </ScrollView>
    </View>
  );
}
